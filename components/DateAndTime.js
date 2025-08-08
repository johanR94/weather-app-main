import styles from "./DateAndTime.module.css";
import { useState, useEffect } from "react";
import { weekday, weekdayImperial } from "../services/helpers";

export const DateAndTime = ({ unitSystem }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>
        {unitSystem === "metric"
          ? `${weekday[now.getDay()]}, ${now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}`
          : `${weekdayImperial[now.getDay()]}, ${now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`}
      </h2>
    </div>
  );
};
