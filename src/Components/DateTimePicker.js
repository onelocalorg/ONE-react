import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

function DateTimePicker({ date, setDate }) {
  // Convert the ISO string to a Date object
  const dateObject = moment(date).toDate();

  const handleChange = (newDate) => {
    // Format the new date to ISO 8601 string in UTC
    const formattedDate = moment(newDate).toISOString();
    setDate(formattedDate);
  };

  return (
    <DatePicker
      selected={dateObject} // Use the converted Date object here
      onChange={handleChange}
      showTimeSelect
      dateFormat="MMM d, yyyy h:mm aa" // This format is for display purposes
      // timeIntervals={1} // Uncomment if you want to select every minute
    />
  );
}

export default DateTimePicker;
