import React, { useState } from 'react'
import type { MockFile, PrintSettings, PrintJob } from '../types'
import { calcQuota,  DESTINATIONS } from '../data'
import { CheckCircleIcon, PrinterIcon } from 'lucide-react'

interface Props {
  file: MockFile
  settings: PrintSettings
  jobs: PrintJob[]
  onClose: () => void
  onConfirm: () => void
  onViewQueue: () => void
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-2 py-0.5">
      <span className="font-mono text-xs text-slate-400 w-28 shrink-0">{label}</span>
      <span className="font-mono text-xs text-slate-800">{value}</span>
    </div>
  )
}

// step1: confirm
function ConfirmStage({ file, settings, onCancel, onConfirm }: {
  file: MockFile; settings: PrintSettings; jobs: PrintJob[]
  onCancel: () => void; onConfirm: () => void
}) {
  const quota = calcQuota(file, settings)
  const dest  = DESTINATIONS.find(d => d.value === settings.destination)?.label ?? settings.destination
  const room  = dest.includes('2210') ? 'BA-2210' : 'BA-2240'

  return (
    <div className="bg-white w-[420px] shadow-2xl border border-slate-200 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200">
        <span className="text-blue-600 text-lg"><PrinterIcon className= "w-4 h-4" /></span>
        <span className="font-bold text-[15px] text-blue-600">Confirm Print Job</span>
      </div>

      {/* Details */}
      <div className="px-6 py-4 flex flex-col gap-0.5">
        <Row label="File:"         value={file.name} />
        <Row label="Printer:"      value={dest} />
        <Row label="Copies:"       value={settings.copies} />
        <Row label="Double-sided:" value={settings.duplex ? 'Yes' : 'No'} />
        <Row label="Quota used:"   value={`${quota} page${quota !== 1 ? 's' : ''}`} />
      </div>

      {/* Room notice */}
      <div className="mx-6 mb-4 px-4 py-2.5 bg-green-50 border border-green-300 rounded flex items-center gap-3">
        <span className="text-green-600 text-base"><CheckCircleIcon className='h-4 w-4'/></span>
        <p className="text-xs text-green-800 font-sans">Your job will be sent to room {room}.</p>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-5 flex gap-3">
        <button onClick={onCancel}
          className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans font-semibold text-sm transition-colors cursor-pointer border border-slate-200">
          Cancel
        </button>
        <button onClick={onConfirm}
          className="flex-[2] py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-sm transition-colors cursor-pointer">
          Confirm
        </button>
      </div>
    </div>
  )
}

// step 2: queued!
function QueuedStage({
  file,
  settings,
  jobs,
  onOk,
  onViewQueue
}: {
  file: MockFile
  settings: PrintSettings
  jobs: PrintJob[]
  onOk: () => void
  onViewQueue: () => void
}) {
  const quota = calcQuota(file, settings)
  const qPos  =  jobs.length + 2
  const dest  = DESTINATIONS.find(d => d.value === settings.destination)?.label ?? settings.destination

  return (
    <div className="bg-white w-[420px] shadow-2xl border border-slate-200 font-sans">
      {/* header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-blue-600 text-lg"><PrinterIcon className='h-4 w-4'/></span>
          <span className="font-bold text-[15px] text-blue-600">Print Job Queued</span>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-semibold text-xs transition-colors cursor-pointer border-none bg-transparent" onClick={onViewQueue}>
          View Queue
        </button>
      </div>

      {/*Details */}
      <div className="px-6 py-4 flex flex-col gap-0.5">
        <Row label="File:"         value={file.name} />
        <Row label="Printer:"      value={dest} />
        <Row label="Copies:"       value={settings.copies} />
        <Row label="Double-sided:" value={settings.duplex ? 'Yes' : 'No'} />
        <Row label="Quota used:"   value={`${quota}`} />
      </div>

      <div className="mx-6 mb-3 px-4 py-2.5 bg-green-50 border border-green-300 rounded flex items-start gap-3">
        <span className="text-green-600 text-base mt-0.5"><PrinterIcon className='h-4 w-4'/></span>
        <p className="text-xs text-green-800 leading-relaxed font-sans">
          Job sent. Position in queue:{' '}
          <span className="text-blue-600 font-bold underline cursor-pointer">{qPos}</span>
          <br />Please collect your printout shortly.
        </p>
      </div>

      <div className="mx-6 mb-1 flex justify-end">
        <span className="font-mono text-[10px] text-slate-400">~2 mins</span>
      </div>
      <div className="mx-6 mb-5 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 rounded-full"
          style={{ width: `45%` }} />
      </div>
      <div className="px-6 pb-5">
        <button onClick={onOk}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-colors cursor-pointer">
          OK
        </button>
      </div>
    </div>
  )
}

export function PrintConfirm({ file, settings, jobs, onClose, onConfirm, onViewQueue }: Props) {
  const [stage, setStage] = useState<'confirm' | 'queued'>('confirm')

  function handleConfirm() {
    onConfirm()          //triggers addJob 
    setStage('queued') //go to queued
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/45 flex items-center justify-center">
      {stage === 'confirm' ? (
        <ConfirmStage
          file={file} settings={settings} jobs={jobs}
          onCancel={onClose}
          onConfirm={handleConfirm}
        />
      ) : (
        <QueuedStage
  file={file}
  settings={settings}
  jobs={jobs}
  onOk={onClose}
  onViewQueue={onViewQueue}
/>
      )}
    </div>
  )
}