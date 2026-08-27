import { useState } from 'react';
import { useVpsStore, VpsProfile } from './store/vpsStore';
import { Terminal } from './components/Terminal';

function App() {
  const { profiles, activeProfileId, addProfile, removeProfile, setActiveProfile } = useVpsStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<VpsProfile>>({
    name: '', host: '', port: 22, user: 'root', authMethod: 'password'
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfile.name || !newProfile.host) return;
    addProfile({
      id: crypto.randomUUID(),
      name: newProfile.name,
      host: newProfile.host,
      port: newProfile.port || 22,
      user: newProfile.user || 'root',
      authMethod: newProfile.authMethod || 'password',
    });
    setShowAdd(false);
    setNewProfile({ name: '', host: '', port: 22, user: 'root', authMethod: 'password' });
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-100 font-sans">
      {/* Sidebar - Profile List */}
      <div className="w-64 border-r border-neutral-800 flex flex-col">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Remora</h2>
          <button 
            onClick={() => setShowAdd(true)}
            className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-sm transition-colors"
          >
            + Add
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {profiles.length === 0 ? (
            <p className="text-neutral-500 text-sm p-2 text-center">No VPS profiles added</p>
          ) : (
            <div className="space-y-1">
              {profiles.map(p => (
                <div 
                  key={p.id} 
                  className={`group flex justify-between items-center p-2 rounded cursor-pointer hover:bg-neutral-800 transition-colors ${activeProfileId === p.id ? 'bg-neutral-800 border-l-2 border-indigo-500' : 'border-l-2 border-transparent'}`}
                  onClick={() => setActiveProfile(p.id)}
                >
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium truncate">{p.name}</span>
                    <span className="text-xs text-neutral-400 truncate">{p.user}@{p.host}:{p.port}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeProfile(p.id); }}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-neutral-950">
        {showAdd ? (
          <div className="flex-1 p-8 max-w-md">
            <h3 className="text-xl mb-4 font-semibold">Add New VPS</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Profile Name</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" 
                  value={newProfile.name} 
                  onChange={e => setNewProfile({...newProfile, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Hostname / IP</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" 
                  value={newProfile.host} 
                  onChange={e => setNewProfile({...newProfile, host: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-neutral-400 mb-1">User</label>
                  <input 
                    type="text" 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" 
                    value={newProfile.user} 
                    onChange={e => setNewProfile({...newProfile, user: e.target.value})}
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm text-neutral-400 mb-1">Port</label>
                  <input 
                    type="number" 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" 
                    value={newProfile.port} 
                    onChange={e => setNewProfile({...newProfile, port: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm transition-colors">
                  Save Profile
                </button>
                <button type="button" onClick={() => setShowAdd(false)} className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded text-sm transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : activeProfileId ? (
          <div className="flex-1 flex items-center justify-center text-neutral-500 overflow-hidden">
            <Terminal profileId={activeProfileId} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-600">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
            </div>
            <p>Select a VPS profile or add a new one to connect.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
