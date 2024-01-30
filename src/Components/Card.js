import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Style from "../Styles/Card.module.css";

const Card = ({
  eventId,
  index,
  tent,
  img,
  start_date,
  name,
  locationPin,
  address,
}) => {
  const navigate = useNavigate();

  const ticketPage = () => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div key={index} className={Style.cardMainDiv} onClick={ticketPage}>
      <img src={tent} alt="event" className={Style.tent} />

      <img src={img} className={Style.heroImage} alt="event" />

      <div className={Style.infoDiv}>
        <div className={Style.dateTime}>
          {moment(start_date).format("ddd, MMM D - h:mm A")}
        </div>
        <div className={Style.eventName}>{name}</div>
        <div className={Style.addWrapper}>
          <img src={locationPin} alt="location" className={Style.locationPin} />
          <div className={Style.address}>{address}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
