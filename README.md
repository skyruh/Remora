# Remora

Remora is a modern, lightweight, multi-tabbed VPS management client built with Tauri, React, and TypeScript. It aims to provide a unified interface for server administration, combining terminal access, file management, and system telemetry into a single seamless experience.

## Features (In Development)
- **Multi-Tabbed Terminal**: Full-featured terminal interface using `xterm.js` and WebGL for high-performance rendering. Manage multiple sessions simultaneously.
- **File Explorer & Editor**: Integrated remote file browsing and editing capabilities.
- **Git Integration**: Built-in panel for staging, committing, and pushing changes directly on the remote server.
- **Port Forwarding**: Easy management of SSH port forwards to preview remote services locally.
- **Multi-VPS Dashboard**: Monitor CPU, memory, and disk usage across multiple servers from a unified dashboard.
- **Docker Management**: Quickly view, start, stop, and manage Docker containers running on your VPS.

## Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Zustand.
- **Backend / Desktop Frame**: Tauri v2 (Rust).
- **UI Components**: custom `shadcn/ui` components tailored for a terminal-first aesthetic.

## Getting Started

### Prerequisites
- Node.js (v20+)
- Rust & Cargo (latest stable)
- Tauri dependencies (see [Tauri documentation](https://v2.tauri.app/start/prerequisites/))

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/skyruh/Remora.git
   cd Remora
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```

### Running in Development
To start the application in development mode with hot-reloading:
```bash
npm run tauri dev
```

### Building for Production
To build the standalone executable:
```bash
npm run tauri build
```

## Project Status
Currently in the **UI Scaffolding phase**. The interface and state management have been mocked out to establish the UX flow, and we are preparing to integrate the real Rust-backed SSH/SFTP logic.

## License
MIT
