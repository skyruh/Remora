import { useState } from 'react';
import { useVpsStore, type VpsProfile } from './store/vpsStore';
import { SessionView } from './components/SessionView';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { PlusSignIcon, Settings01Icon, ServerIcon, Delete01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

function App() {
  const { profiles, addProfile, removeProfile } = useVpsStore();
  const [activeVpsId, setActiveVpsId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleAddVps = () => {
    const newProfile: VpsProfile = {
      id: crypto.randomUUID(),
      name: `VPS ${profiles.length + 1}`,
      host: '127.0.0.1',
      user: 'root',
      port: 22,
      authMethod: 'password'
    };
    addProfile(newProfile);
  };

  const handleSelectVps = (id: string | null) => {
    setShowSettings(false);
    setActiveVpsId(id);
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans terax-pane">
      {/* @ts-expect-error react-resizable-panels types missing direction */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-sidebar-primary text-sidebar-primary-foreground">
            <h1 className="font-bold text-lg cursor-pointer flex items-center gap-2" onClick={() => handleSelectVps(null)}>
              <HugeiconsIcon icon={ServerIcon} size={20} />
              Remora
            </h1>
            <button 
              onClick={handleAddVps}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-1 rounded transition-colors"
              title="Add VPS"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {profiles.map(p => (
              <div 
                key={p.id}
                className={`p-3 rounded cursor-pointer group flex justify-between items-center transition-colors
                  ${activeVpsId === p.id && !showSettings ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent text-sidebar-foreground'}`}
                onClick={() => handleSelectVps(p.id)}
              >
                <div className="flex flex-col min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className={`text-xs truncate ${activeVpsId === p.id && !showSettings ? 'opacity-80' : 'text-muted-foreground'}`}>
                    {p.user}@{p.host}
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeProfile(p.id); if (activeVpsId === p.id) handleSelectVps(null); }}
                  className="opacity-0 group-hover:opacity-100 hover:text-destructive p-1 rounded flex-shrink-0 ml-2 transition-opacity"
                >
                  <HugeiconsIcon icon={Delete01Icon} size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button 
              onClick={() => { setShowSettings(true); setActiveVpsId(null); }}
              className={`w-full py-2 rounded text-sm transition-colors flex items-center justify-center gap-2
                ${showSettings ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              <HugeiconsIcon icon={Settings01Icon} size={16} />
              Settings
            </button>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={80} className="flex flex-col min-w-0 bg-background">
          {showSettings ? (
            <Settings />
          ) : activeVpsId ? (
            <SessionView vpsId={activeVpsId} />
          ) : (
            <Dashboard />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
