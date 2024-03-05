import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Style from "../Styles/UserData.module.css";
import logo from "../images/logo.svg";
import searchIcon from "../images/Search.svg";
import { useNavigate } from "react-router-dom";
import HeaderUserComponent from "./HeaderUserComponent";
import { IoMdClose } from "react-icons/io";
import CalendarFilterComponent from "./CalendarFilterComponent";
import NavHeaderComponent from "./NavHeaderComponent";
import UserBadgeComponent from "./UserBadgeComponent";
import { useSelector } from "react-redux";
import { getRecentJoinedUsers } from "../api/services";

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
  const [recentJoinedusers, setrecentJoinedusers] = useState([
    { status: "pending", data: [] },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          localStorage.getItem("loggedIn") === "true" ||
          localStorage.getItem("loggedIn") === true
        ) {
          const data1 = {
            user_lat: Number(localStorage.getItem("lat")),
            user_long: Number(localStorage.getItem("lang")),
            radius: 25,
          };
          const data = await getRecentJoinedUsers(data1);
          setrecentJoinedusers({
            status: data?.success ? "fullfilled" : "pending",
            data: data?.data,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const userInfo = useSelector((state) => state?.userInfo);
  // console.log(recentJoinedusers);

  return (
    <>
      <NavHeaderComponent
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <div className={Style.filterdiv}>
        <>{child}</>
        <div className={Style.userJoined}>
          {userInfo?.userData !== null &&
            recentJoinedusers?.status === "fullfilled" &&
            recentJoinedusers?.data?.map((user) => (
              <UserBadgeComponent
                src={user?.pic}
                key={user?.user_unique_id}
                recentUserId={user?.id}
              />
            ))}
        </div>
        <CalendarFilterComponent
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleSearch={handleSearch}
        />
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
