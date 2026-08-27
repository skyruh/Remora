import { useState } from 'react';

interface FileExplorerProps {
  vpsId: string;
}

export function FileExplorer({ vpsId }: FileExplorerProps) {
  const [files] = useState([
    { name: 'var', type: 'dir' },
    { name: 'etc', type: 'dir' },
    { name: 'home', type: 'dir' },
    { name: 'config.json', type: 'file' },
    { name: 'server.log', type: 'file' }
  ]);

  return (
    <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-full text-sm">
      <div className="p-2 border-b border-neutral-800 font-semibold text-neutral-300">
        Remote Files
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center gap-2 p-1 hover:bg-neutral-800 rounded cursor-pointer text-neutral-400 hover:text-neutral-200">
            {file.type === 'dir' ? '📁' : '📄'}
            <span className="truncate">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
