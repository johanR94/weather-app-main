import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
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
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={current.relative_humidity_2m}
        unit={"%"}
      />
      <MetricsCard
        title={"Wind Speed"}
        iconSrc={"/icons/wind.png"}
        metric={
          unitSystem === "metric"
            ? mpsToKmh(current.wind_speed_10m)
            : mpsToMph(current.wind_speed_10m)
        }
        unit={unitSystem === "metric" ? "km/h" : "mph"}
      />
    </div>
  );
};
