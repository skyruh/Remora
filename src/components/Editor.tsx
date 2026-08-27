import { useState } from 'react';

interface EditorProps {
  vpsId: string;
}

export function Editor({ vpsId: _vpsId }: EditorProps) {
  const [content, setContent] = useState('// Remote file content goes here\n\nfunction hello() {\n  console.log("Hello from remote!");\n}');

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 h-full overflow-auto">
      <textarea 
        className="w-full h-full bg-transparent outline-none resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
