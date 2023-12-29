import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Card = ({
  eventId,
  index,
  tent,
  img,
  start_date,
  name,
  full_address,
  locationPin,
}) => {
  const navigate = useNavigate();

  const ticketPage = () => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div
      key={index}
      style={{
        maxWidth: "639px",
        width: "100%",
        minHeight: "188px",
        backgroundColor: "#fff",
        margin: "auto",
        borderRadius: "16px",
        border: "2px solid #DB9791",
        padding: "10px",
        position: "relative",
        display: "flex",
        gap: "20px",
        cursor: "pointer",
      }}
      onClick={ticketPage}
    >
      <img
        src={tent}
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          zIndex: "1",
        }}
        alt="event"
      />

      <img
        src={img}
        style={{ width: "155px", height: "163px", borderRadius: "10px" }}
        alt="event"
        loading="lazy"
      />

      <div
        className="infoDiv"
        style={{
          flex: "1 1 400px",
          padding: "0 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <p style={{ fontSize: "24px", fontWeight: "400", lineHeight: "36px" }}>
          {moment(start_date).format("ddd, MMM D - h:mm A")}
        </p>
        <p style={{ fontSize: "24px", fontWeight: "400", lineHeight: "36px" }}>
          {name}
        </p>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "400",
            lineHeight: "36px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img src={locationPin} alt="location" />
          <p
            style={{
              maxWidth: "380px",
              height: "inherit",
              display: "inline-block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: "auto",
            }}
          >
            {full_address}
          </p>
        </p>
      </div>
    </div>
  );
};

export default Card;
