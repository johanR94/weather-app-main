import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconCode,
  unitSystem,
  temperature,
  feels_like,
  humidity,
  time,
}) => {
  let isDay = true;
  if (time) {
    const hour = new Date(time).getHours();
    isDay = hour >= 6 && hour < 20;
  }
  const iconName =
    iconCode !== undefined ? `${iconCode}${isDay ? "d" : "n"}` : "0d";
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <img
        width="300px"
        height="300px"
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {unitSystem === "metric"
          ? Math.round(temperature)
          : Math.round(ctoF(temperature))}
        °{unitSystem === "metric" ? "C" : "F"}
      </h1>
      <p>
        Ressentie{" "}
        {unitSystem === "metric"
          ? Math.round(feels_like)
          : Math.round(ctoF(feels_like))}
        °{unitSystem === "metric" ? "C" : "F"}
      </p>
      <p>{humidity}% Humidité</p>
    </div>
  );
};
export default MainCard;
