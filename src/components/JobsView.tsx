
import type { PrintJob } from '../types'
import { PrinterIcon } from 'lucide-react'

interface JobsViewProps {
  jobs: PrintJob[]
}

const DONE_JOB = {
  file: "jennette",
  pages: 2,
  copies: 1,
  duplex: true,
}

function ProgressBar() {

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-[10px] text-slate-400">
          {`~2 mins est.`}
        </span>
        <span className="font-mono text-[10px] text-slate-400">46%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `46%`, transition: 'width 2s ease' }}
        />
      </div>
    </div>
  )
}

export function JobsView({ jobs }: JobsViewProps) {


  return (
    <div className="flex-1 bg-white px-7 py-6 overflow-y-auto">

      {/*header */}
      <div className="flex items-center gap-3.5 mb-3">
        <div className="font-sans font-bold text-base text-blue-600">
          My Print Jobs
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-green-600">
          <span className="w-2 h-2 rounded-full bg-green-600 inline-block animate-pulse" />
          Live
        </div>
      </div>

      {jobs.length > 0 && (
        <div className="mb-5 px-4 py-2 border border-slate-200 bg-slate-50 font-mono text-xs text-slate-600">
          <span>
            <span className="font-bold text-slate-800">3 jobs ahead in queue</span>{" "}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2 border border-slate-200 mb-3 font-mono text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <PrinterIcon className="w-3.5 h-3.5 text-green-600" />
          <span className="text-slate-800">Jennette</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>{DONE_JOB.copies} copy</span>
          <span>·</span>
          <span>{DONE_JOB.pages} pages</span>
          <span>·</span>
          <span className="text-green-600 font-semibold">Done</span>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <img
            src="src/assets/nojobs.png"
            className="w-28 h-auto opacity-80 mb-3"
            alt="No jobs"
          />
          <div className=" text-slate-400 font-mono text-xs w-full max-w-xs">
            No jobs queued
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job, i) => {

            return (
              <div
                key={i}
                className="border border-slate-200 rounded-lg px-5 py-4 bg-white"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <PrinterIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="font-mono text-sm text-slate-800 truncate">
                      {job.file}
                    </span>
                  </div>

                  <span
                    className={`shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-full border n bg-amber-100 text-amber-700`}
                  >
            {"Printing"}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span>{job.copies} cop{job.copies !== 1 ? 'ies' : 'y'}</span>
                  <span>·</span>
                  <span>{job.pages} page{job.pages !== 1 ? 's' : ''}</span>
                  <span>·</span>
                  <span>{job.duplex ? 'Double-sided' : 'Single-sided'}</span>
                </div>
                <ProgressBar />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}