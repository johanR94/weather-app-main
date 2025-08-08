import { degToCompass, degToCompassMetric } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
  getPressure,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

// Conversion m/s → km/h
const mpsToKmh = (mps) => Math.round(mps * 3.6);
// Conversion m/s → mph
const mpsToMph = (mps) => Math.round(mps * 2.23694);
export const MetricsBox = ({ weatherData, unitSystem }) => {
  if (!weatherData || !weatherData.current) return null;
  const current = weatherData.current;
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={unitSystem === "metric" ? "Humidité" : "Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={current.relative_humidity_2m}
        unit={"%"}
      />
      <MetricsCard
        title={unitSystem === "metric" ? "Vitésse du vent" : "Wind Speed"}
        iconSrc={"/icons/wind.png"}
        metric={
          unitSystem === "metric"
            ? mpsToKmh(current.wind_speed_10m)
            : mpsToMph(current.wind_speed_10m)
        }
        unit={unitSystem === "metric" ? "km/h" : "mph"}
      />
      <MetricsCard
        title={
          unitSystem === "metric" ? "Direction du vent " : "Wind Direction"
        }
        iconSrc={"/icons/windsock.png"}
        metric={
          unitSystem === "metric"
            ? degToCompassMetric(current.wind_direction_10m)
            : degToCompass(current.wind_direction_10m)
        }
        unit={""}
      />
      <MetricsCard
        title={unitSystem === "metric" ? "Préssion" : "Pressure"}
        iconSrc={"/icons/pressure.png"}
        metric={getPressure(unitSystem, current.surface_pressure)}
        unit={unitSystem === "metric" ? "hPa" : "inHg"}
      />
    </div>
  );
};
