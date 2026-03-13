const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Parse /proc/net/tcp and /proc/net/udp
 * @returns {Promise<Array>}
 */
async function scanHostPorts() {
  const ports = [];
  
  // Protocol types to scan
  const protocols = [
    { file: '/proc/net/tcp', type: 'TCP' },
    { file: '/proc/net/udp', type: 'UDP' },
    { file: '/proc/net/tcp6', type: 'TCP6' },
    { file: '/proc/net/udp6', type: 'UDP6' }
  ];
  
  for (const proto of protocols) {
    try {
      const content = fs.readFileSync(proto.file, 'utf8');
      const lines = content.trim().split('\n').slice(1); // Skip header
      
      for (const line of lines) {
        // Split by whitespace - fields are space-separated
        const parts = line.trim().split(/\s+/);
        if (parts.length < 10) continue;
        
        // local_address is field 1
        const localAddr = parts[1];
        // state is field 3
        const state = parseInt(parts[3], 16);
        // inode is field 9
        const inode = parts[9];
        
        // Parse IP and port from local_address (format: IP:PORT in hex)
        const colonIdx = localAddr.lastIndexOf(':');
        if (colonIdx === -1) continue;
        
        const hexPort = localAddr.substring(colonIdx + 1);
        const port = parseInt(hexPort, 16);
        
        // Skip port 0
        if (port === 0) continue;
        
        // State 10 = LISTEN for TCP, or show all for UDP
        const isTcp = proto.type.startsWith('TCP');
        if (isTcp && state !== 10) continue;
        
        // Find PID by inode
        const pidInfo = await findPidByInode(inode);
        
        ports.push({
          port: port.toString(),
          protocol: proto.type.replace('6', ''),
          state: isTcp ? 'LISTEN' : 'UNCONN',
          pid: pidInfo.pid,
          processName: pidInfo.name
        });
      }
    } catch (e) {
      // File might not exist
      continue;
    }
  }
  
  // Sort by port
  ports.sort((a, b) => parseInt(a.port, 10) - parseInt(b.port, 10));
  
  // Remove duplicates
  const seen = new Set();
  return ports.filter(p => {
    const key = `${p.port}-${p.protocol}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Find PID by inode number
 * @param {string} inode 
 * @returns {Promise<{pid: number, name: string}>}
 */
async function findPidByInode(inode) {
  const procDir = '/proc';
  
  try {
    const entries = fs.readdirSync(procDir);
    
    for (const entry of entries) {
      // Check if it's a numeric directory (PID)
      if (!/^\d+$/.test(entry)) continue;
      
      const pid = parseInt(entry, 10);
      const fdDir = path.join(procDir, entry, 'fd');
      
      try {
        const fds = fs.readdirSync(fdDir);
        
        for (const fd of fds) {
          try {
            const link = fs.readlinkSync(path.join(fdDir, fd));
            if (link.includes(`socket:[${inode}]`)) {
              return { pid, name: getProcessName(pid) };
            }
          } catch (e) {
            // Skip inaccessible fds
          }
        }
      } catch (e) {
        // Skip inaccessible proc entries
      }
    }
  } catch (e) {
    // Ignore
  }
  
  return { pid: 0, name: '-' };
}

/**
 * Get process name from /proc
 * @param {number} pid 
 * @returns {string}
 */
function getProcessName(pid) {
  try {
    // Try /proc/<pid>/comm first (cleanest)
    const commPath = path.join('/proc', pid.toString(), 'comm');
    if (fs.existsSync(commPath)) {
      return fs.readFileSync(commPath, 'utf8').trim();
    }
    
    // Fallback to exe symlink
    const exePath = path.join('/proc', pid.toString(), 'exe');
    if (fs.existsSync(exePath)) {
      const exe = fs.readlinkSync(exePath);
      return path.basename(exe).split(' ')[0];
    }
    
    // Fallback to cmdline
    const cmdlinePath = path.join('/proc', pid.toString(), 'cmdline');
    if (fs.existsSync(cmdlinePath)) {
      const cmdline = fs.readFileSync(cmdlinePath, 'utf8');
      const args = cmdline.split('\0').filter(Boolean);
      if (args.length > 0) {
        return path.basename(args[0]);
      }
    }
  } catch (e) {
    // Process might have exited
  }
  
  return 'unknown';
}

/**
 * Kill a process by PID
 * @param {number} pid 
 * @returns {Promise<boolean>}
 */
async function killProcess(pid) {
  if (!pid || pid === 0) return false;
  
  return new Promise((resolve) => {
    exec(`kill ${pid}`, (err) => {
      resolve(!err);
    });
  });
}

module.exports = {
  scanHostPorts,
  getProcessName,
  killProcess
};
