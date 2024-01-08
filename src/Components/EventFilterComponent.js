import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Style from "../Styles/UserData.module.css";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import searchIcon from "../images/Search.svg";
import { useNavigate } from "react-router-dom";
function EventFilterComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSearch,
  filter,
  setFilterData,
  filterData,
}) {
  const navigate = useNavigate();

  const getFilterOutPut = (e) => {
    setFilterData(e.target.value);
  };

  const goToHomePage = () => {
    navigate("/");
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
            value={filterData}
          />
        </div>

        <div className={Style.upperHeader}>
          <div
            className={Style.brandText}
            onClick={goToHomePage}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="logo" className={Style.oneLogo} />
            <div className={Style.brand}>NE</div>
          </div>

          <div className={Style.userCover}>
            <img
              src={user}
              alt="user"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
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
            todayButton={"Default"}
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
