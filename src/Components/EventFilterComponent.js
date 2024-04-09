import React from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Style from "../Styles/UserData.module.css";
// import logo from "../images/logo.svg";
// import searchIcon from "../images/Search.svg";
// import { useNavigate } from "react-router-dom";
// import HeaderUserComponent from "./HeaderUserComponent";
// import { IoMdClose } from "react-icons/io";
import CalendarFilterComponent from "./CalendarFilterComponent";
import NavHeaderComponent from "./NavHeaderComponent";
// import UserBadgeComponent from "./UserBadgeComponent";
// import { useSelector } from "react-redux";
// import { getRecentJoinedUsers } from "../api/services";
import RecentUserList from "../Pages/RecentUsersList";

function EventFilterComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSearch,
  filter,
  setFilterData,
  filterData,
  child,
  isCalenderVisible = false,
  isCreateEventEnabled,
  RecentUserListVisible = false,
}) {
  return (
    <>
      <NavHeaderComponent
        setFilterData={setFilterData}
        filterData={filterData}
        isCreateEventEnabled={isCreateEventEnabled}
      />
      <div className={Style.filterdiv}>
        {child}
        {RecentUserListVisible && <RecentUserList />}
        {isCalenderVisible && (
          <CalendarFilterComponent
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleSearch={handleSearch}
          />
        )}

        {/* <div className={Style.datediv}>
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
        </div> */}
      </div>
    </>
  );
}

export default EventFilterComponent;
