import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { CgEventbrite } from "react-icons/cg";
import Style from "../Styles/UserData.module.css";
import banner from "../images/Rectangle 5918.svg";
function EventFilterComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSearch,
}) {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100px",
          borderRadius: "0 0 10px 10px",
          overflow: "hidden",
          position: "fixed",
          zIndex: "5",
        }}
      >
        <h2 className={Style.brand}>ONE|BOULDER</h2>
        <img
          src={banner}
          alt="banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className={Style.filterdiv}>
        <div className={Style.datediv}>
          <span>Select Start Date: </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            className={Style.date_picker}
          />
        </div>
        <div className={Style.datediv}>
          <span>Select End Date: </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date()}
            className={Style.date_picker} 
          />
        </div>
        <div className={Style.searchdiv}>
          <button onClick={handleSearch} className={Style.searchbtn}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default EventFilterComponent;
