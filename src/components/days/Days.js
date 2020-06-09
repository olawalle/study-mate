import React, { useState } from "react";
import "./Days.scss";
export default function Days() {
  const [days, setdays] = useState([
    { day: "Mon", came: true },
    { day: "Tue", came: true },
    { day: "Wed", came: false },
    { day: "Thu", came: false },
    { day: "Fri", came: false },
    { day: "Sat", came: false },
    { day: "Sun", came: false },
  ]);
  return (
    <div className="days">
      {days.map((day) => (
        <div className="day" key={day.day}>
          <div className={`ball ${day.came ? "present" : ""}`}></div>
          <span className={day.came ? "came" : ""}>{day.day}</span>
        </div>
      ))}
    </div>
  );
}
