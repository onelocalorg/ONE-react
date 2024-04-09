/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import calendarIcon from "../images/calendar-icon.png";
import downArrowIcon from "../images/down-arrow.png";
import calendarStyle from "../Styles/Calendar.module.css";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "../Styles/calendarstyle.css";

function CalendarFilterComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSearch,
}) {
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const formatDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };

  const handleDateChange = (e) => {
    setDateRange(e);
  };

  const handleCalendarClose = (e) => {
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  }, [dateRange]);

  return (
    <div className={calendarStyle.calendarContainer}>
      <div className={calendarStyle.dateContainer} onClick={toggleDatePicker}>
        <span className={calendarStyle.calndarIcon}>
          <img
            src={calendarIcon}
            alt="calendar"
            className={calendarStyle.calndarIconImg}
          />
        </span>
        <span className={calendarStyle.dateText}>
          {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
        </span>
        <span>
          <img src={downArrowIcon} alt="down" />
        </span>
      </div>
      <div className={calendarStyle.hiddenDateSection}>
        <DateRangePicker
          onChange={handleDateChange}
          value={dateRange}
          clearIcon={null}
          isOpen={isDatePickerOpen}
          onCalendarClose={handleCalendarClose}
          minDate={new Date()}
          maxDetail="month"
        />
      </div>
    </div>
  );
}

export default CalendarFilterComponent;
