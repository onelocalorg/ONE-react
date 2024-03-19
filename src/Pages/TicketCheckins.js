import React, { useEffect, useState } from "react";
import Style from "../Styles/TicketCheckins.module.css";
import { PrivateComponent } from "../Components/PrivateComponent";
import { useScrollToTop } from "../hooks/useScrollToTop";
import HeaderComponent from "../Components/HeaderComponent";
import CheckinCardComponent from "../Components/CheckinCardComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";

import { ListCheckins, onCheckin } from "../api/services";
import { useParams } from "react-router-dom";

const EachData = ({ element, clickOnCheckIn }) => {
  const [state, setState] = useState(false);
  return (
    <CheckinCardComponent>
      <div className={Style.container}>
        <img className={Style.img} src={element.user.pic} />

        <div className={Style.info}>
          <p
            className={Style.member_name}
          >{`${element.user.first_name}${element.user.last_name}`}</p>
          <p className={Style.event_name}>{element.event.name}</p>
          <p className={Style.member_status}>{element.ticket_name}</p>
        </div>

        <p className={Style.price}>${element.ticket_price}</p>
      </div>
      <button
        className={
          element.isCheckedIn || state ? Style.greenbutton : Style.button
        }
        onClick={async () => {
          if (!element.isCheckedIn && !state) {
            const res = await clickOnCheckIn(element);
            if (res === true) {
              setState(true);
            }
          }
        }}
      >
        {element.isCheckedIn || state ? "Checked In" : "Check In"}
      </button>
    </CheckinCardComponent>
  );
};

const TicketCheckins = () => {
  const { eventId } = useParams();
  const scrollToTop = useScrollToTop();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    if (hasMore) {
      const apiData = await ListCheckins(eventId, 8, page);
      if (apiData?.success) {
        setData((prevItems) => [...prevItems, ...apiData.data.results]);

        if (apiData.data.page < apiData.data.totalPages) {
          setHasMore(true);
          setPage(page + 1);
        } else {
          setHasMore(false);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    scrollToTop();
    getData();
  }, []);

  const clickOnCheckIn = async (data) => {
    setLoading(true);
    try {
      const ticketId = data._id;
      const getConfirm = await onCheckin(ticketId, {
        email: data.user.email,
        is_app_user: 1,
        isCheckedIn: true,
      });
      return getConfirm;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    } finally {
      setLoading(false);
      return true;
    }
  };

  return (
    <>
      <div className={Style.mainDiv}>
        <PrivateComponent />
        <HeaderComponent />
        <div className={Style.page}>
          {data.length ? (
            <>
              <div className={Style.pageHeader}>
                <h1 className={Style.title}>
                  {data.length ? data[0]?.event?.name : ""}
                </h1>
              </div>
              <InfiniteScroll
                dataLength={data.length}
                next={getData}
                hasMore={hasMore}
                loader={loading ? <Loader /> : ""}
                className={Style.infinitescroll}
              >
                {data.length > 0 &&
                  data.map((element, index) => {
                    return (
                      <EachData
                        element={element}
                        clickOnCheckIn={clickOnCheckIn}
                        key={index}
                      />
                    );
                  })}
              </InfiniteScroll>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontWeight: "600",
                margin: "150px 14px 0px 14px",
              }}
            >
              {!loading && "No Data Found"}
            </div>
          )}
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default TicketCheckins;
