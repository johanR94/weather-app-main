import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  // Récupération des données de la ville depuis le fichier JSON
  const cityFile = path.join(process.cwd(), "city.json");
  const cityData = JSON.parse(await fs.readFile(cityFile, "utf-8"));
  const cityInput = cityData.city;

  // Géocodage pour obtenir latitude/longitude
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityInput
    )}&count=1`
  );
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    return res.status(404).json({ message: "City not found" });
  }
  const { latitude, longitude, name, country } = geoData.results[0];

  // Appel météo
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_direction_10m,wind_speed_10m,surface_pressure`
  );
  const data = await getWeatherData.json();

  const weatherCodes = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "depositing rime fog",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "dense drizzle",
    56: "freezing light drizzle",
    57: "freezing dense drizzle",
    9: "slight rain",
    9: "moderate rain",
    9: "heavy rain",
    66: "freezing light rain",
    67: "freezing heavy rain",
    71: "slight snow fall",
    73: "moderate snow fall",
    75: "heavy snow fall",
    77: "snow grains",
    80: "slight rain showers",
    81: "moderate rain showers",
    82: "violent rain showers",
    85: "slight snow showers",
    86: "heavy snow showers",
    95: "thunderstorm",
    96: "thunderstorm with slight hail",
    99: "thunderstorm with heavy hail",
  };

  res.status(200).json({
    city: name,
    country,
    iconCode: data.current.weathercode,
    temperature: data.current.temperature_2m,
    feels_like: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    wind: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    cloudCover: data.current.cloud_cover,
    surfacePressure: data.current.surface_pressure,
    pressure: data.current.surface_pressure,
    precipitation: data.current.precipitation,
    rain: data.current.rain,
    snowfall: data.current.snowfall,
    time: data.current.time,
    description: weatherCodes[data.current.weathercode] || "unknown",
    current: data.current,
  });
  console.log(data.current);
}
