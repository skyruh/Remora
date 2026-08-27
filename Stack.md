# Stack & Build Order

A Tauri-based, terminal-first dev workspace for remote VPS access — file explorer, editor, terminal, git, and fleet tooling, all operating against remote machines over SSH/SFTP.

---

## 1. Tech Stack

### Shell / App Framework
| Tech | Purpose |
|---|---|
| **Tauri 2** | Native app shell. Ships a system-webview-based binary (no bundled Chromium) — keeps the app small (~7-8MB range) and fast to launch. |
| **Rust** | Backend/core logic — SSH/SFTP handling, PTY management, file diffing, system calls. All heavy lifting stays native. |
| **React 19** | Frontend UI — panes, tabs, tree views, dashboards. |
| **TypeScript** | Type safety across the frontend. |
| **Vite** | Frontend build tool/dev server, pairs natively with Tauri. |
| **Tailwind v4** | Styling/utility CSS. |
| **shadcn/ui** | Base component primitives (dialogs, dropdowns, tabs) to build on instead of styling from scratch. |
| **Zustand** | Frontend state management — active VPS, open tabs, session state. |

### Terminal
| Tech | Purpose |
|---|---|
| **xterm.js** | Terminal emulator rendering in the webview. |
| **WebGL addon (xterm.js)** | GPU-accelerated rendering for fast scroll/redraw. |
| **portable-pty (Rust crate)** | Cross-platform PTY spawning — used for any *local* shell needs and as the interface pattern for remote shells. |
| **ssh2 or russh (Rust crate)** | SSH client — auth, channel/session management, remote PTY allocation for the terminal panes. Pick one after prototyping both (russh is pure-Rust/async; ssh2 wraps libssh2, more battle-tested). |

### File Explorer / Remote FS
| Tech | Purpose |
|---|---|
| **SFTP (via ssh2/russh's sftp subsystem)** | Remote directory listing, file read/write, rename/delete/move. |
| **notify (Rust crate)** *or* polling | Local file-watch (for local↔remote transfer staging); remote-side changes detected via periodic lightweight `ls`/`stat` diffing since inotify doesn't cross SSH. |

### Editor
| Tech | Purpose |
|---|---|
| **CodeMirror 6** | In-app code editor — syntax highlighting, multi-language support, diff rendering. |
| **diff / similar (Rust crate)** | Compute local-edit-vs-remote-file diffs before overwrite confirmation. |

### Credentials / Security
| Tech | Purpose |
|---|---|
| **keyring (Rust crate)** | Store SSH key passphrases/paths and any saved passwords in the OS-native credential store (Keychain/Credential Manager/Secret Service) — never plaintext on disk. |
| **OS SSH agent integration** | Prefer agent-based auth where available over storing raw keys. |

### Git
| Tech | Purpose |
|---|---|
| **git2 (libgit2 Rust bindings)** *or* shelling out to remote `git` over SSH | Stage/commit/push/pull, log, branch, diff — operating against the repo on the VPS. Shelling out to the VPS's own `git` binary over the SSH channel is simplest for v1; `git2` locally only helps if you clone/mirror, which isn't the goal here. |

### Dashboard / Monitoring
| Tech | Purpose |
|---|---|
| **Remote command polling** (`top`/`vmstat`/`df`/`ss` parsed over SSH) | CPU/mem/disk/network stats and listening ports — no separate daemon needed on the VPS. |
| **Recharts or a lightweight charting lib** | Sparklines/graphs for CPU/mem/network history in the dashboard. |

### Port-forward / Preview
| Tech | Purpose |
|---|---|
| **SSH local port-forwarding (via ssh2/russh channel API)** | Tunnel a VPS-side port to localhost. |
| **Native child webview (Tauri) or in-app iframe-equivalent** | Render the forwarded service inline as a preview tab. |

---

## 2. Feature Build Order

### Phase 1 — Connection Foundation
1. VPS profile storage (host, port, user, auth method) + OS keychain integration
2. SSH connect/auth flow, including key-based, password, and jump-host support
3. Reconnect/retry logic for dropped connections
4. Basic terminal pane bound to a live SSH shell (xterm.js + WebGL renderer)

### Phase 2 — Terminal Core
5. Multiple terminal tabs/splits per VPS session
6. Auto-reattach to `tmux`/`screen` so long-running commands survive disconnects
7. Per-VPS session state (open tabs, last cwd) restored on reconnect

### Phase 3 — File Explorer
8. SFTP-backed remote directory tree, lazy-loaded
9. Create/rename/delete/move files and folders remotely
10. Drag-drop upload/download between local machine and VPS
11. Live-ish remote file-watch (polling-based diff against last known state)

### Phase 4 — Editor
12. CodeMirror 6 integration, open remote files into tabs
13. Save-to-remote with diff preview before overwrite
14. Syntax highlighting for common languages

### Phase 5 — Git Panel
15. Stage/unstage, commit, push/pull against the VPS repo
16. Branch display + basic log view
17. Per-file diff view
18. Stash management, `.gitignore`-aware tree dimming

### Phase 6 — Port-Forward / Preview
19. Manual port-forward entry + local tunnel
20. In-app preview tab for the forwarded service
21. Auto-detect listening ports (`ss -tlnp` parsing)
22. Multiple named, saved forwards per VPS

### Phase 7 — Multi-VPS Dashboard
23. Overview grid of saved VPS profiles with connection status (up/down/latency)
24. CPU/mem/disk polling per box
25. Network I/O sparkline graphs
26. Disk usage breakdown (biggest dirs via `du`)
27. Alert thresholds (desktop notification on CPU/mem/disk crossing a set %)
28. Log tailing widget (pinned `journalctl -f` or app log per server)
29. Cron job viewer across boxes
30. Uptime/reboot alerts

### Phase 8 — Quality-of-Life / Polish
31. Global command palette (Cmd+K) — jump to VPS/file/action
32. Themable UI (custom themes, background images)
33. Keyboard-driven navigation between panes
34. Session templates (auto-open tab sets per VPS tag, e.g. `prod`)
35. Snippet library (saved common commands per VPS)
36. Command history search across sessions
37. Broadcast/sync input to multiple panes

### Phase 9 — Later / Infra-Heavy (optional, evaluate demand first)
38. Docker/container panel (list, logs, restart/stop)
39. systemd service manager
40. Firewall rule viewer/editor
41. SSL cert expiry tracker
42. DNS/hosts quick-check
43. Snapshot/backup trigger (provider API integration — DigitalOcean/Linode/Hetzner)
44. Scheduled rsync-based backups
45. Config file versioning/diffing
46. Session recording/audit log
47. 2FA/TOTP-aware login handling
48. Per-profile "danger" flag with confirm-before-destructive-command
49. Read-only mode toggle
50. Search across remote files (ripgrep-over-SSH)
51. Permissions/ownership view+edit (chmod/chown UI)
52. Multi-VPS direct file transfer (VPS-to-VPS, no local hop)
53. Environment/secrets viewer (masked)
54. Notifications for long-running command completion

---

*Phases 1–4 constitute a usable MVP: connect, browse, edit, run commands. Phases 5–7 make it a genuinely useful daily driver. Phase 8 is polish. Phase 9 is scope creep to revisit only once the core is solid and battle-tested.*