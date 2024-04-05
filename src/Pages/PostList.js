import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import MainLayoutlet from "./MainLayoutlet";
import Style from "../Styles/UserData.module.css";
import PostListTopCard from "../Components/PostListTopCard";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { getPostListAPI, uploadImageAPI } from "../api/services";
import PostListLayoutCard from "../Components/PostListLayoutCard";
import OfferPostComponent from "../Components/OfferPostComponent";
import Select, { components } from "react-select";
import { CgStyle } from "react-icons/cg";
import pic1 from "../images/Add.svg";
import pic2 from "../images/Delete.svg";

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
    searchtext: filterData,
  };

  const getPostData = async (fetchMore, startPage) => {
    try {
      setIsLoading(true);
      const response = await getPostListAPI(startPage, filterParams);
      const resultData = response?.data?.results;

      if (fetchMore) {
        if (resultData.length > 0) {
          setPagination((prev) => ({
            ...prev,
            totalData: response.data.totalResults,
            page: prev.page + 1,
            totalPage: response.data.totalPages,
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
            totalData: response?.data?.totalResults,
            page: 2,
            totalPage: response?.data?.totalPages,
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

  const appEventData = postItems.map((postItem, index) => {
    return (
      <React.Fragment key={index}>
        {index === 0 && (
          <div>
            <PostListTopCard />
          </div>
        )}
        <PostListLayoutCard postData={postItem} />
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
      <OfferPostComponent />
    </div>
  );
}

export default PostList;
