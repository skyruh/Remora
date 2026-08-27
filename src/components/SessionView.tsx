import { useEffect, useState } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { Terminal as TerminalComponent } from './Terminal';
import { FileExplorer } from './FileExplorer';
import { Editor } from './Editor';
import { GitPanel } from './GitPanel';
import { PortForward } from './PortForward';
import { DockerPanel } from './DockerPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { 
  GitBranch, 
  Network, 
  Box, 
  X, 
  Terminal,
  FileCode2,
  Plus
} from 'lucide-react';

interface SessionViewProps {
  vpsId: string;
}

export function SessionView({ vpsId }: SessionViewProps) {
  const { sessions, initSession, addTab, removeTab, setActiveTab } = useSessionStore();
  const [activeRightPanel, setActiveRightPanel] = useState<'none' | 'git' | 'ports' | 'docker'>('none');

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
    // @ts-expect-error react-resizable-panels types missing direction
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      {/* Sidebar: File Explorer */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar">
        <FileExplorer vpsId={vpsId} />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={activeRightPanel === 'none' ? 80 : 60} className="flex flex-col min-w-0 bg-background">
        {/* Tab Bar */}
        <div className="flex bg-muted border-b overflow-x-auto no-scrollbar items-center h-10 shrink-0">
          {session.tabs.map((tab) => (
            <div 
              key={tab.id}
              className={`group flex items-center h-full min-w-[120px] max-w-[200px] border-r cursor-pointer select-none transition-colors
                ${session.activeTabId === tab.id ? 'bg-background text-foreground border-b-transparent relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
              onClick={() => setActiveTab(vpsId, tab.id)}
            >
              <div className="flex-1 truncate py-2 px-3 text-sm flex items-center gap-2">
                {tab.type === 'terminal' ? <Terminal size={14} /> : <FileCode2 size={14} />}
                {tab.title}
              </div>
              <button 
                className="px-2 py-1 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground rounded-sm mr-1 transition-opacity"
                onClick={(e) => { e.stopPropagation(); removeTab(vpsId, tab.id); }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <div className="flex items-center px-2 gap-1 border-r h-full">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={handleAddTerminal} title="New Terminal">
              <Terminal size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={handleAddEditor} title="New Editor">
              <Plus size={14} />
            </Button>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center h-full border-l">
            <Button 
              variant={activeRightPanel === 'git' ? 'secondary' : 'ghost'} 
              className={`h-full rounded-none border-r ${activeRightPanel === 'git' ? 'bg-background' : ''}`}
              onClick={() => setActiveRightPanel(p => p === 'git' ? 'none' : 'git')}
            >
              <GitBranch size={14} className="mr-2" />
              Git
            </Button>
            <Button 
              variant={activeRightPanel === 'ports' ? 'secondary' : 'ghost'} 
              className={`h-full rounded-none border-r ${activeRightPanel === 'ports' ? 'bg-background' : ''}`}
              onClick={() => setActiveRightPanel(p => p === 'ports' ? 'none' : 'ports')}
            >
              <Network size={14} className="mr-2" />
              Ports
            </Button>
            <Button 
              variant={activeRightPanel === 'docker' ? 'secondary' : 'ghost'} 
              className={`h-full rounded-none ${activeRightPanel === 'docker' ? 'bg-background' : ''}`}
              onClick={() => setActiveRightPanel(p => p === 'docker' ? 'none' : 'docker')}
            >
              <Box size={14} className="mr-2" />
              Docker
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 relative bg-background">
          {session.tabs.map((tab) => (
            <div 
              key={tab.id}
              className={`absolute inset-0 ${session.activeTabId === tab.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {tab.type === 'terminal' && <TerminalComponent profileId={vpsId} key={tab.id} />}
              {tab.type === 'editor' && <Editor vpsId={vpsId} key={tab.id} />}
            </div>
          ))}
        </div>
      </ResizablePanel>
      
      {/* Right Panels */}
      {activeRightPanel !== 'none' && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20} minSize={15} maxSize={40} className="bg-sidebar">
            {activeRightPanel === 'git' && <GitPanel vpsId={vpsId} />}
            {activeRightPanel === 'ports' && <PortForward vpsId={vpsId} />}
            {activeRightPanel === 'docker' && <DockerPanel vpsId={vpsId} />}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
