export type View = 'home' | 'file' | 'help' | 'jobs'
export type ViewType = View
export type JobStatus = 'Queued' | 'Printing' | 'Done'

export interface MockFile {
  name: string
  pages: number
  cutoff: boolean
}

export interface MarginOption {
  label: string
  t: number
  r: number
  b: number
  l: number
}

export type MarginPreset = MarginOption

export interface PrintSettings {
  margins: MarginOption
  duplex: boolean
  flipOnLongEdge: boolean
  nup_col: number
  nup_row: number
  copies: number
  pageRange: string
  scale: string
  destination: string
}

export interface PrintJob {
  id: number
  file: string
  pages: number
  duplex: boolean
  margins: string
  status: JobStatus
  copies:number
}

export interface QueueEntry {
  user: string
  pages: number
  status: string
}
export interface QueueItem {
  user: string;
  pages: number;
  status: string;
}