const blessed = require('blessed');
const { scanHostPorts, killProcess } = require('../services/host');
const docker = require('../services/docker');

// State
let hostPorts = [];
let containers = [];
let dockerAvailable = false;
let filter = 'all'; // all, host, docker
let searchQuery = '';
let selectedIndex = 0;
let refreshing = false;
let autoRefresh = true;

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'PortRadar',
  dockBorders: true
});

// Header container
const header = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: 3,
  style: { bg: 'cyan', fg: 'black' }
});

// Filter buttons
const filterBox = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  padding: { left: 1 },
  tags: true,
  content: '{bold}FILTER:{/} [all] [host] [docker]'
});

// Search box
const searchBox = blessed.textbox({
  top: 1,
  left: 35,
  width: 20,
  height: 1,
  border: { type: 'line' },
  style: {
    border: { fg: 'cyan' },
    fg: 'white'
  },
  inputOnFocus: true,
  placeholder: 'Search...'
});

// Refresh indicator
const refreshIndicator = blessed.text({
  top: 1,
  right: 2,
  content: '↻ ON ',
  style: { fg: 'green', bold: true }
});

// Status bar
const statusBar = blessed.box({
  top: 3,
  left: 0,
  width: '100%',
  height: 1,
  style: { bg: 'blue', fg: 'white' },
  content: ''
});

// Main table
const table = blessed.table({
  top: 5,
  left: 0,
  width: '100%',
  height: '70%',
  border: { type: 'line' },
  style: {
    header: { fg: 'cyan', bold: true, bg: 'black' },
    cell: { fg: 'white', bg: 'black' },
    selected: { bg: 'cyan', fg: 'black', bold: true }
  },
  tags: true
});

// Footer
const footer = blessed.box({
  bottom: 0,
  left: 0,
  width: '100%',
  height: 3,
  style: { bg: 'black', fg: 'white' },
  content: ' ↑↓ Navigate  [k] Kill  [d] Stop Container  [r] Toggle Refresh  [f] Filter  [q] Quit '
});

// Confirmation modal
let currentModal = null;

/**
 * Build table rows from data
 */
function buildRows() {
  const rows = [];
  
  // Filter host ports
  let filteredHost = hostPorts.filter(p => {
    if (filter === 'docker') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.port.includes(q) || p.processName.toLowerCase().includes(q);
    }
    return true;
  });
  
  // Filter containers
  let filteredDocker = [];
  if (filter === 'host' || filter === 'all') {
    filteredDocker = containers.flatMap(c => 
      c.ports.map(p => ({
        containerId: c.id,
        containerName: c.name,
        image: c.image,
        status: c.status,
        port: p.publicPort || p.privatePort,
        privatePort: p.privatePort,
        type: p.type
      }))
    ).filter(p => {
      if (filter === 'host') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.port.toString().includes(q) || p.containerName.toLowerCase().includes(q);
      }
      return true;
    });
  }
  
  // Combine
  const combined = [
    ...filteredHost.map(p => ({ ...p, type: 'host' })),
    ...filteredDocker.map(p => ({ ...p, type: 'docker', pid: 0, processName: p.image }))
  ];
  
  combined.sort((a, b) => parseInt(a.port, 10) - parseInt(b.port, 10));
  
  // Build table rows with tags for coloring
  for (const item of combined) {
    const isDocker = item.type === 'docker';
    const pidStr = isDocker ? '{cyan}-{cyan}' : item.pid.toString();
    const portStr = isDocker ? `{yellow}${item.port}{white}` : item.port;
    const protoStr = isDocker ? `${item.privatePort}/{yellow}${item.type}{white}` : item.protocol;
    const processStr = isDocker ? `{dim}${item.status}{dim}` : item.processName;
    const containerStr = isDocker ? `{green}${item.containerName}{white}` : '{dim}-{dim}';
    
    rows.push([pidStr, portStr, protoStr, processStr, containerStr]);
  }
  
  return rows;
}

/**
 * Update the display
 */
function updateDisplay() {
  const rows = buildRows();
  
  // Set table data
  table.setData({
    headers: ['{bold}PID{/}', '{bold}PORT{/}', '{bold}PROTO{/}', '{bold}PROCESS{/}', '{bold}CONTAINER{/}'],
    rows: rows
  });
  
  // Update status bar
  const dockerStatus = dockerAvailable ? '{green}Docker: ✓{/}' : '{yellow}Docker: ✗{/}';
  const refreshStatus = autoRefresh ? '{green}↻ ON{/}' : '{red}↻ OFF{/}';
  statusBox.setContent(`${dockerStatus} | Host: ${hostPorts.length} | Docker: ${containers.length} | Filter: ${filter} | ${refreshStatus}`);
  
  // Keep selected in bounds
  if (selectedIndex >= rows.length) {
    selectedIndex = Math.max(0, rows.length - 1);
  }
  table.setSelected(selectedIndex);
  
  screen.render();
}

// Status bar (separate element)
const statusBox = blessed.box({
  top: 4,
  left: 0,
  width: '100%',
  height: 1,
  style: { bg: 'blue', fg: 'white' },
  content: ''
});

