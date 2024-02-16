import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { myEventsList, getUserDetails } from "../api/services";
import Style from "../Styles/MyTicketsData.module.css";
import moment from "moment";
import MyEventFilterComponent from "../Components/MyEventFilterComponent";

// tent image
import tent from "../images/Vector.png";

//location mark
import locationPin from "../images/map-pin.svg";
import Card from "../Components/Card";

import Loader from "../Components/Loader";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/slices/UserSlice";
import { PrivateComponent } from "../Components/PrivateComponent";

function MyEvents() {
  const userInfo = useSelector((state) => state?.userInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTop = useScrollToTop();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pagination, setPagination] = useState({
    totalData: 0,
    page: 1,
    totalPage: 3,
  });
  const { page, totalPage } = pagination;

  const currentDate = new Date();
  const oneMonthLater = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1)
  );

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(oneMonthLater);
  const [search, setSearch] = useState(false);
  const [filterData, setFilterData] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    // For make sticky date bar when scroll functionality
    const $stickies = document.querySelectorAll(".followMeBar");

    const load = function (stickies) {
      if (stickies.length > 0) {
        stickies.forEach(function (sticky) {
          const $thisSticky = sticky;
          const $parent = document.createElement("div");
          $parent.classList.add("followWrap");
          $thisSticky.parentNode.insertBefore($parent, $thisSticky);
          $parent.appendChild($thisSticky);
          $thisSticky.dataset.originalPosition = $thisSticky.offsetTop;
          $thisSticky.dataset.originalHeight = $thisSticky.offsetHeight;
          $parent.style.height = $thisSticky.offsetHeight + "px";
        });

        window.removeEventListener("scroll", _whenScrolling);
        window.addEventListener("scroll", _whenScrolling);
      }
    };

    const _whenScrolling = function () {
      $stickies.forEach(function (sticky, i) {
        const $thisSticky = sticky;
        const $stickyPosition =
          parseInt($thisSticky.dataset.originalPosition, 10) - 100;

        if ($stickyPosition <= window.scrollY) {
          const $nextSticky = $stickies[i + 1];

          const $nextStickyPosition = $nextSticky
            ? $nextSticky.dataset.originalPosition -
              (parseInt($thisSticky.dataset.originalHeight, 10) + 500)
            : 0;

          $thisSticky.classList.add("fixed");
          if ($nextSticky && $thisSticky.offsetTop >= $nextStickyPosition) {
            $thisSticky.classList.add("absolute");
            $thisSticky.style.top = $nextStickyPosition + "px";
          }
        } else {
          const $prevSticky = $stickies[i - 1];

          $thisSticky.classList.remove("fixed");

          if (
            $prevSticky &&
            window.scrollY <=
              $stickyPosition - parseInt($thisSticky.dataset.originalHeight, 10)
          ) {
            $prevSticky.classList.remove("absolute");
            $prevSticky.removeAttribute("style");
          }
        }
      });
    };

    load($stickies);

    return () => {
      window.removeEventListener("scroll", _whenScrolling);
    };
  }, [items]); //Update on every new data set

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);

      const data = {
        // start_date: moment(startDate).format("YYYY-MM-DD"),
        // end_date: moment(endDate).format("YYYY-MM-DD"),
        eventName: filterData,
      };

      const response = await myEventsList(
        pagination.page,
        data,
        userInfo?.userData?.userId
      );
      const eventList = response.data.results;

      if (eventList?.length > 0) {
        setPagination((prev) => ({
          ...prev,
          totalData: response.data.totalEvents,
          page: prev.page + 1,
          totalPage: response.data.totalPage,
        }));
      }

      setHasMore(page < totalPage);

      if (!eventList || eventList?.length === 0) {
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
        // start_date: moment(startDate).format("YYYY-MM-DD"),
        // end_date: moment(endDate).format("YYYY-MM-DD"),
        eventName: filterData,
      };

      const response = await myEventsList(1, data, userInfo?.userData?.userId);
      const eventList = response.data.results || [];

      if (eventList?.length > 0) {
        setPagination((prev) => ({
          ...prev,
          totalData: response.data.totalEvents,
          page: 2,
          totalPage: response.data.totalPage,
        }));

        setHasMore(2 < response?.data?.totalPage + 1);
      }

      if (!eventList || eventList?.length === 0) {
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
      //   start_date: moment(startDate).format("YYYY-MM-DD"),
      //   end_date: moment(endDate).format("YYYY-MM-DD"),
      eventName: filterData,
    };
    const fetchDataOfMonth = async () => {
      setItems([]); //Clear all data when new search
      setIsLoading(true);
      const res = await myEventsList(
        1,
        initialDate,
        userInfo?.userData?.userId
      );

      const dataToShow = res?.data?.results || [];

      // On scroll new request was not called so added this lines
      if (dataToShow?.length > 0) {
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

    const timeoutId = setTimeout(fetchDataOfMonth, 500); // Adjust the delay as needed (e.g., 500 milliseconds)
    return () => clearTimeout(timeoutId);
  }, [filterData]);

  const filteredEvents = items;

  const dateFilterMessage = (
    <p style={{ textAlign: "center", fontWeight: "600" }}>
      Please select a date interval to fetch data
    </p>
  );

  const myEventData = filteredEvents.map((eventItem, index) => (
    <React.Fragment key={index}>
      <div>
        <div className={`${Style.eventSticky} followMeBar`}>
          <span className={Style.mainLabel}>{eventItem?.date_title}</span>
          <span className={Style.subLabel}>({eventItem?.day_title})</span>
        </div>
      </div>
      {eventItem?.events.map((event, indexinner) => (
        <Card
          eventId={event?.id}
          key={indexinner}
          index={index}
          tent={tent}
          img={event?.event_image}
          start_date={event?.start_date}
          name={event?.name}
          full_address={event?.full_address}
          locationPin={locationPin}
          ticket={event?.tickets}
          address={event?.address}
          eventProducer={event?.eventProducer}
          detailType="my-event"
        />
      ))}
    </React.Fragment>
  ));

  return (
    <div className={Style.maindiv} ref={containerRef}>
      <PrivateComponent />
      <MyEventFilterComponent
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleSearch={fetchFirstData}
        filter={items?.length > 0}
        // filter={items ? true : false}
        setFilterData={setFilterData}
        filterData={filterData}
      />
      {isLoading && <Loader />}
      {!items?.length && !isLoading ? (
        <p
          style={{ textAlign: "center", fontWeight: "600", marginTop: "150px" }}
        >
          No Events Found
        </p>
      ) : null}

      {items?.length ? (
        <InfiniteScroll
          className={Style.infinitescroll}
          dataLength={items?.length}
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
            {(items?.length === 0 && search) ||
            (filterData !== "" && filteredEvents?.length === 0) ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                No Events Found
              </p>
            ) : items?.length === 0 && !search ? (
              dateFilterMessage
            ) : (
              myEventData
            )}
          </div>
        </InfiniteScroll>
      ) : null}
    </div>
  );
}

export default MyEvents;
