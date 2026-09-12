// src/components/StatusDashboard.jsx

/**
 * A trip summary styled as a physical ticket stub: a main info panel
 * on the left, and a torn-edge "stub" strip on the right showing the
 * class and chart status — like the perforated section of a real
 * railway ticket.
 */
export function StatusDashboard({ data }) {
  const isChartPrepared = data.chartStatus?.toLowerCase().includes('prepared') &&
    !data.chartStatus?.toLowerCase().includes('not')

  return (
    <div className="max-w-md mx-auto animate-ticket-issue">
      <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
        {/* Main ticket body */}
        <div className="flex-1 p-6 ticket-notch">
          <p className="font-mono text-xs text-signal-navy/60 tracking-wide mb-1">
            PNR CONFIRMED
          </p>
          <h2 className="text-xl font-bold text-signal-navy leading-snug">
            {data.trainName}
          </h2>
          <p className="font-mono text-sm text-signal-navy/70 mb-4">
            #{data.trainNumber}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-400 text-xs">From</p>
              <p className="font-semibold text-signal-navy">{data.boardingStation}</p>
            </div>
            <div className="font-mono text-gray-300">&rarr;</div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">To</p>
              <p className="font-semibold text-signal-navy">{data.destinationStation}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">{data.dateOfJourney}</p>
        </div>

        {/* Torn-edge stub strip */}
        <div className="w-24 flex flex-col items-center justify-center gap-3 p-3 bg-ticket-cream">
          <div className="text-center">
            <p className="text-[10px] text-gray-400">Class</p>
            <p className="font-mono font-bold text-signal-navy">{data.travelClass}</p>
          </div>

          <span
            className={`text-[10px] font-semibold text-center leading-tight px-2 py-1 rounded-full ${
              isChartPrepared
                ? 'bg-signal-green/10 text-signal-green'
                : 'bg-signal-amber/10 text-signal-amber'
            }`}
          >
            {data.chartStatus}
          </span>
        </div>
      </div>
    </div>
  )
}
