import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { listEvents } from "../api/services";
import Style from "../Styles/UserData.module.css";
// import AccordianComponent from "../Components/AccordianComponent";
// import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import EventFilterComponent from "../Components/EventFilterComponent";

// tent image
import tent from "../images/Vector.png";

//location mark
import locationPin from "../images/map-pin.svg";
import Card from "../Components/Card";

import Loader from "../Components/Loader";

function UserData() {
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);

      const data = {
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      };

      const response = await listEvents(pagination.page, data);
      const eventList = response.data.events;

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
      };

      const response = await listEvents(1, data);
      const eventList = response.data.events;

      if (eventList.length > 0) {
        setPagination((prev) => ({
          ...prev,
          totalData: response.data.totalEvents,
          page: 2,
          totalPage: response.data.totalPage,
        }));
      }

      setHasMore(page < totalPage + 1);

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
    const start_date = moment().format("YYYY-MM-DD");

    // Set end_date to one month from today
    const end_date = moment().add(1, "months").format("YYYY-MM-DD");

    const initialDate = {
      start_date: start_date,
      end_date: end_date,
    };
    const fetchDataOfMonth = async () => {
      const res = await listEvents(1, initialDate);
      const dataToShow = res?.data?.events;
      setItems(dataToShow);
    };
    fetchDataOfMonth();
  }, []);

  const filteredEvents = items.filter((user) => {
    return (
      user.name && user.name.toLowerCase().includes(filterData.toLowerCase())
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
      />

      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          className={Style.infinitescroll}
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h5 style={{ textAlign: "center" }}>Loading...</h5>}
          minHeight={"inherit"}
          style={{ paddingTop: "20px" }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {items.length === 0 && search ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                No Events Found
              </p>
            ) : items.length === 0 && !search ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Please select a date interval to fetch data
              </p>
            ) : (
              filteredEvents.map((event, index) => (
                <Card
                  eventId={event?.id}
                  key={index}
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
                />
              ))
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default UserData;
