// src/components/RouteTimeline.jsx

/**
 * A vertical timeline showing the journey's stations in order,
 * visually distinguishing the origin, intermediate stops, and destination.
 *
 * Receives the normalized `route` array as a prop.
 */
export function RouteTimeline({ route }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6 animate-ticket-issue">
      <h3 className="text-lg font-semibold text-signal-navy mb-4">Route Timeline</h3>

      <ol className="relative border-l-2 border-gray-200 ml-3">
        {route.map((stop) => {
          const isOrigin = stop.type === 'origin'
          const isDestination = stop.type === 'destination'
          const isEndpoint = isOrigin || isDestination

          return (
            <li key={stop.id} className="mb-6 ml-4 last:mb-0">
              <span
                className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white ${
                  isEndpoint ? 'bg-signal-navy' : 'bg-gray-300'
                }`}
              />
              <p className={`text-sm font-mono ${isEndpoint ? 'font-semibold text-signal-navy' : 'text-gray-500'}`}>
                {stop.station}
              </p>
              {isOrigin && <p className="text-xs text-signal-green">Origin</p>}
              {isDestination && <p className="text-xs text-signal-rust">Destination</p>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}