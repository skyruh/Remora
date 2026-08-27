import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { WebglAddon } from '@xterm/addon-webgl';
import '@xterm/xterm/css/xterm.css';

interface TerminalProps {
  profileId: string;
}

export function Terminal({ profileId }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontFamily: 'ui-monospace, Consolas, monospace',
      fontSize: 14,
      theme: {
        background: '#0a0a0a',
        foreground: '#e5e5e5',
      },
    });

    xtermRef.current = term;
    term.open(terminalRef.current);
    
    // Use WebGL Addon for performance
    try {
      const webglAddon = new WebglAddon();
      term.loadAddon(webglAddon);
    } catch (e) {
      console.warn("WebGL addon could not be loaded", e);
    }

    term.writeln(`Connecting to profile ${profileId}...`);
    
    // Invoke Tauri backend to start SSH connection
    import('@tauri-apps/api/core').then(({ invoke }) => {
      invoke<string>('connect_vps', { profileId })
        .then((res) => {
          term.writeln(`[Backend]: ${res}`);
          term.writeln('Connection established. (Mock SSH session)');
          term.write('user@remote:~$ ');
        })
        .catch((err) => {
          term.writeln(`\x1b[31mConnection failed: ${err}\x1b[0m`);
        });
    });

    const onData = term.onData((data) => {
      // Echo data (mock behavior)
      const char = data === '\r' ? '\r\n' : data;
      term.write(char);
      if (data === '\r') {
         term.write('user@remote:~$ ');
      }
    });

    return () => {
      onData.dispose();
      term.dispose();
    };
  }, [profileId]);

  return <div ref={terminalRef} className="w-full h-full p-2 bg-[#0a0a0a]" />;
}
