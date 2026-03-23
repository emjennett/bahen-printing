
import type { MockFile, PrintJob } from "../types";

interface StatusBarProps {
  file: MockFile | null;
  jobs: PrintJob[];
}

export function StatusBar({ file }: StatusBarProps) {

  return (
    <div className="h-7 bg-slate-100 border-t border-slate-200 flex items-center justify-between px-4 font-mono text-xs text-slate-400 shrink-0">
      <span>Printer: BA-2210-HP-LaserJet</span>
      <span className={`${file}? "text-blue-700": "text-slate-300}`}>
        {file
  ? "●  Ready"
  : "No file open"}
      </span>
      <span>Quota: 47pg remaining</span>
    </div>
  );
}