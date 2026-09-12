// src/components/TrainResultsList.jsx

/**
 * Displays a list of matching trains as compact ticket-style cards,
 * matching the same visual language as the PNR status dashboard.
 */
export function TrainResultsList({ trains }) {
  return (
    <div className="max-w-md mx-auto mt-6 space-y-3">
      {trains.map((train) => (
        <div
          key={train.trainNumber}
          className="bg-white rounded-lg shadow-md p-5 animate-ticket-issue"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-signal-navy">{train.trainName}</h3>
              <p className="font-mono text-xs text-gray-400">#{train.trainNumber}</p>
            </div>
            {train.classes.length > 0 && (
              <div className="flex gap-1">
                {train.classes.map((cls) => (
                  <span
                    key={cls}
                    className="font-mono text-[10px] font-semibold px-2 py-1 rounded-full bg-signal-navy/5 text-signal-navy"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-mono font-semibold text-signal-navy">{train.departureTime}</p>
              <p className="text-xs text-gray-400">{train.fromCode}</p>
            </div>

            <div className="flex-1 flex flex-col items-center px-3">
              <p className="text-xs text-gray-400">{train.duration}</p>
              <div className="w-full h-px bg-gray-200 relative my-1">
                <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-signal-navy" />
              </div>
            </div>

            <div className="text-right">
              <p className="font-mono font-semibold text-signal-navy">{train.arrivalTime}</p>
              <p className="text-xs text-gray-400">{train.toCode}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Runs: {train.runsOn.join(', ')}
          </p>
        </div>
      ))}
    </div>
  )
}