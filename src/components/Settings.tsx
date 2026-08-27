import { useState } from 'react';

export function Settings() {
  const [theme, setTheme] = useState('dark');
  const [font, setFont] = useState('JetBrains Mono');

  return (
    <div className="flex-1 p-8 bg-neutral-950 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral-300 border-b border-neutral-800 pb-2">Appearance</h3>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-neutral-500">Select your preferred color theme</div>
            </div>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 outline-none focus:border-indigo-500"
            >
              <option value="dark">Dark (Default)</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Terminal Font</div>
              <div className="text-sm text-neutral-500">Font family used in the terminal</div>
            </div>
            <select 
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 outline-none focus:border-indigo-500"
            >
              <option value="JetBrains Mono">JetBrains Mono</option>
              <option value="Fira Code">Fira Code</option>
              <option value="Consolas">Consolas</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-neutral-300 border-b border-neutral-800 pb-2">Shortcuts</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-2 bg-neutral-900 rounded border border-neutral-800">
              <span className="text-neutral-400">New Terminal</span>
              <kbd className="bg-neutral-800 px-2 rounded text-neutral-300 font-mono">⌘T</kbd>
            </div>
            <div className="flex justify-between p-2 bg-neutral-900 rounded border border-neutral-800">
              <span className="text-neutral-400">Close Tab</span>
              <kbd className="bg-neutral-800 px-2 rounded text-neutral-300 font-mono">⌘W</kbd>
            </div>
            <div className="flex justify-between p-2 bg-neutral-900 rounded border border-neutral-800">
              <span className="text-neutral-400">Toggle Git Panel</span>
              <kbd className="bg-neutral-800 px-2 rounded text-neutral-300 font-mono">⌘⇧G</kbd>
            </div>
            <div className="flex justify-between p-2 bg-neutral-900 rounded border border-neutral-800">
              <span className="text-neutral-400">Settings</span>
              <kbd className="bg-neutral-800 px-2 rounded text-neutral-300 font-mono">⌘,</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
