// src/hooks/usePnrStatus.js
import { useState } from 'react'
import pnrData from '../data/pnrData.json'
import { normalizePnrData } from '../utils/normalizePnrData'

export function usePnrStatus() {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  async function fetchPnrStatus(pnrNumber) {
    setStatus('loading')
    setError(null)
    setData(null)

    // TEMPORARY DEBUG LOG — remove once env variables are confirmed working
    console.log('DEBUG HOST:', import.meta.env.VITE_RAPIDAPI_HOST)
    console.log('DEBUG KEY:', import.meta.env.VITE_RAPIDAPI_KEY)    

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_RAPIDAPI_HOST}/name/${pnrNumber}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`)
      }

      const rawData = await response.json()

      if (rawData.errorMsg) {
        throw new Error(rawData.errorMsg)
      }

      const cleanData = normalizePnrData(rawData)
      setData(cleanData)
      setStatus('success')
    } catch (apiError) {
      console.warn('Live API failed, falling back to mock data:', apiError.message)

      const mockRecord = pnrData[pnrNumber]

      if (mockRecord) {
        const cleanData = normalizePnrData(mockRecord)
        setData(cleanData)
        setStatus('success')
      } else {
        setError('PNR not found. Please check the number and try again.')
        setStatus('error')
      }
    }
  }

    function loadMockPnr(pnrNumber) {
    setStatus('loading')
    setError(null)
    setData(null)

    const mockRecord = pnrData[pnrNumber]

    if (mockRecord) {
      const cleanData = normalizePnrData(mockRecord)
      setData(cleanData)
      setStatus('success')
    } else {
      setError('Sample PNR not found in mock data.')
      setStatus('error')
    }
  }

  return { data, status, error, fetchPnrStatus, loadMockPnr }

}