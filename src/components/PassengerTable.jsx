
// src/components/PassengerTable.jsx

/**
 * Shows each passenger's original booking status next to their
 * live current status, with color-coded badges matching railway
 * signal colors: green = Confirmed, amber = Waitlist/RAC.
 */
export function PassengerTable({ passengers }) {
  function getBadgeStyle(statusText) {
    const text = statusText.toUpperCase()

    if (text.includes('CNF')) {
      return 'bg-signal-green/10 text-signal-green'
    }
    if (text.includes('RAC') || text.includes('WL')) {
      return 'bg-signal-amber/10 text-signal-amber'
    }
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6 animate-ticket-issue">
      <h3 className="text-lg font-semibold text-signal-navy mb-4">Passenger Status</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b">
            <th className="pb-2 font-medium">Passenger</th>
            <th className="pb-2 font-medium">Booked</th>
            <th className="pb-2 font-medium">Current</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((p) => (
            <tr key={p.id} className="border-b last:border-0">
              <td className="py-3 text-gray-700">{p.name}</td>
              <td className="py-3">
                <span className={`font-mono text-xs font-semibold px-2 py-1 rounded-full ${getBadgeStyle(p.bookingStatus)}`}>
                  {p.bookingStatus}
                </span>
              </td>
              <td className="py-3">
                <span className={`font-mono text-xs font-semibold px-2 py-1 rounded-full ${getBadgeStyle(p.currentStatus)}`}>
                  {p.currentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}