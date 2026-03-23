import React, { useState } from 'react'
import type { MarginOption, MockFile, PrintSettings } from '../types'
import { SCALE_OPTIONS, DESTINATIONS, calcQuota, MARGIN_OPTIONS, MARGIN_PRESETS } from '../data'
import { ChevronDown, ChevronUp, CornerDownRight } from 'lucide-react'

interface Props {
  file: MockFile | null
  settings: PrintSettings
  onChange: (s: PrintSettings) => void
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-blue-600 font-mono font-bold text-xs tracking-widest uppercase my-2">
      {children}
    </div>
  )
}

/* ── Stepper ──────────────────────────────────────────────── */

function Stepper({
  value,
  onChange,
  min = 1,
  max = 999,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  const [editing, setEditing] = useState(false)
  const [raw, setRaw] = useState(String(value))

  React.useEffect(() => {
    if (!editing) setRaw(String(value))
  }, [value, editing])

  function commit() {
    setEditing(false)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)))
    } else {
      setRaw(String(value))
    }
  }

  return (
    <div className="flex items-center border border-slate-300 rounded-sm overflow-hidden bg-white">
      <input
        type="text"
        inputMode="numeric"
        value={raw}
        onChange={(e) => { setEditing(true); setRaw(e.target.value) }}
        onBlur={commit}
        onKeyDown={(e) => e.key === 'Enter' && commit()}
        className="w-10 text-right text-sm font-sans text-slate-800 px-2 py-0.5 outline-none bg-white"
      />
      <div className="flex flex-col border-l border-slate-300">
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { setEditing(false); onChange(Math.min(max, value + 1)) }}
          className="w-6 h-2 flex items-center justify-center hover:bg-slate-100 border-b border-slate-300"
        >
          <ChevronUp size={12} />
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => { setEditing(false); onChange(Math.max(min, value - 1)) }}
          className="w-6 h-2 flex items-center justify-center hover:bg-slate-100"
        >
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  )
}
function Select({
  value,
  onChange,
  options,
  width = 'w-36',
}: {
  value: string
  onChange: (v: string) => void
  options: { label: string; value: string }[]
  width?: string
}) {
  return (
    <div className={`relative ${width}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-slate-300 rounded-sm bg-white text-slate-800 text-sm font-sans px-2 py-1 pr-6 outline-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-0' : '-translate-x-4'}`} />
    </button>
  )
}

