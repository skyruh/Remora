import { useEffect } from 'react';
import { useSessionStore, Tab } from '../store/sessionStore';
import { Terminal } from './Terminal';
import { FileExplorer } from './FileExplorer';
import { Editor } from './Editor';

interface SessionViewProps {
  vpsId: string;
}

export function SessionView({ vpsId }: SessionViewProps) {
  const { sessions, initSession, addTab, removeTab, setActiveTab } = useSessionStore();

  useEffect(() => {
    initSession(vpsId);
  }, [vpsId, initSession]);

  const session = sessions[vpsId];
  if (!session) return <div className="p-4">Initializing session...</div>;

  const handleAddTerminal = () => {
    addTab(vpsId, { id: crypto.randomUUID(), type: 'terminal', title: `Terminal ${session.tabs.length + 1}` });
  };
  
  const handleAddEditor = () => {
    addTab(vpsId, { id: crypto.randomUUID(), type: 'editor', title: `Editor` });
  };

  return (
    <div className="flex h-full overflow-hidden bg-neutral-950">
      {/* Sidebar: File Explorer */}
      <FileExplorer vpsId={vpsId} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tab Bar */}
        <div className="flex bg-neutral-900 border-b border-neutral-800 overflow-x-auto no-scrollbar">
          {session.tabs.map((tab) => (
            <div 
              key={tab.id}
              className={`group flex items-center min-w-[120px] max-w-[200px] border-r border-neutral-800 cursor-pointer select-none
                ${session.activeTabId === tab.id ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'}`}
              onClick={() => setActiveTab(vpsId, tab.id)}
            >
              <div className="flex-1 truncate py-2 px-3 text-sm">
                {tab.type === 'terminal' && '🖥️ '}
                {tab.type === 'editor' && '📝 '}
                {tab.title}
              </div>
              <div 
                className="px-2 py-1 opacity-0 group-hover:opacity-100 hover:bg-neutral-700 hover:text-red-400 rounded-sm"
                onClick={(e) => { e.stopPropagation(); removeTab(vpsId, tab.id); }}
              >
                ×
              </div>
            </div>
          ))}
          <button 
            onClick={handleAddTerminal}
            className="px-3 py-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            title="New Terminal"
          >
            + Term
          </button>
          <button 
            onClick={handleAddEditor}
            className="px-3 py-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            title="New Editor"
          >
            + Edit
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 relative">
          {session.tabs.map((tab) => (
            <div 
              key={tab.id}
              className={`absolute inset-0 ${session.activeTabId === tab.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {tab.type === 'terminal' && <Terminal profileId={vpsId} key={tab.id} />}
              {tab.type === 'editor' && <Editor vpsId={vpsId} key={tab.id} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
