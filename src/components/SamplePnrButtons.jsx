// src/components/SamplePnrButtons.jsx

const SAMPLE_PNRS = [
  { pnr: '1234567890', label: 'Rajdhani Express (WL→RAC)' },
  { pnr: '9876543210', label: 'Shatabdi Express (Confirmed)' },
  { pnr: '1122334455', label: 'Duronto Express (Waitlist)' },
  { pnr: '5566778899', label: 'Vande Bharat (RAC→CNF)' },
]

/**
 * A row of quick-access buttons for trying out the app's mock data.
 * Calls onSelect(pnr) when clicked — the parent decides how to load it.
 */
export function SamplePnrButtons({ onSelect }) {
  return (
    <div className="max-w-md mx-auto mt-4 text-center">
      <p className="text-xs text-black mb-2 text-crisp">Try a sample PNR:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {SAMPLE_PNRS.map(({ pnr, label }) => (
          <button
            key={pnr}
            onClick={() => onSelect(pnr)}
            className="text-xs px-3 py-1.5 bg-white text-signal-navy shadow-sm rounded-full hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}