function Checkbox({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-5 h-5 rounded flex items-center justify-center transition-colors"
      style={{ background: value ? '#2563eb' : '#fff', border: value ? '2px solid #2563eb' : '2px solid #cbd5e1' }}
    >
      {value && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

interface CustomMargins { top: string; bottom: string; left: string; right: string }


function cmInput(label: string, val: string, set: (v: string) => void) {
  return (
    <div className="flex flex-col gap-0.5" key={label}>
      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">{label}</label>
      <div className="flex items-center border border-slate-300 rounded-sm bg-white overflow-hidden">
        <input
          type="text"
          value={val}
          onChange={(e) => set(e.target.value)}
          className="w-12 text-right text-xs font-mono text-slate-800 px-1.5 py-1 outline-none bg-white"
        />
        <span className="text-[10px] font-mono text-slate-400 pr-1.5 select-none">cm</span>
      </div>
    </div>
  )
}

interface MarginPresetsProps {
  value: string
  onChange: (preset: string, margins: MarginOption) => void
}

function MarginPresets({ value, onChange }: MarginPresetsProps) {
  const [custom, setCustom] = useState<CustomMargins>({
    top: '2.54', bottom: '2.54', left: '2.54', right: '2.54',
  })

  function applyCustom(next: CustomMargins) {
    const t = parseFloat(next.top)    || 0
    const b = parseFloat(next.bottom) || 0
    const l = parseFloat(next.left)   || 0
    const r = parseFloat(next.right)  || 0
    onChange('custom', { label: 'Custom', t, b, l, r })
  }

  function setC(k: keyof CustomMargins) {
    return (v: string) => {
      const next = { ...custom, [k]: v }
      setCustom(next)
      if (value === 'custom') applyCustom(next)
    }
  }

  function selectPreset(preset: string) {
    if (preset === 'custom') {
      applyCustom(custom)
    } else {
      onChange(preset, MARGIN_PRESETS[preset])
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {MARGIN_OPTIONS.map((opt) => (
        <div key={opt.value}>
          <button
            onClick={() => selectPreset(opt.value)}
            className="flex items-center gap-2.5 text-left w-full group"
          >
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${value === opt.value ? 'border-blue-600' : 'border-slate-300 group-hover:border-slate-400'}`}>
              {value === opt.value && <span className="w-2 h-2 rounded-full bg-blue-600 block" />}
            </span>
            <span className="text-xs text-slate-700 font-sans w-14 shrink-0">{opt.label}</span>
            {opt.hint && <span className="text-xs font-mono text-slate-400">{opt.hint}</span>}
          </button>

          {opt.value === 'custom' && value === 'custom' && (
            <div className="mt-2 ml-6 grid grid-cols-2 gap-x-3 gap-y-2">
              {cmInput('Top',    custom.top,    setC('top'))}
              {cmInput('Bottom', custom.bottom, setC('bottom'))}
              {cmInput('Left',   custom.left,   setC('left'))}
              {cmInput('Right',  custom.right,  setC('right'))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function Sidebar({ file, settings, onChange }: Props) {
  const set = <K extends keyof PrintSettings>(k: K, v: PrintSettings[K]) =>
    onChange({ ...settings, [k]: v })
  // track which is active
  const [marginPreset, setMarginPreset] = useState('normal')
  const quota = calcQuota(file, settings)
  function handleMarginChange(preset: string, margins: MarginOption) {
    setMarginPreset(preset)
    onChange({ ...settings, margins })
  }

  return (
    <div className="w-[380px] shrink-0 bg-slate-50 border-l border-slate-200 flex flex-col h-full overflow-hidden">

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      <div className="sidebar-scroll flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto min-h-0">

        <div className="bg-white border border-slate-200 rounded-lg px-4 py-1">
          <SectionLabel>Page Options</SectionLabel>

          <div className="flex items-center justify-between py-1.5">
            <div className='flex flex-row gap-2'>
              <span className="text-xs font-sans text-slate-700">Pages</span>
              <span className='text-xs font-sans text-slate-400'>(e.g. "All"; 2-3)</span>
            </div>
            <input
              type="text"
              value={settings.pageRange || 'All'}
              onChange={(e) => {
                const val = e.target.value
                set('pageRange', val === 'All' ? '' : val)
              }}
              className="w-28 text-sm border border-slate-300 rounded-sm px-2 py-1"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-sans text-slate-700">Pages per sheet</span>
            <Stepper value={settings.nup} min={1} max={6} onChange={(v) => set('nup', v)} />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-sans text-slate-700">Copies</span>
            <Stepper value={settings.copies} min={1} max={99} onChange={(v) => set('copies', v)} />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-sans text-slate-700">Scale</span>
            <Select
              value={settings.scale}
              onChange={(v) => set('scale', v)}
              options={SCALE_OPTIONS.map((s) => ({ label: s, value: s }))}
              width="w-28"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-sans text-slate-700">Double-sided</span>
            <Toggle value={settings.duplex} onChange={(v) => set('duplex', v)} />
          </div>

          {settings.duplex && (
            <div className="flex items-center justify-between py-1 pl-5">
              <span className="text-slate-500 flex items-center gap-1 mt-0.5 text-xs">
                <CornerDownRight size={14} />
                Flip on long edge
              </span>
              <Checkbox value={settings.flipOnLongEdge} onChange={(v) => set('flipOnLongEdge', v)} />
            </div>
          )}

          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-sans text-slate-700">Destination</span>
            <Select
              value={settings.destination}
              onChange={(v) => set('destination', v)}
              options={DESTINATIONS.map((d) => ({ label: d.label, value: d.value }))}
              width="w-44"
            />
          </div>

          <SectionLabel>Margin Presets</SectionLabel>
          <MarginPresets value={marginPreset} onChange={handleMarginChange} />
          <div className="h-2" />
        </div>

        {/*quota */}
        {file && (
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 flex justify-between shrink-0">
            <div>
              <div className="font-mono text-[9px] text-slate-400 uppercase">Quota</div>
              <div className="font-mono text-sm text-slate-800 font-bold">
                {quota || '—'} page{quota !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] text-slate-400 uppercase">Remaining</div>
              <div className="font-mono text-sm text-green-600 font-bold">47 pages</div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}