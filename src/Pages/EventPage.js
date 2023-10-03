import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import banner from "../images/Rectangle 5918.svg";
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
  const { event } = useParams();
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

  console.log(event);

  return (
    <div className={Style.mainDiv}>
      <div
        style={{
          width: "100%",
          height: "100px",
          borderRadius: "0 0 10px 10px",
          overflow: "hidden",
          position: "fixed",
        }}
      >
        <h2
        className={Style.brand}
        >
          ONE|BOULDER
        </h2>
        <img
          src={banner}
          alt="banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className={Style.dataContainer}>
        <img src={img ? img : ""} alt="event" className={Style.eventImg} />
        <h2 className={Style.eventName} >{eventName}</h2>

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
            <p className={Style.timing} >
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
            <p className={Style.date}>
              {data.length ? add : ""}
            </p>
            <p className={Style.timing}>
              {data.length ? fullAdd : ""}
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
          <div className={Style.producerDiv}>
            <img src={proImg} alt="producerIcon" />
          </div>
          <div className={Style.producerInfo}>
            <p className={Style.proName} >
              {data.length ? producer.first_name : ""}{" "}
              {data.length ? producer.last_name : ""}
            </p>
            <p className={Style.timing}>Producer</p>
          </div>
        </div>

        {/* boxes 4 */}
        <div
        className={Style.descDiv}
        >
          <p className={Style.desc} >Description</p>
          <p className={Style.descDetail} >
            Enjoy your favorite dishes and a lovely your friends and family and
            have a great time. Food from local food trucks will be available for
            purchase. Read More...Enjoy your favorite dishes and a lovely your
            friends and family and have a great time. Food from local food
            trucks will be available for purchase. Read More...Enjoy your
            favorite dishes and a lovely your friends and family and have a
            great time. Food from local food trucks will be available for
            purchase. Read More...Enjoy your favorite dishes and a lovely your
            friends and family and have a great time. Food from local food
            trucks will be available for purchase. Read More...
          </p>
        </div>

        {/* ticket buy cta  */}
        <Link
        className={Style.purchase}
          to={data.length ? data[0].ticket_purchase_link : ""}
          target="_blank"
        >
          <span>BUY TICKET ${data.length ? data[0].price : ""}</span>
          <span
          className={Style.arrowIcon}
          >
            <img src={arrow} alt="arrow" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EventPage;
