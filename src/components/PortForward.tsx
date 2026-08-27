import { useState } from 'react';

interface PortForwardProps {
  vpsId: string;
}

export function PortForward({ vpsId: _vpsId }: PortForwardProps) {
  const [forwards] = useState([
    { id: 1, name: 'Web Server', local: 8080, remote: 80 },
    { id: 2, name: 'Database', local: 5432, remote: 5432 }
  ]);

  return (
    <div className="w-64 bg-neutral-900 border-l border-neutral-800 flex flex-col h-full text-sm">
      <div className="p-3 border-b border-neutral-800 font-semibold text-neutral-300 flex justify-between items-center">
        <span>Port Forwards</span>
        <button className="text-neutral-500 hover:text-white">+</button>
      </div>
      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {forwards.map(f => (
          <div key={f.id} className="p-2 border border-neutral-800 rounded bg-neutral-950">
            <div className="font-medium text-neutral-300 flex justify-between items-center mb-1">
              <span>{f.name}</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <div className="text-xs text-neutral-500 flex justify-between">
              <span>localhost:{f.local}</span>
              <span>→</span>
              <span>:{f.remote}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