// Add elements to screen
screen.append(header);
header.append(filterBox);
header.append(searchBox);
header.append(refreshIndicator);
screen.append(statusBox);
screen.append(table);
screen.append(footer);

// Show confirmation modal
function showModal(title, message, choices, callback) {
  if (currentModal) {
    screen.remove(currentModal);
  }
  
  currentModal = blessed.box({
    top: 'center',
    left: 'center',
    width: 50,
    height: 8,
    border: { type: 'line', fg: 'cyan' },
    style: { bg: 'black' },
    children: [
      blessed.box({
        top: 0,
        left: 0,
        width: '100%',
        height: 1,
        content: ` {bold}${title}{/} `,
        style: { fg: 'cyan' }
      }),
      blessed.box({
        top: 2,
        left: 0,
        width: '100%',
        content: `  ${message}  `
      }),
      blessed.box({
        bottom: 1,
        left: 0,
        width: '100%',
        content: `  ${choices}  `,
        style: { fg: 'yellow' }
      })
    ]
  });
  
  screen.append(currentModal);
  currentModal.focus();
  screen.render();
  
  // Set up key handler for modal
  const keyHandler = (ch, key) => {
    const choice = ch.toLowerCase();
    screen.remove(currentModal);
    currentModal = null;
    screen.render();
    screen.off('key', keyHandler);
    callback(choice);
  };
  
  screen.on('key', keyHandler);
}

/**
 * Refresh all data
 */
async function refreshData() {
  if (refreshing) return;
  refreshing = true;
  
  try {
    hostPorts = await scanHostPorts();
    dockerAvailable = await docker.isDockerAvailable();
    if (dockerAvailable) {
      containers = await docker.getContainers();
    }
    updateDisplay();
  } catch (e) {
    statusBox.setContent(` {red}Error: ${e.message}{/}`);
    screen.render();
  }
  
  refreshing = false;
}

// Event handlers

// Filter cycling
screen.key(['f'], () => {
  const filters = ['all', 'host', 'docker'];
  const idx = filters.indexOf(filter);
  filter = filters[(idx + 1) % filters.length];
  selectedIndex = 0;
  updateDisplay();
});

// Number keys for filter
screen.key(['1'], () => { filter = 'all'; selectedIndex = 0; updateDisplay(); });
screen.key(['2'], () => { filter = 'host'; selectedIndex = 0; updateDisplay(); });
screen.key(['3'], () => { filter = 'docker'; selectedIndex = 0; updateDisplay(); });

// Search
searchBox.on('submit', () => {
  searchQuery = searchBox.getValue();
  selectedIndex = 0;
  updateDisplay();
});

searchBox.key('escape', () => {
  searchQuery = '';
  searchBox.clearValue();
  screen.focusPop();
  selectedIndex = 0;
  updateDisplay();
});

// Navigation
screen.key(['up'], () => {
  const rows = buildRows();
  if (selectedIndex > 0) {
    selectedIndex--;
    table.setSelected(selectedIndex);
    screen.render();
  }
});

screen.key(['down'], () => {
  const rows = buildRows();
  if (selectedIndex < rows.length - 1) {
    selectedIndex++;
    table.setSelected(selectedIndex);
    screen.render();
  }
});

// Kill process
screen.key(['k'], async () => {
  const rows = buildRows();
  if (!rows[selectedIndex]) return;
  
  const row = rows[selectedIndex];
  const pid = parseInt(row[0], 10);
  
  if (pid > 0) {
    showModal('Kill Process', `Kill PID ${pid}?`, '[y] Yes  [n] No', async (choice) => {
      if (choice === 'y') {
        const ok = await killProcess(pid);
        statusBox.setContent(ok ? ` Killed process ${pid}` : `{red}Failed to kill ${pid}{/}`);
        setTimeout(refreshData, 500);
      }
    });
  }
});

// Stop container
screen.key(['d'], async () => {
  const rows = buildRows();
  if (!rows[selectedIndex]) return;
  
  const row = rows[selectedIndex];
  // Check if it's a docker container (container name in last column, not '-')
  const containerName = row[4].replace(/\{[^}]+\}/g, ''); // strip tags
  
  if (containerName && containerName !== '-') {
    showModal('Stop Container', `Stop container "${containerName}"?`, '[y] Yes  [n] No', async (choice) => {
      if (choice === 'y') {
        const ok = await docker.stopContainer(containerName);
        statusBox.setContent(ok ? ` Stopped container ${containerName}` : `{red}Failed to stop ${containerName}{/}`);
        setTimeout(refreshData, 1000);
      }
    });
  }
});

// Toggle refresh
screen.key(['r'], () => {
  autoRefresh = !autoRefresh;
  refreshIndicator.setContent(autoRefresh ? '↻ ON ' : '↻ OFF');
  refreshIndicator.style.fg = autoRefresh ? 'green' : 'red';
  updateDisplay();
});

// Quit
screen.key(['q', 'C-c'], () => {
  process.exit(0);
});

// Initial render
refreshData();

// Auto-refresh every 3 seconds
const refreshInterval = setInterval(() => {
  if (autoRefresh) {
    refreshData();
  }
}, 3000);

screen.on('destroy', () => {
  clearInterval(refreshInterval);
});

screen.render();
