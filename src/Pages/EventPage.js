import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import moment from "moment";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";
import { singleEvents } from "../api/services";

import Style from "../Styles/EventPage.module.css";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const onLastPage = () => {
    navigate("/");
  };

  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        const response = await singleEvents(eventId);
        setEventData(response?.data);
      }
    };

    fetchEventData();
  }, [eventId]);
  console.log(eventData);

  return (
    <div className={Style.mainDiv}>
      <div className={Style.navHeader}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
            flexGrow: "1",
          }}
        >
          <img src={logo} alt="logo" className={Style.oneLogo} />
          <h2 className={Style.brand}>NE</h2>
        </div>
        <div className={Style.userCover}>
          <img
            src={user}
            alt="user"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={Style.dataContainer}>
        <div>
          <button className={Style.backButton} onClick={onLastPage}>
            {"< back"}
          </button>
        </div>
        <img
          src={eventData?.event_image}
          alt="event"
          className={Style.eventImg}
          loading="eager"
        />
        <h2 className={Style.eventName}>{eventData?.name}</h2>

        {/* boxes 1  */}
        <div className={Style.boxes}>
          <div className={Style.iconDiv} style={{ backgroundColor: "#db9791" }}>
            <img src={calendarIcon} alt="calendar" />
          </div>
          <div className={Style.infoDiv}>
            <p className={Style.date}>
              {eventData
                ? moment(eventData?.start_date).format("DD MMMM YYYY")
                : ""}
            </p>
            <p className={Style.timing}>
              {eventData ? moment(eventData?.start_date).format("ddd") : ""},{" "}
              {eventData ? moment(eventData?.start_date).format("hh:mm A") : ""}{" "}
              - {eventData ? moment(eventData?.end_date).format("hh:mm A") : ""}
            </p>
          </div>
        </div>

        {/* boxes 2  */}
        <div className={Style.boxes}>
          <div className={Style.iconDiv} style={{ backgroundColor: "#E3C384" }}>
            <img src={locationIcon} alt="locationIcon" loading="eager" />
          </div>
          <div className={Style.infoDiv}>
            <p className={Style.date}>{eventData?.address}</p>
            <p className={Style.timing}>
              {eventData ? eventData?.full_address : ""}
            </p>
          </div>
        </div>

        {/* boxes 3  */}
        <div
          className={Style.boxes}
          style={{
            width: "95%",
          }}
        >
          <div className={Style.producerDiv} style={{ overflow: "hidden" }}>
            <img
              src={eventData ? eventData?.eventProducer?.pic : proImg}
              alt="producerIcon"
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className={Style.producerInfo}>
            <p className={Style.proName}>
              {eventData ? eventData?.eventProducer?.first_name : ""}{" "}
              {eventData ? eventData?.eventProducer?.last_name : ""}
            </p>
            <p className={Style.timing}>
              {/* {eventData ? eventData?.eventProducer?.user_type : ""} */}
              Producer
            </p>
          </div>
        </div>

        {/* boxes 4 */}

        <div className={Style.descDiv}>
          <p className={Style.desc}>Description</p>
          <p className={Style.descDetail}>
            {eventData?.about ? eventData?.about : "No description available"}
          </p>
        </div>

        {/* ticket buy cta  */}
        <Link
          className={Style.purchase}
          to={eventData ? eventData?.tickets[0]?.ticket_purchase_link : ""}
          target="_blank"
        >
          <span>
            BUY TICKET ${eventData ? eventData?.tickets[0]?.price : ""}
          </span>
          <span className={Style.arrowIcon}>
            <img src={arrow} alt="arrow" loading="eager" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EventPage;
