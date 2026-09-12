// src/utils/normalizePnrData.js

export function normalizePnrData(raw) {
  if (!raw) return null

  return {
    trainName: raw.train_name || raw.trainName || raw.TrainName || "Unknown Train",
    trainNumber: raw.TrainNo || raw.trainNum || raw.train_number || raw.trainNumber || "N/A",
    dateOfJourney: raw.Doj || raw.departureDate || raw.date_of_journey || raw.dateOfJourney || null,
    travelClass: raw.class || raw.journeyClass || raw.travelClass || raw.Class || "N/A",
    chartStatus: raw.chartStatus || raw.chartStts || raw.chart_status || "Unknown",
    boardingStation: raw.boardingStation || raw.stationFrom || raw.from_station || raw.source || "N/A",
    destinationStation: raw.destinationStation || raw.stationTo || raw.to_station || raw.destination || "N/A",

    passengers: (raw.passengers || raw.passengerDetailsDTO || []).map((p, index) => ({
      id: index,
      name: p.displayName || p.name || `Passenger ${index + 1}`,
      bookingStatus: p.bookingStatus || p.booking_status || p.seatStts || p.currentStatus || "N/A",
      currentStatus: p.currentStatus || p.current_status || p.seatStts || p.bookingStatus || "N/A",
    })),

    route: raw.route
      ? raw.route.map((stop, index) => ({
          id: index,
          station: stop.station || stop.stationName || "Unknown Stop",
          type: stop.type || "stop",
        }))
      : [
          { id: 0, station: raw.stationFrom || raw.boardingStation || "Origin", type: "origin" },
          { id: 1, station: raw.stationTo || raw.destinationStation || "Destination", type: "destination" },
        ],
  }
}