import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS

const DatePickerHookForm = ({
  // start_date,
  // setStartDate,
  control,
  name = "datepicker", // Default name if not provided
  className,
  dateFormat = "MMM d, yyyy h:mm aa", // Default date format
  showTimeSelect = true,
  timeIntervals = 1, // Default to 15 minutes for time selection intervals
  placeholder = "Select date", // Default placeholder text
  maxDate,
  minDate,
  ...rest // Rest of the props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      // defaultValue={start_date}
      render={({ field }) => (
        <DatePicker
          {...field}
          selected={field.value}
          // onChange={(date) => {
          //   field.onChange(date);
          //   // setStartDate(date);
          // }}
          className={className}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          timeIntervals={timeIntervals}
          placeholderText={placeholder}
          //   startDate={start_date}
          minDate={minDate}
          maxDate={maxDate}
          {...rest}
        />
      )}
    />
  );
};

export default DatePickerHookForm;
