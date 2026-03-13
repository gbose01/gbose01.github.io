const Docker = require('dockerode');

let docker = null;

/**
 * Get Docker instance (lazy init)
 */
function getDocker() {
  if (!docker) {
    // Try Docker socket, fall back to env vars
    const socketPath = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
    
    try {
      docker = new Docker({ socketPath });
    } catch (e) {
      // Fallback: try TCP connection
      const host = process.env.DOCKER_HOST || 'localhost';
      const port = process.env.DOCKER_PORT || 2375;
      docker = new Docker({ host, port });
    }
  }
  return docker;
}

/**
 * Check if Docker is available
 * @returns {Promise<boolean>}
 */
async function isDockerAvailable() {
  try {
    const d = getDocker();
    await d.ping();
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get running containers with port mappings
 * @returns {Promise<Array>}
 */
async function getContainers() {
  try {
    const d = getDocker();
    const containers = await d.listContainers({ all: false });
    
    const result = [];
    
    for (const c of containers) {
      const info = {
        id: c.Id.substring(0, 12),
        name: c.Names[0].replace(/^\//, ''),
        image: c.Image,
        status: c.Status,
        ports: []
      };
      
      // Parse port mappings
      if (c.Ports && c.Ports.length > 0) {
        for (const p of c.Ports) {
          info.ports.push({
            privatePort: p.PrivatePort,
            publicPort: p.PublicPort || null,
            type: p.Type
          });
        }
      }
      
      result.push(info);
    }
    
    return result;
  } catch (e) {
    console.error('Docker error:', e.message);
    return [];
  }
}

/**
 * Stop a container
 * @param {string} containerId 
 * @returns {Promise<boolean>}
 */
async function stopContainer(containerId) {
  try {
    const d = getDocker();
    const container = d.getContainer(containerId);
    await container.stop();
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  isDockerAvailable,
  getContainers,
  stopContainer
};
