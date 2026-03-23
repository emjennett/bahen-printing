import{ useState } from 'react'
import type { View, MockFile, PrintSettings } from './types'
import { DEFAULT_SETTINGS } from './data'
import { Header }       from './components/Header'
import { StatusBar }    from './components/StatusBar'
import { Splash }       from './components/Splash'
import { FileBrowser }  from './components/FileBrowser'
import { DocPreview }   from './components/DocPreview'
import { Sidebar }      from './components/Sidebar'
import { JobsView }     from './components/JobsView'
import { HelpView }     from './components/HelpView'
import { PrintConfirm } from './components/PrintConfirm'
import { usePrintJobs } from './hooks/UsePrintJobs'


export default function App() {
  const [splash, setSplash] = useState(true)
  const [view, setView] = useState<View>('home')
  const [file, setFile] = useState<MockFile | null>(null)
  const [settings, setSettings] = useState<PrintSettings>(DEFAULT_SETTINGS)
  const [showConfirm, setShowConfirm] = useState(false)

  const { jobs, addJob, pendingJobs } = usePrintJobs()

  function handleSelectFile(f: MockFile) {
    setFile(f)
    setView('home')
  }

  // adds job
  function handleConfirm() {
    if (!file) return
    addJob(file, settings)
  }

  const showPreview = view === 'home' || view === 'file'

  return (
    <div style={{ height: '100dvh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header
        file={file}
        view={view}
        setView={setView}
        onPrint={() => setShowConfirm(true)}
        pendingCount={pendingJobs.length}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {showPreview && (
          <>
            <DocPreview
              key={file?.name || 'empty'}
              file={file}
              settings={settings}
              onOpenFile={() => setView('file')}
            />
            {file && <Sidebar file={file} settings={settings} onChange={setSettings} />}
          </>
        )}

        {view === 'file' && (
          <FileBrowser
            current={file}
            onSelect={handleSelectFile}
            onClose={() => setView('home')}
          />
        )}

        {view === 'help' && <HelpView />}
        {view === 'jobs' && <JobsView jobs={jobs} />}
      </div>

      <StatusBar file={file} jobs={jobs} />

      {splash && <Splash onEnter={() => setSplash(false)} />}

      {showConfirm && file && (
      <PrintConfirm
        file={file}
        settings={settings}
        jobs={jobs}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        onViewQueue={() => {
          setShowConfirm(false)
          setView('jobs')
        }}
      />
    )}
    </div>
  )
}