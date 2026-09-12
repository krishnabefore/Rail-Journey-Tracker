// src/components/StationSearchForm.jsx
import { useState } from 'react'

const EXAMPLE_CODES = [
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'BCT', name: 'Mumbai Central' },
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'SBC', name: 'Bangalore City' },
]

/**
 * Two inputs for station codes (From / To) plus a search button.
 * Calls onSearch(fromCode, toCode) once both fields are filled.
 */
export function StationSearchForm({ onSearch, isLoading }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [validationError, setValidationError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!from.trim() || !to.trim()) {
      setValidationError('Please enter both a From and To station code.')
      return
    }

    setValidationError('')
    onSearch(from, to)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="from-code" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            id="from-code"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            placeholder="e.g. NDLS"
            maxLength={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-signal-navy/30"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="to-code" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            id="to-code"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            placeholder="e.g. BCT"
            maxLength={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-signal-navy/30"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-3 px-5 py-2 bg-signal-navy text-white font-medium rounded-lg hover:bg-signal-navy/90 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? 'Searching...' : 'Search Trains'}
      </button>

      {validationError && (
        <p className="mt-2 text-sm text-red-600 text-center">{validationError}</p>
      )}

      <p className="mt-3 text-xs text-gray-400 text-center">
        Try: {EXAMPLE_CODES.map((s) => `${s.code} (${s.name})`).join(' · ')}
      </p>
    </form>
  )
}