import { useState } from 'react';
import { useVpsStore, type VpsProfile } from './store/vpsStore';
import { SessionView } from './components/SessionView';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';

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
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {/* Sidebar: VPS Profiles */}
      <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h1 className="font-bold text-lg text-indigo-400 cursor-pointer" onClick={() => handleSelectVps(null)}>Remora</h1>
          <button 
            onClick={handleAddVps}
            className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800 font-bold"
            title="Add VPS"
          >
            +
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {profiles.map(p => (
            <div 
              key={p.id}
              className={`p-3 rounded cursor-pointer group flex justify-between items-center transition-colors
                ${activeVpsId === p.id && !showSettings ? 'bg-indigo-600 text-white' : 'hover:bg-neutral-800 text-neutral-300'}`}
              onClick={() => handleSelectVps(p.id)}
            >
              <div className="flex flex-col min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className={`text-xs truncate ${activeVpsId === p.id && !showSettings ? 'text-indigo-200' : 'text-neutral-500'}`}>
                  {p.user}@{p.host}
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeProfile(p.id); if (activeVpsId === p.id) handleSelectVps(null); }}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-400 p-1 rounded flex-shrink-0 ml-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={() => { setShowSettings(true); setActiveVpsId(null); }}
            className={`w-full py-2 rounded text-sm transition-colors ${showSettings ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-neutral-950">
        {showSettings ? (
          <Settings />
        ) : activeVpsId ? (
          <SessionView vpsId={activeVpsId} />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

export default App;
