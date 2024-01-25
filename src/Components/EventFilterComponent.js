import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Style from "../Styles/UserData.module.css";
import logo from "../images/logo.svg";
import searchIcon from "../images/Search.svg";
import { useNavigate } from "react-router-dom";
import HeaderUserComponent from "./HeaderUserComponent";
import { IoMdClose } from "react-icons/io";

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

  const handleClearSearch = () => {
    setFilterData("");
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
            // disabled={!filter}
            value={filterData}
          />
          {filterData ? (
            <span onClick={handleClearSearch} className={Style.clearIcon}>
              <IoMdClose />
            </span>
          ) : (
            <span className={Style.clearIcon}></span>
          )}
        </div>

        <div className={Style.upperHeader}>
          <div className={Style.brandText} onClick={goToHomePage}>
            <img src={logo} alt="logo" className={Style.oneLogo} />
            <div className={Style.brand}>NE</div>
          </div>

          <HeaderUserComponent headerClass={Style} />
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
