
interface SplashProps {
  onEnter: () => void;
}

export function Splash({ onEnter }: SplashProps) {
  return (
    <div className="absolute inset-0 z-[400] bg-slate-100 flex flex-col items-center justify-center font-sans">
      <div className="text-5xl mb-2 leading-none">🍃</div>
      <div className="text-3xl font-bold text-slate-800 mb-1">Bahen Printing</div>
      <div className="text-xs text-slate-400 tracking-widest mb-9">
        CS TEACHING LABS &nbsp;•&nbsp; ROOM BA-2210
      </div>

      {/* quick start inner card */}
      <div className="bg-white rounded-lg px-8 py-6 shadow-lg mb-7 min-w-[360px]">
        <div className="text-blue-600 font-bold font-mono text-xs tracking-widest mb-2">
          QUICK START
        </div>
        {[
          "Click Open file to open your document",
          "Adjust Options if needed",
          "Use Page settings for double-sided / page range",
          "Click Print to send to printer",
        ].map((s, i) => (
          <div key={i} className="font-mono text-xs leading-loose">
            <span className="text-slate-400">{i + 1}.&nbsp;</span>
            {s}
          </div>
        ))}
      </div>

      <div className="font-mono text-xs text-slate-400 mb-7">
        Print quota remaining :&nbsp;
        <span className="text-green-600 font-bold">47 pages</span>
      </div>

      <button
        onClick={onEnter}
        className="bg-blue-600 text-white border-none rounded-md px-12 py-3 font-bold text-base cursor-pointer tracking-wide shadow-lg shadow-blue-500/30 transition-transform active:scale-95 hover:bg-blue-700"
      >
        Open Interface →
      </button>
    </div>
  );
}