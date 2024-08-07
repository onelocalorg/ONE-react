import React from "react";
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
  detailType,
  start_date_label,
  start_time_label,
  cancelled,
}) => {
  const navigate = useNavigate();

  const ticketPage = () => {
    if (detailType === "my-event") {
      navigate(`/my-event/${eventId}`);
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  return (
    <div key={index} className={Style.cardMainDiv} onClick={ticketPage}>
      <img src={tent} alt="event" className={Style.tent} />

      {img && <img src={img} className={Style.heroImage} alt="event" />}

      <div className={Style.infoDiv}>
        <div className={Style.dateTime}>
          {/* {moment(start_date).format("ddd, MMM D - h:mm A")} */}
          {`${start_date_label} - ${start_time_label}`}
        </div>
        <div className={Style.eventName}>{name}</div>
        <div className={Style.addWrapper}>
          <img src={locationPin} alt="location" className={Style.locationPin} />
          <div className={Style.address}>{address}</div>
        </div>
      </div>

      {cancelled && <p className={Style.cancelText}>Cancelled</p>}
    </div>
  );
};

export default Card;
