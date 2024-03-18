import React, { useEffect, useState } from "react";
import Style from "../Styles/TicketCheckins.module.css";
import { PrivateComponent } from "../Components/PrivateComponent";
// import { useScrollToTop } from "../hooks/useScrollToTop";
import HeaderComponent from "../Components/HeaderComponent";
import CheckinCardComponent from "../Components/CheckinCardComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";
import user from "../images/user.png";
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
          if (!element.isCheckedIn) {
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
  const checkedin = false;
  const { eventId } = useParams();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    if (hasMore) {
      const apiData = await ListCheckins(eventId, 5, page);
      setData((prevItems) => [...prevItems, ...apiData.data.results]);

      console.log("apiData", apiData.data.page, apiData.data.totalPages);
      if (apiData.data.page < apiData.data.totalPages) {
        setHasMore(true);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const clickOnCheckIn = async (data) => {
    const ticketId = data._id;
    const getConfirm = await onCheckin(ticketId, {
      email: data.user.email,
      is_app_user: 1,
      isCheckedIn: true,
    });

    return getConfirm;
  };

  return (
    <>
      <div className={Style.mainDiv}>
        <PrivateComponent />
        <HeaderComponent />
        <div className={Style.page}>
          <div className={Style.pageHeader}>
            <h1 className={Style.title}>Garden Party</h1>
          </div>
          <InfiniteScroll
            dataLength={data.length}
            next={getData}
            hasMore={hasMore}
            loader={loading ? <Loader /> : ""}
          >
            {data.length > 0 &&
              data.map((element) => {
                return (
                  <EachData element={element} clickOnCheckIn={clickOnCheckIn} />
                );
              })}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default TicketCheckins;
