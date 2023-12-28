import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Style from "../Styles/UserData.module.css";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import searchIcon from "../images/Search.svg";
function EventFilterComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSearch,
  filter,
  setFilterData,
}) {
  const getFilterOutPut = (e) => {
    setFilterData(e.target.value);
  };
  return (
    <>
      <div className={Style.navHeader}>
        <div className={Style.filterContainer}>
          <img src={searchIcon} alt="search.." />
          <input
            type="text"
            className={Style.filter}
            placeholder="Search"
            onChange={getFilterOutPut}
            disabled={!filter}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
            flexGrow: "1",
          }}
        >
          <img src={logo} alt="logo" className={Style.oneLogo} />
          <h2 className={Style.brand}>NE</h2>
        </div>
        <div className={Style.userCover}>
          <img
            src={user}
            alt="user"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={Style.filterdiv}>
        <div className={Style.datediv}>
          <span>Select Start Date: </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            className={Style.date_picker}
            todayButton={"Today"}
            dateFormat={"dd/MM/yyyy"}
          />
        </div>
        <div className={Style.datediv}>
          <span>Select End Date: </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={new Date()}
            className={Style.date_picker}
            todayButton={"Today"}
            dateFormat={"dd/MM/yyyy"}
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
