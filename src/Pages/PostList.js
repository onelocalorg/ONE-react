import React, { useEffect, useState } from "react";
import moment from "moment";
import MainLayoutlet from "./MainLayoutlet";
import Style from "../Styles/UserData.module.css";
import Card from "../Components/Card";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { listEvents } from "../api/services";
import tent from "../images/Vector.png";
import locationPin from "../images/map-pin.svg";

function PostList() {
  const scrollToTop = useScrollToTop();
  const [postItems, setPostItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const currentDate = new Date();
  const oneMonthLater = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1)
  );
  const [endDate, setEndDate] = useState(oneMonthLater);
  const [filterData, setFilterData] = useState("");
  const [pagination, setPagination] = useState({
    totalData: 0,
    page: 1,
    totalPage: 1,
  });
  const { page, totalPage } = pagination;
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setHasMore(page <= totalPage);
  }, [page, totalPage]);

  const filterParams = {
    start_date: moment(startDate).format("YYYY-MM-DD"),
    end_date: moment(endDate).format("YYYY-MM-DD"),
    eventName: filterData,
  };

  const getPostData = async (fetchMore, startPage) => {
    try {
      setIsLoading(true);
      const response = await listEvents(startPage, filterParams);
      const resultData = response?.data?.results;

      if (fetchMore) {
        if (resultData.length > 0) {
          setPagination((prev) => ({
            ...prev,
            totalData: response.data.totalEvents,
            page: prev.page + 1,
            totalPage: response.data.totalPage,
          }));
        }

        if (!resultData || resultData.length === 0) {
          setHasMore(false);
          return;
        }

        setPostItems((prevItems) => [...prevItems, ...resultData]);
      } else {
        if (resultData.length > 0) {
          setPagination((prev) => ({
            ...prev,
            totalData: response?.data?.totalEvents,
            page: 2,
            totalPage: response?.data?.totalPage,
          }));
        }

        setIsLoading(false);
        setPostItems(resultData);
        return;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostList = async () => {
    setPostItems([]); //Clear all data when new search
    setHasMore(false);
    try {
      await getPostData(false, 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoreData = async () => {
    try {
      await getPostData(true, pagination.page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    scrollToTop();
    const timeoutId = setTimeout(fetchPostList, 500); // Adjust the delay as needed (e.g., 500 milliseconds)
    return () => clearTimeout(timeoutId);
  }, [filterData, startDate, endDate]);

  const appEventData = postItems.map((eventItem, index) => {
    return (
      <React.Fragment key={index}>
        {eventItem?.events.map((event, indexinner) => (
          <Card
            eventId={event?.id}
            key={indexinner}
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
      <MainLayoutlet
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleSearch={fetchPostList}
        filterData={filterData}
        setFilterData={setFilterData}
        isLoading={isLoading}
        items={postItems}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
        filteredEvents={postItems}
        appEventData={appEventData}
      />
    </div>
  );
}

export default PostList;
