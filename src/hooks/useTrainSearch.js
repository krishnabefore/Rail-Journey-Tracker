// src/hooks/useTrainSearch.js
import { useState } from 'react'
import trainsData from '../data/trainsData.json'

/**
 * Custom hook that searches for trains running between two stations.
 * Tries the real RailRadar API first (expects station CODES like
 * "NDLS", "BCT" — not free-text city names), and falls back to the
 * local mock data if the live call fails.
 *
 * Usage:
 *   const { results, status, searchTrains } = useTrainSearch()
 *   searchTrains("NDLS", "BCT")
 */
export function useTrainSearch() {
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | empty | error

  async function searchTrains(fromCode, toCode) {
    setStatus('loading')

    const from = fromCode.trim().toUpperCase()
    const to = toCode.trim().toUpperCase()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_RAILRADAR_HOST}/trains/between/${from}/${to}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_RAILRADAR_API_KEY}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`)
      }

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error?.message || 'API returned an error')
      }

      // Normalize RailRadar's response shape into the same shape our
      // UI already expects (matching the mock data's field names)
      const cleanResults = json.data.trains.map((entry) => ({
        trainNumber: entry.train.number,
        trainName: entry.train.name,
        fromStation: json.data.from.name,
        fromCode: json.data.from.code,
        toStation: json.data.to.name,
        toCode: json.data.to.code,
        departureTime: entry.from.departure,
        arrivalTime: entry.to.arrival,
        duration: formatDuration(entry.duration),
        classes: [], // RailRadar's base response doesn't include class availability
        runsOn: entry.train.runDays,
      }))

      setResults(cleanResults)
      setStatus(cleanResults.length > 0 ? 'success' : 'empty')
    } catch (apiError) {
      console.warn('Live train search failed, falling back to mock data:', apiError.message)

      // Fallback: mock data uses station names/codes loosely matched
      const matches = trainsData.filter((train) => {
        const matchesFrom = train.fromCode.toUpperCase() === from
        const matchesTo = train.toCode.toUpperCase() === to
        return matchesFrom && matchesTo
      })

      setResults(matches)
      setStatus(matches.length > 0 ? 'success' : 'empty')
    }
  }

  return { results, status, searchTrains }
}

// RailRadar returns duration in minutes — convert to "Xh Ym" for display
function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}