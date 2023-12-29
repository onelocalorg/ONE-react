import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import moment from "moment";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";

import Style from "../Styles/EventPage.module.css";

const EventPage = () => {
  const [data, setData] = useState([]);
  const [img, setImg] = useState();
  const [eventName, setEventName] = useState();
  const location = useLocation();
  const [add, setAdd] = useState();
  const [fullAdd, setFullAdd] = useState();
  const [producer, setProducer] = useState();

  useEffect(() => {
    const stateTicket = location.state && location.state.ticket;
    const img = location.state && location.state.img;
    const name = location.state && location.state.name;
    const address = location.state && location.state.address;
    const full_address = location.state && location.state.full_address;
    const eventProducer = location.state && location.state.eventProducer;

    if (stateTicket) {
      setData(stateTicket);
      setImg(img);
      setEventName(name);
      setAdd(address);
      setFullAdd(full_address);
      setProducer(eventProducer);
    }
  }, [location]);

  const navigate = useNavigate();
  const onLastPage = () => {
    navigate("/");
  };

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
        <img src={img ? img : ""} alt="event" className={Style.eventImg} />
        <h2 className={Style.eventName}>{eventName}</h2>

        {/* boxes 1  */}
        <div className={Style.boxes}>
          <div className={Style.iconDiv} style={{ backgroundColor: "#db9791" }}>
            <img src={calendarIcon} alt="calendar" />
          </div>
          <div className={Style.infoDiv}>
            <p className={Style.date}>
              {data.length
                ? moment(data[0].start_date).format("DD MMMM YYYY")
                : ""}
            </p>
            <p className={Style.timing}>
              {data.length ? moment(data[0].start_date).format("ddd") : ""},{" "}
              {data.length ? moment(data[0].start_date).format("hh:mm A") : ""}{" "}
              - {data.length ? moment(data[0].end_date).format("hh:mm A") : ""}
            </p>
          </div>
        </div>

        {/* boxes 2  */}
        <div className={Style.boxes}>
          <div className={Style.iconDiv} style={{ backgroundColor: "#E3C384" }}>
            <img src={locationIcon} alt="locationIcon" />
          </div>
          <div className={Style.infoDiv}>
            <p className={Style.date}>{data.length ? add : ""}</p>
            <p className={Style.timing}>{data.length ? fullAdd : ""}</p>
          </div>
        </div>

        {/* boxes 3  */}
        <div
          className={Style.boxes}
          style={{
            width: "95%",
          }}
        >
          <div className={Style.producerDiv}>
            <img src={proImg} alt="producerIcon" />
          </div>
          <div className={Style.producerInfo}>
            <p className={Style.proName}>
              {data.length ? producer.first_name : ""}{" "}
              {data.length ? producer.last_name : ""}
            </p>
            <p className={Style.timing}>Producer</p>
          </div>
        </div>

        {/* boxes 4 */}

        <div className={Style.descDiv}>
          <p className={Style.desc}>Description</p>
          <p className={Style.descDetail}></p>
        </div>

        {/* ticket buy cta  */}
        <Link
          className={Style.purchase}
          to={data.length ? data[0].ticket_purchase_link : ""}
          target="_blank"
        >
          <span>BUY TICKET ${data.length ? data[0].price : ""}</span>
          <span className={Style.arrowIcon}>
            <img src={arrow} alt="arrow" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EventPage;
