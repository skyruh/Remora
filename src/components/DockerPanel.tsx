import { useState } from 'react';

interface DockerPanelProps {
  vpsId: string;
}

export function DockerPanel({ vpsId: _vpsId }: DockerPanelProps) {
  const [containers] = useState([
    { id: '1a2b3c4d', name: 'nginx-proxy', status: 'running', image: 'nginx:alpine' },
    { id: '5e6f7g8h', name: 'db-postgres', status: 'running', image: 'postgres:15' },
    { id: '9i0j1k2l', name: 'redis-cache', status: 'exited', image: 'redis:latest' }
  ]);

  return (
    <div className="w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col h-full text-sm">
      <div className="p-3 border-b border-neutral-800 font-semibold text-neutral-300 flex justify-between items-center">
        <span>Docker Containers</span>
        <button className="text-neutral-500 hover:text-white">+</button>
      </div>
      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {containers.map(c => (
          <div key={c.id} className="p-2 border border-neutral-800 rounded bg-neutral-950">
            <div className="font-medium text-neutral-300 flex justify-between items-center mb-1">
              <span className="truncate">{c.name}</span>
              <span className={`w-2 h-2 rounded-full ${c.status === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
            <div className="text-xs text-neutral-500 truncate mb-2">
              {c.image}
            </div>
            <div className="flex gap-2 text-xs">
              {c.status === 'running' ? (
                <button className="text-yellow-500 hover:text-yellow-400">Stop</button>
              ) : (
                <button className="text-green-500 hover:text-green-400">Start</button>
              )}
              <button className="text-red-500 hover:text-red-400">Rm</button>
              <button className="text-indigo-400 hover:text-indigo-300 ml-auto">Logs</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
