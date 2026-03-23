
import { MOCK_FILES } from "../data";
import type { MockFile } from "../types";
import { XIcon } from "lucide-react";

interface FileBrowserProps {
  current: MockFile | null;
  onSelect: (f: MockFile) => void;
  onClose: () => void;
}

export function FileBrowser({ current, onSelect, onClose }: FileBrowserProps) {
  return (
    <div className="absolute inset-0 z-[500] flex items-start justify-center pt-20 bg-slate-900/20 backdrop-blur-sm">
      <div className="bg-white border border-slate-400 w-80 shadow-sm font-mono text-xs">
        <div className="flex justify-between items-center px-2 py-1 bg-slate-100 border-b border-slate-400">
          <span>SELECT FILE</span>
          <button onClick={onClose} className="hover:text-red-600"> <XIcon/> </button>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {MOCK_FILES.map((f) => {
            const isSelected = current?.name === f.name;
            return (
              <div
                key={f.name}
                onClick={() => { onSelect(f); onClose(); }}
                className={`px-2 py-1.5 cursor-pointer border-b border-slate-100 last:border-0 flex justify-between
                  ${isSelected ? "bg-blue-600 text-white" : "hover:bg-slate-50 text-slate-800"}`}
              >
                <span>{isSelected ? "> " : "  "}{f.name}</span>
                <span className="opacity-60">{f.pages} pages</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}