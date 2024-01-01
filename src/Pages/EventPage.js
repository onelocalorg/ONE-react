import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import moment from "moment";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";
import { singleEvents } from "../api/services";

import Style from "../Styles/EventPage.module.css";
import Loader from "../Components/Loader";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ToasterComponent from "../Components/ToasterComponent";
import { calculateTotalTicketPrice } from "../utils/TaxCalculation";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const onLastPage = () => {
    navigate("/");
  };

  const schema = yup.object().shape({
    ticket: yup.string().required("Do check ticket before buy"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ticket: "0",
    },
  });
  useEffect(() => {
    const errorMsg = Object.values(errors).map((item) => item.message);
    errorMsg.slice(0, 1).forEach((errorMessage) => {
      ToasterComponent(errorMessage, 3000);
    });
  }, [errors]);

  const [eventData, setEventData] = useState({});
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        const response = await singleEvents(eventId);
        setEventData(response?.data);
        setTicketData(response?.data?.tickets);
      }
    };

    fetchEventData();
  }, [eventId]);
  const navigateToTicketPurchase = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  const onSubmit = (data) => {
    const linktoTicketPurchase = ticketData.filter(
      (item) => item.price === data.ticket
    );
    navigateToTicketPurchase(linktoTicketPurchase[0]?.ticket_purchase_link);
  };

  const formVal = watch();

  return (
    <>
      {eventData !== undefined ? (
        <>
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
                loading="lazy"
              />
              <h2 className={Style.eventName}>{eventData?.name}</h2>

              {/* boxes 1  */}
              <div className={Style.boxes}>
                <div
                  className={Style.iconDiv}
                  style={{ backgroundColor: "#db9791" }}
                >
                  <img src={calendarIcon} alt="calendar" />
                </div>
                <div className={Style.infoDiv}>
                  <p className={Style.date}>
                    {eventData
                      ? moment(eventData?.start_date).format("DD MMMM YYYY")
                      : ""}
                  </p>
                  <p className={Style.timing}>
                    {eventData
                      ? moment(eventData?.start_date).format("ddd")
                      : ""}
                    ,{" "}
                    {eventData
                      ? moment(eventData?.start_date).format("hh:mm A")
                      : ""}{" "}
                    -{" "}
                    {eventData
                      ? moment(eventData?.end_date).format("hh:mm A")
                      : ""}
                  </p>
                </div>
              </div>

              {/* boxes 2  */}
              <div className={Style.boxes}>
                <div
                  className={Style.iconDiv}
                  style={{ backgroundColor: "#E3C384" }}
                >
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
                <div
                  className={Style.producerDiv}
                  style={{ overflow: "hidden" }}
                >
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
                  {eventData?.about
                    ? eventData?.about
                    : "No description available"}
                </p>
              </div>

              {/* //here we need to mapover the tickets array and need to make radio button available options */}

              <form onSubmit={handleSubmit(onSubmit)} className={Style.descDiv}>
                <p className={Style.desc}>Ticket list</p>
                {ticketData &&
                  ticketData?.map((ticketitem) => (
                    <div
                      key={ticketitem.id}
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <InputComponent
                        type={"radio"}
                        register={register}
                        inputRef={"ticket"}
                        name={"ticket"}
                        id={ticketitem.id}
                        value={ticketitem?.price}
                        // value={ticketitem?.ticket_purchase_link}
                        style={{ height: "20px" }}
                      />

                      <label htmlFor={ticketitem.id}>
                        {ticketitem.name}-${ticketitem.price}
                      </label>
                    </div>
                  ))}
                <hr />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p className={Style.desc}>Price and Taxes</p>
                  {formVal.ticket === "0" ? (
                    <></>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        Total Amount to Pay
                        <span style={{ fontWeight: "600" }}>
                          {calculateTotalTicketPrice(Number(formVal?.ticket))}{" "}
                          $.
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <hr />
                <button
                  type="submit"
                  className={Style.purchase}
                  style={{ marginTop: "10px" }}
                >
                  <span>PURCHASE</span>
                  <span className={Style.arrowIcon}>
                    <img src={arrow} alt="arrow" loading="eager" />
                  </span>
                </button>
              </form>

              {/* <Link
                className={Style.purchase}
                to={eventData?.tickets ? formVal?.ticket : ""}
                target="_blank"
              >
                <span>PURCHASE</span>
                <span className={Style.arrowIcon}>
                  <img src={arrow} alt="arrow" loading="eager" />
                </span>
              </Link> */}
            </div>
          </div>
        </>
      ) : eventData === undefined ? (
        <>
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

              <h2 style={{ fontWeight: "600" }}>{`No Event Details Found `}</h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

export default EventPage;
