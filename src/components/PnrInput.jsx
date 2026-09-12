// src/components/PnrInput.jsx
import { useState } from 'react'

/**
 * Controlled input for entering a 10-digit PNR number.
 * - Strips out any non-digit characters as the user types
 * - Caps the length at 10
 * - Shows an inline error if the user submits fewer than 10 digits
 * - Only calls onSearch(pnr) once validation passes
 */
export function PnrInput({ onSearch, isLoading }) {
  const [pnr, setPnr] = useState('')
  const [validationError, setValidationError] = useState('')

  function handleChange(e) {
    // Remove anything that isn't a digit, then cap at 10 characters
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPnr(digitsOnly)

    // Clear the error as soon as the user starts fixing it
    if (validationError) setValidationError('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (pnr.length !== 10) {
      setValidationError('PNR must be exactly 10 digits.')
      return
    }

    onSearch(pnr)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <label htmlFor="pnr-input" className="block text-sm font-medium text-gray-700 mb-1">
        Enter PNR Number
      </label>

      <div className="flex gap-2">
        <input
          id="pnr-input"
          type="text"
          inputMode="numeric"
          value={pnr}
          onChange={handleChange}
          placeholder="e.g. 1234567890"
          className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
            validationError
              ? 'border-red-400 focus:ring-red-300'
              : 'border-gray-300 focus:ring-signal-navy/30'
          }`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 bg-signal-navy text-white font-medium rounded-lg hover:bg-signal-navy/90 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Checking...' : 'Check Status'}
        </button>
      </div>

      {validationError && (
        <p className="mt-2 text-sm text-red-600">{validationError}</p>
      )}

      <p className="mt-1 text-xs text-gray-400">{pnr.length}/10 digits</p>
    </form>
  )
}