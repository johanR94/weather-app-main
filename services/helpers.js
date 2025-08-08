import { kmToMiles, mpsToMph } from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getPressure = (unitSystem, pressureInHpa) =>
  unitSystem == "metric" ? pressureInHpa : (pressureInHpa * 0.02953).toFixed(2); // Convert hPa to inHg

export const getTimeFromISO = (isoString, unitSystem = "metric") => {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date)) return "";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: unitSystem === "imperial", // true for 12-hour, false for 24-hour
  });
};

export const weekday = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
export const weekdayImperial = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
