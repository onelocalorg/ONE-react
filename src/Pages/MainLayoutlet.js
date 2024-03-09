import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NavHeaderComponent from "../Components/NavHeaderComponent";
import Style from "../Styles/UserData.module.css";
import CalendarFilterComponent from "../Components/CalendarFilterComponent";
import RecentUserList from "./RecentUsersList";
import DataListComponent from "../Components/DataListComponent";

function MainLayoutlet({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSearch,
  setFilterData,
  filterData,
  isLoading,
  items,
  fetchMoreData,
  hasMore,
  filteredEvents,
  appEventData,
}) {
  return (
    <>
      <NavHeaderComponent
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <div className={Style.filterdiv}>
        <RecentUserList />
        <CalendarFilterComponent
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleSearch={handleSearch}
        />
      </div>
      <DataListComponent
        isLoading={isLoading}
        items={items}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
        filterData={filterData}
        filteredEvents={filteredEvents}
        appEventData={appEventData}
      />
    </>
  );
}

export default MainLayoutlet;
