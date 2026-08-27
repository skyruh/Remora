import { useVpsStore } from '../store/vpsStore';

export function Dashboard() {
  const { profiles } = useVpsStore();

  return (
    <div className="flex-1 p-8 bg-neutral-950 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Multi-VPS Dashboard</h2>
      
      {profiles.length === 0 ? (
        <div className="text-neutral-500 text-center p-12 border border-dashed border-neutral-800 rounded-lg">
          No VPS profiles found. Add one to see telemetry.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {profiles.map(p => (
            <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">{p.name}</h3>
                <span className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Connected
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>CPU</span>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Memory</span>
                    <span>2.4 GB / 8 GB</span>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Disk</span>
                    <span>45 GB / 100 GB</span>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
