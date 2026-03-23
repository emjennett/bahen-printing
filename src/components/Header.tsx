import type { MockFile, ViewType } from "../types";

interface HeaderProps {
  file: MockFile | null;
  view: ViewType;
  setView: (v: ViewType) => void;
  onPrint: () => void;
  pendingCount: number;
}

interface NavBtnProps {
  id: ViewType;
  label: string;
  active: boolean;
  pendingCount?: number;
  onClick: () => void;
}

function NavBtn({ id, label, active, pendingCount = 0, onClick }: NavBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-5 h-full border-none font-sans text-sm cursor-pointer transition-all duration-150
        ${active
          ? "bg-white/10 text-white font-semibold border-b-2 border-white/60"
          : "bg-transparent text-white/75 font-normal border-b-2 border-transparent hover:bg-white/5"
        }
      `}
    >
      {label}
      {id === "jobs" && pendingCount > 0 && (
        <span className="absolute top-2 right-2 bg-amber-400 text-white rounded-full px-1 text-[10px] font-bold leading-4">
          {pendingCount}
        </span>
      )}
    </button>
  );
}

const NAV_ITEMS: { id: ViewType; label: string }[] = [
  { id: "help", label: "Help" },
  { id: "jobs", label: "Jobs" },
];

export function Header({ file, view, setView, onPrint, pendingCount }: HeaderProps) {
  const canPrint = !!file;

  return (
    <div className="h-12 bg-[#1e3a5f] flex items-stretch border-b border-black/20 shrink-0">
  
      <button
        onClick={() => setView('home')}
        className={`
          px-4 flex items-center border-r border-white/10 text-xl cursor-pointer transition-colors
          ${view === 'home' ? 'bg-white/10' : 'hover:bg-white/10'}
        `}
      >
        🍃
      </button>

      {NAV_ITEMS.map(({ id, label }) => (
        <NavBtn
          key={id}
          id={id}
          label={label}
          active={view === id}
          pendingCount={id === "jobs" ? pendingCount : 0}
          onClick={() => setView(view === id ? "home" : id)}
        />
      ))}

      <div className="flex-1" />
      <button
        onClick={canPrint ? onPrint : undefined}
        className={`
          border-none px-8 font-bold text-base tracking-wide border-l border-black/20 transition-colors duration-200
          ${canPrint
            ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            : "bg-white/5 text-white/30 cursor-not-allowed"
          }
        `}
      >
        Print
      </button>
    </div>
  );
}