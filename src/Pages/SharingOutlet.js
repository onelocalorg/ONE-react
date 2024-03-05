import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  listEvents,
  getUserDetails,
  getRecentJoinedUsers,
} from "../api/services";
import Style from "../Styles/UserData.module.css";
import "../Styles/UserDataList.css";
import moment from "moment";
import EventFilterComponent from "../Components/EventFilterComponent";

// tent image
import tent from "../images/Vector.png";

//location mark
import locationPin from "../images/map-pin.svg";
import Card from "../Components/Card";

import Loader from "../Components/Loader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/slices/UserSlice";
import ViewAppModalDialog from "../Components/ViewAppModalDialog";
import { deleteCookie, getCookie, setCookie } from "../utils/CookieManager";
import HeaderFiltersComponent from "../Components/HeaderFiltersComponent";
import headerFilterData from "../utils/ButtonbadgeData";
import ComingsoonPage from "./ComingsoonPage";

function SharingOutLet({ children }) {
  const userInfo = useSelector((state) => state?.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTop = useScrollToTop();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [showAppViewOption, setShowAppViewOption] = useState(true);
  const [pagination, setPagination] = useState({
    totalData: 0,
    page: 1,
    totalPage: 3,
  });
  const { page, totalPage } = pagination;
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    // Show app popup once in a hour
    const appViewflag = getCookie("app_view_option");
    const expirationTime = 120; // hours in minutes

    if (appViewflag) {
      const currentTime = new Date().getTime();
      const cookieExpirationTime =
        parseInt(appViewflag) + expirationTime * 60 * 1000;

      if (currentTime < cookieExpirationTime) {
        setShowAppViewOption(false);
      } else {
        setShowAppViewOption(true);
        deleteCookie("app_view_option");
      }
    } else {
      const currentTime = new Date().getTime();
      setCookie("app_view_option", currentTime, expirationTime); // Set cookie to expire in 1 hour
    }

    //
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 767);
    };

    // Initial check on mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentDate = new Date();
  const oneMonthLater = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1)
  );

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(oneMonthLater);
  const [search, setSearch] = useState(false);
  const [filterData, setFilterData] = useState("");

  const handleCloseAppViewDialog = () => {
    setShowAppViewOption(false);
    localStorage.setItem("app_view_option", false);
  };

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);

      const data = {
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        eventName: filterData,
      };

      const response = await listEvents(pagination.page, data);
      // const eventList = response.data.events;
      const eventList = response?.data?.results;

      if (eventList.length > 0) {
        setPagination((prev) => ({
          ...prev,
          totalData: response.data.totalEvents,
          page: prev.page + 1,
          totalPage: response.data.totalPage,
        }));
      }

      setHasMore(page < totalPage);

      if (!eventList || eventList.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prevItems) => [...prevItems, ...eventList]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFirstData = async () => {
    try {
      setIsLoading(true);
      // setFilterData("");
      setItems([]);
      setSearch(true);
      setPagination({
        totalData: 0,
        page: 1,
        totalPage: 3,
      });

      const data = {
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        eventName: filterData,
      };

      const response = await listEvents(1, data);
      // const eventList = response.data.events;
      const eventList = response?.data?.results;

      if (eventList.length > 0) {
        setPagination((prev) => ({
          ...prev,
          totalData: response.data.totalEvents,
          page: 2,
          totalPage: response.data.totalPage,
        }));

        setHasMore(2 < response?.data?.totalPage + 1);
      }

      if (!eventList || eventList.length === 0) {
        setHasMore(false);
        return;
      }

      setItems(eventList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to top as some time it shows in middle page
    scrollToTop();

    // For get lates profile URL as url expires after some time
    if (userInfo?.userData?.userId) {
      async function getUserData() {
        const userResponseData = await getUserDetails(
          userInfo?.userData?.userId
        );

        // Data set
        if (userResponseData?.data) {
          dispatch(
            setUserData({
              profile_image: userResponseData?.data?.pic,
              userId: userResponseData?.data?.id,
              ...userResponseData?.data,
            })
          );
          localStorage.setItem(
            "user_info",
            JSON.stringify({
              profile_image: userResponseData?.data?.pic || "",
              userId: userResponseData?.data?.id,
            })
          );
        }
      }
      getUserData();
    }
  }, []);

  useEffect(() => {
    // const start_date = moment().format("YYYY-MM-DD");

    // Set end_date to one month from today
    // const end_date = moment().add(1, "months").format("YYYY-MM-DD");

    const initialDate = {
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD"),
      eventName: filterData,
    };
    const fetchDataOfMonth = async () => {
      setItems([]); //Clear all data when new search
      setIsLoading(true);
      const res = await listEvents(1, initialDate);

      // const dataToShow = res?.data?.events;
      const dataToShow = res?.data?.results;

      // On scroll new request was not called so added this lines
      if (dataToShow.length > 0) {
        setPagination((prev) => ({
          ...prev,
          totalData: res?.data?.totalEvents,
          page: 2,
          totalPage: res?.data?.totalPage,
        }));
      }
      setHasMore(page < totalPage + 1);
      ///////
      setIsLoading(false);
      setItems(dataToShow);
    };
    // fetchDataOfMonth();

    const timeoutId = setTimeout(fetchDataOfMonth, 500); // Adjust the delay as needed (e.g., 500 milliseconds)
    return () => clearTimeout(timeoutId);
  }, [filterData, startDate, endDate]);
  // comment
  // const filteredEvents =
  //   items &&
  //   items.filter((user) => {
  //     return (
  //       user.name && user.name.toLowerCase().includes(filterData.toLowerCase())
  //     );
  //   });

  const filteredEvents = items;

  // const appEventData = filteredEvents.map((event, index) => (
  //   <Card
  //     eventId={event?.id}
  //     key={index}
  //     index={index}
  //     tent={tent}
  //     img={event?.event_image}
  //     start_date={event?.start_date}
  //     name={event?.name}
  //     full_address={event?.full_address}
  //     locationPin={locationPin}
  //     ticket={event?.tickets}
  //     address={event?.address}
  //     eventProducer={event?.eventProducer}
  //   />
  // ));
  const itemUniqueArray = [];
  const appEventData = filteredEvents.map((eventItem, index) => {
    // Create Unique Key for separation
    const dateTimeKey = `${eventItem?.date_title} ${eventItem?.day_title}`;
    let stringWithoutSpacesAndCommas = dateTimeKey.replace(/[\s,]/g, " ");
    let resultString = stringWithoutSpacesAndCommas
      .split(" ")
      .join("")
      .toLowerCase();
    itemUniqueArray.push(resultString);
    let occurrences = itemUniqueArray.filter(
      (item) => item === resultString
    ).length;

    return (
      <React.Fragment key={index}>
        {occurrences == 1 && (
          <div>
            <div className={`${Style.eventSticky} followMeBar`}>
              <span className={Style.mainLabel}>{eventItem?.date_title}</span>
              <span className={Style.subLabel}>({eventItem?.day_title})</span>
            </div>
          </div>
        )}
        {eventItem?.events.map((event, indexinner) => (
          <Card
            eventId={event?.id}
            key={indexinner}
            indexinner={index}
            tent={tent}
            img={event?.event_image}
            start_date={event?.start_date}
            name={event?.name}
            full_address={event?.full_address}
            locationPin={locationPin}
            ticket={event?.tickets}
            address={event?.address}
            start_date_label={event?.start_date_label}
            start_time_label={event?.start_time_label}
            eventProducer={event?.eventProducer}
          />
        ))}
      </React.Fragment>
    );
  });

  return (
    <div className={Style.maindiv}>
      <EventFilterComponent
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleSearch={fetchFirstData}
        filter={items.length > 0 ? true : false}
        // filter={items ? true : false}
        setFilterData={setFilterData}
        filterData={filterData}
        child={<HeaderFiltersComponent data={headerFilterData} />}
      />

      {isLoading && <Loader />}
      {!items.length && !isLoading ? (
        <p
          style={{ textAlign: "center", fontWeight: "600", marginTop: "20px" }}
        >
          No Events Found
        </p>
      ) : null}
      {children}

      {/* {items.length ? (
        <InfiniteScroll
          className={Style.infinitescroll}
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            filterData === "" ? (
              <h5 style={{ textAlign: "center" }}>Loading...</h5>
            ) : null
          }
          minHeight={"inherit"}
          style={{ padding: "20px 0" }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {(items.length === 0 && search) ||
            (filterData !== "" && filteredEvents.length === 0) ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                No Events Found
              </p>
            ) : items.length === 0 && !search ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Please select a date interval to fetch data
              </p>
            ) : (
              appEventData
            )}
          </div>
        </InfiniteScroll>
      ) : null} */}
      <div>
        {isMobileOrTablet && showAppViewOption && (
          <ViewAppModalDialog hideFunc={handleCloseAppViewDialog} />
        )}
      </div>
    </div>
  );
}

export default SharingOutLet;
