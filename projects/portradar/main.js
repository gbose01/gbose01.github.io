#!/usr/bin/env node

/**
 * PortRadar - Terminal Port & Process Monitor
 * Shows host processes AND Docker container ports
 * 
 * Usage: node main.js
 * 
 * Controls:
 *   ↑↓        Navigate
 *   k         Kill selected process
 *   d         Stop Docker container
 *   r         Refresh
 *   q         Quit
 *   1/2/3     Filter: all/host/docker
 */

const { scanHostPorts, killProcess } = require('./services/host');
const docker = require('./services/docker');

// If running directly
if (require.main === module) {
  console.log('PortRadar v1.0');
  console.log('Use: node views/main.js to run the TUI');
  console.log('');
  console.log('Quick test - scanning ports...');
  
  scanHostPorts().then(ports => {
    console.log('\nHost Ports:');
    console.table(ports);
  }).catch(e => {
    console.error('Error scanning ports:', e.message);
  });
  
  docker.isDockerAvailable().then(ok => {
    if (ok) {
      console.log('\nDocker: Available');
      return docker.getContainers();
    } else {
      console.log('\nDocker: Not available');
      return [];
    }
  }).then(containers => {
    if (containers.length > 0) {
      console.log('\nDocker Containers:');
      console.table(containers.map(c => ({
        ID: c.id,
        Name: c.name,
        Image: c.image,
        Status: c.status,
        Ports: c.ports.map(p => 
          p.publicPort ? `${p.publicPort}:${p.privatePort}` : p.privatePort
        ).join(', ')
      })));
    }
  }).catch(e => {
    console.error('Error:', e.message);
  });
}

module.exports = { scanHostPorts, killProcess, docker };
