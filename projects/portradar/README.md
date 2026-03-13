# PortRadar 🛸

Terminal port & process monitor that shows both **host processes** AND **Docker container** ports in one unified view.

![PortRadar](https://via.placeholder.com/800x400?text=PortRadar+TUI)

## Features

- **Host Ports** - Scans `/proc/net/tcp` to find listening ports and their processes
- **Docker Integration** - Maps container published ports to host ports
- **Unified View** - See everything in one screen
- **Filter** - Show all / host only / docker only
- **Search** - Filter by port number or process name
- **Kill Process** - Terminate a host process (with confirmation)
- **Stop Container** - Stop a Docker container (with confirmation)
- **Auto-refresh** - Toggle on/off (3s interval)

## Installation

```bash
git clone https://github.com/yourusername/portradar.git
cd portradar
npm install
```

## Usage

```bash
npm start
```

## Controls

| Key | Action |
|-----|--------|
| `↑` `↓` | Navigate list |
| `1` | Filter: All |
| `2` | Filter: Host only |
| `3` | Filter: Docker only |
| `f` | Cycle filters |
| `/` | Focus search |
| `k` | Kill selected process |
| `d` | Stop selected container |
| `r` | Toggle auto-refresh |
| `q` | Quit |

## Requirements

- Node.js 18+
- Linux (uses `/proc` filesystem)
- Docker (optional, for container ports)

## How It Works

### Host Ports
Reads `/proc/net/tcp` and `/proc/net/udp` to find listening ports, then maps inodes to PIDs via `/proc/<pid>/fd`.

### Docker Containers
Uses the Docker Engine API to fetch running containers and their port mappings. Requires access to Docker socket (`/var/run/docker.sock`) or Docker daemon.

## Tech Stack

- **Runtime:** Node.js
- **TUI:** Blessed
- **Docker:** Dockerode

## License

MIT
