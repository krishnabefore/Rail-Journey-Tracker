// src/App.jsx
import { useState } from 'react'
import { PnrInput } from './components/PnrInput'
import { StatusDashboard } from './components/StatusDashboard'
import { PassengerTable } from './components/PassengerTable'
import { RouteTimeline } from './components/RouteTimeline'
import { SamplePnrButtons } from './components/SamplePnrButtons'
import { StationSearchForm } from './components/StationSearchForm'
import { TrainResultsList } from './components/TrainResultsList'
import { usePnrStatus } from './hooks/usePnrStatus'
import { useTrainSearch } from './hooks/useTrainSearch'

function App() {
  const [activeTab, setActiveTab] = useState('pnr') // 'pnr' | 'trains'

  const { data, status, error, fetchPnrStatus, loadMockPnr } = usePnrStatus()
  const [showTimeline, setShowTimeline] = useState(false)

  const { results, status: trainStatus, searchTrains } = useTrainSearch()

  return (
    <div className="min-h-screen rail-bg py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-signal-navy mb-6 text-crisp">
        Rail Journey Tracker
      </h1>

      {/* Tab switcher */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab('pnr')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'pnr'
              ? 'bg-signal-navy text-white'
              : 'bg-white text-signal-navy hover:bg-gray-50'
          }`}
        >
          PNR Status
        </button>
        <button
          onClick={() => setActiveTab('trains')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'trains'
              ? 'bg-signal-navy text-white'
              : 'bg-white text-signal-navy hover:bg-gray-50'
          }`}
        >
          Train Search
        </button>
      </div>

      {activeTab === 'pnr' && (
        <>
          <PnrInput onSearch={fetchPnrStatus} isLoading={status === 'loading'} />
          <SamplePnrButtons onSelect={loadMockPnr} />

          <div className="max-w-md mx-auto mt-8">
            {status === 'loading' && (
              <p className="text-center text-gray-600 text-crisp">Checking PNR status...</p>
            )}

            {status === 'error' && (
              <p className="text-center text-red-600">{error}</p>
            )}

            {status === 'success' && data && (
              <>
                <StatusDashboard data={data} />
                <PassengerTable passengers={data.passengers} />

                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowTimeline((prev) => !prev)}
                    className="px-5 py-2 bg-white text-signal-navy font-medium rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all"
                  >
                    {showTimeline ? 'Hide Timeline' : 'View Timeline'}
                  </button>
                </div>

                {showTimeline && <RouteTimeline route={data.route} />}
              </>
            )}
          </div>
        </>
      )}

      {activeTab === 'trains' && (
        <>
          <StationSearchForm onSearch={searchTrains} isLoading={trainStatus === 'loading'} />

          <div className="max-w-md mx-auto mt-4">
            {trainStatus === 'loading' && (
              <p className="text-center text-gray-600 mt-4 text-crisp">Searching trains...</p>
            )}

            {trainStatus === 'empty' && (
              <p className="text-center text-gray-600 mt-4 text-crisp">
                No trains found for that route. Try NDLS → BCT.
              </p>
            )}
          </div>

          {trainStatus === 'success' && <TrainResultsList trains={results} />}
        </>
      )}
    </div>
  )
}

export default App