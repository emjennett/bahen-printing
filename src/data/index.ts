import type { MockFile, MarginOption, PrintSettings } from '../types'

export const MOCK_FILES: MockFile[] = [
  { name: 'CSC311_cheat_sheet.pdf', pages: 2,  cutoff: true  },
  { name: 'assignment2.pdf',        pages: 8,  cutoff: false },
  { name: 'lecture_notes.pdf',      pages: 24, cutoff: false },
  { name: 'poster_club.pdf',        pages: 1,  cutoff: true  },
  { name: 'textbook_ch3.pdf',       pages: 64, cutoff: false },
]

export const MARGIN_PRESETS: Record<string, MarginOption> = {
  normal: { label: 'Normal', t: 2.54, b: 2.54, l: 2.54, r: 2.54 },
  narrow: { label: 'Narrow', t: 1.2,  b: 1.2,  l: 1.2,  r: 1.2  },
  wide:   { label: 'Wide',   t: 2.54, b: 2.54, l: 3.17, r: 3.17  },
}
 
export const MARGIN_OPTIONS: { label: string; value: string; hint: string }[] = [
  { label: 'Normal', value: 'normal', hint: 'T:2.54 B:2.54 L:2.54 R:2.54' },
  { label: 'Narrow', value: 'narrow', hint: 'T:1.2 B:1.2 L:1.2 R:1.2'     },
  { label: 'Wide',   value: 'wide',   hint: 'T:2.54 B:2.54 L:3.17 R:3.17'  },
  { label: 'Custom', value: 'custom', hint: ''                               },
]

export const MARGIN_OPTS = MARGIN_PRESETS


export const SCALE_OPTIONS = ['50%', '75%', '100%', '125%', '150%']

export const DESTINATIONS = [
  { label: "BA-2210-HP-LaserJet",  value: "ba2210" },
  { label: "BA-2240-HP-LaserJet",  value: "ba2240" },
  { label: "Save as PDF",           value: "pdf"    },
] as const;

export const LOREM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet metus risus. Praesent bibendum nulla a libero luctus, hendrerit facilisis augue tempor. Proin vehicula sit amet mi non luctus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ac eros orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus nisl dolor, mattis eu quam at, porttitor consectetur libero. Donec sed mattis massa, ac molestie enim. Suspendisse sed luctus luctus.',
  'Nascence sed malesuada turpis. Praesent facilisis quis nisl nec aliquam. Cras hendrerit, justo sit amet molestie tristique, sem justo ultrices urna, sed dignissim nunc eros a augue. Mauris tellus leo, imperdiet a laoreet pretium, placerat sit amet orci. Curabitur id lacus sodales, faucibus elit in, posuere turpis. Integer congue ligula nunc, ut finibus mi consequat ac.',
  'Pellentesque imperdiet porttitor imperdiet. Nullam ex turpis, sollicitudin sodales arcu at, pretium commodo arcu. Praesent vitae suscipit quam, nec ultrices dolor. Nulla dapibus nulla eros, nec fringilla erat cursus vitae. In ornare nisl eu tempus condimentum. Donec nec dolor orci. Sed pharetra ipsum nec turpis suscipit pellentesque.',
]

//export as single strinf
export const LOREM = LOREM_PARAGRAPHS.join('\n\n')

export const DEFAULT_SETTINGS: PrintSettings = {
  margins:        MARGIN_PRESETS.normal,
  duplex:         false,
  flipOnLongEdge: true,
  nup:            1,
  copies:         1,
  pageRange:      '',
  scale:          '100%',
  destination:    'ba2210',
}
export function calcQuota(file: MockFile | null, settings: PrintSettings): number {
  if (!file) return 0
  const total = file.pages
  const printed = settings.pageRange.trim()
    ? settings.pageRange.split(',').reduce((acc, part) => {
        const m = part.trim().match(/^(\d+)-(\d+)$/)
        if (m) return acc + Math.max(0, Math.min(parseInt(m[2]), total) - parseInt(m[1]) + 1)
        if (/^\d+$/.test(part.trim())) return acc + 1
        return acc
      }, 0)
    : total
  const sheets = Math.ceil(Math.max(1, printed) / settings.nup)
  return Math.ceil(sheets / (settings.duplex ? 2 : 1)) * settings.copies
}