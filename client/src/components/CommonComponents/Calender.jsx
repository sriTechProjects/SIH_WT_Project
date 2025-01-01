import React from "react";
import { CCalendar } from "@coreui/react-pro    "; // Correct import path for CoreUI Pro components

const disableWeekends = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Disable Sundays (0) and Saturdays (6)
};

const Calendar = () => {
  return (
    <div className="d-flex justify-content-center">
      <CCalendar
        calendars={2}
        className="border rounded"
        locale="en-US"
        range
        startDate="2022/08/23"
        endDate="2022/09/08"
      />
    </div>
  );
};

export default Calendar;
