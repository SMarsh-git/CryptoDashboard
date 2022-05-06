import React, { useState } from "react";
import { chartDays } from "../utils/data";
import SelectButton from "../selectButton";
import "./dashChart.css";
import ChartWMenu from "./chartOne";
import ChartTwo from "./chartTwo";

export const Ethbtcchart = () => {
  const [days, setDays] = useState(1);


  let day = days < 1 ? "1 hour" : days + " Days";
  if (days < 1) {
    day = "1 Hour";
  } else if (days === 365) {
    day = "1 Year";
  } else if (days > 1000) {
    day = "3 Years";
  } else if (days === 1) {
    day = "1 Day";
  }
  let tension = days >= 1 ? 0.4 : 0.01;

  return (
    <div className="main-div">
      <div className="charts">

        <div className="chart-1">
        <ChartWMenu days={days} day={day} tension={tension} />
        </div>
        <div className="chart-2">
         <ChartTwo days={days} day={day} tension={tension} />

        </div>
        <div className="day-buttons">
        {chartDays.map((day) => (
          <SelectButton 
            key={day.value}
            onClick={() => {
              setDays(day.value);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
      </div>

    </div>
  );
};

export default Ethbtcchart;