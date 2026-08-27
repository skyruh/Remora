import { useState } from 'react';

interface GitPanelProps {
  vpsId: string;
}

export function GitPanel({ vpsId: _vpsId }: GitPanelProps) {
  const [commitMsg, setCommitMsg] = useState('');

  return (
    <div className="w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col h-full text-sm">
      <div className="p-3 border-b border-neutral-800 font-semibold text-neutral-300 flex justify-between items-center">
        <span>Git Source Control</span>
        <span className="text-xs text-neutral-500">main</span>
      </div>
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="mb-4">
          <textarea 
            className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Message (Cmd+Enter to commit)"
            rows={3}
            value={commitMsg}
            onChange={(e) => setCommitMsg(e.target.value)}
          />
          <button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded py-1.5 transition-colors">
            Commit
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">Staged Changes</div>
            <div className="text-neutral-400 pl-2">No staged changes</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">Changes (2)</div>
            <div className="flex justify-between items-center p-1 hover:bg-neutral-800 rounded cursor-pointer group">
              <span className="text-neutral-300 truncate">src/main.rs</span>
              <span className="text-yellow-500 text-xs font-mono group-hover:opacity-100 opacity-50">M</span>
            </div>
            <div className="flex justify-between items-center p-1 hover:bg-neutral-800 rounded cursor-pointer group">
              <span className="text-neutral-300 truncate">components/Button.tsx</span>
              <span className="text-green-500 text-xs font-mono group-hover:opacity-100 opacity-50">U</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
