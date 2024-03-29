import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Style from "../Styles/UserData.module.css";
import Loader from "./Loader";

function DataListComponent({
  isLoading,
  items,
  fetchMoreData,
  hasMore,
  filterData,
  filteredEvents,
  appEventData,
}) {
  return (
    <>
      {isLoading && <Loader />}
      {!items.length && !isLoading ? (
        <p
          style={{ textAlign: "center", fontWeight: "600", marginTop: "20px" }}
        >
          No Events Found
        </p>
      ) : null}

      {items.length ? (
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
            {filterData !== "" && filteredEvents.length === 0 ? (
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                No Events Found
              </p>
            ) : (
              appEventData
            )}
          </div>
        </InfiniteScroll>
      ) : null}
    </>
  );
}

export default DataListComponent;
