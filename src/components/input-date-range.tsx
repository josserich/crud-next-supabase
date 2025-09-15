import React, { useState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDateRange = () => {
  const StartDate = new Date();
  const EndDate = addDays(StartDate, 1);
  const [startDate, setStartDate] = useState<Date>(StartDate);
  const [endDate, setEndDate] = useState<Date>(EndDate);
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? StartDate);
    setEndDate(end ?? EndDate);
  };
  //   const excludeDates = disabledDate.map((item) => {
  //     return {
  //       start: item.startDate,
  //       end: item.endDate,
  //     };
  //   });
  return (
    <div>
      <DatePicker
        onChange={handleDateChange}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        selectsRange={true}
        // excludeDateIntervals={excludeDates}
        dateFormat={"dd-MM-YYYY"}
        wrapperClassName="w-full"
        className="py-2 px-4 rounded-md border border-gray-300 w-full"
      />
    </div>
  );
};

export default InputDateRange;
