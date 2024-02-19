import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import ticketIcon from "../images/ticket-icon.png";
import { singleEvents } from "../api/services";

import Style from "../Styles/MyEventPage.module.css";
import Loader from "../Components/Loader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ToasterComponent from "../Components/ToasterComponent";
import NotFound from "./NotFound";
import { useScrollToTop } from "../hooks/useScrollToTop";
import HeaderComponent from "../Components/HeaderComponent";
import { PrivateComponent } from "../Components/PrivateComponent";
import { useSelector } from "react-redux";

const MyEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const scrollToTop = useScrollToTop();
  const userInfo = useSelector((state) => state?.userInfo);

  const onLastPage = () => {
    navigate("/my-events");
  };

  const schema = yup.object().shape({
    ticket: yup.string().required("Do check ticket before buy"),
    quantity: yup.number(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: 1,
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top as some time it shows in middle of after image section when comes to detail page
    scrollToTop();

    const fetchEventData = async () => {
      if (eventId) {
        try {
          const response = await singleEvents(eventId);
          setEventData(response?.data);
          setTicketData(response?.data?.tickets);
        } catch (error) {
          setLoading(false);
          setError(error.message);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEventData();
  }, [eventId]);

  const onSubmit = async (data) => {};

  const formVal = watch();

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <div className={Style.mainDiv}>
        <PrivateComponent />
        <HeaderComponent />
        <div className={Style.dataContainer}>
          <div className={Style.btnDiv}>
            <button className={Style.backButton} onClick={onLastPage}>
              {"< back"}
            </button>
            <button className={Style.adminToolBtn}>
              <img
                src={ticketIcon}
                className={Style.adminToolBtnIcon}
                alt="ticket"
              />
              {"Admin Tools"}
            </button>
          </div>
          <div className={Style.wrapper}>
            <div className={Style.left}>
              {/* //event name */}
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
                  <div className={Style.date}>
                    {eventData
                      ? moment(eventData?.start_date).format("MMMM DD, YYYY")
                      : ""}
                  </div>
                  <div className={Style.timing}>
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
                  </div>
                </div>
              </div>
              {/* boxes 2  */}
              <div className={Style.boxes}>
                <div
                  className={Style.iconDiv}
                  style={{ backgroundColor: "#E3C384" }}
                >
                  <img src={locationIcon} alt="locationIcon" />
                </div>
                <div className={Style.infoDiv}>
                  <div className={Style.date}>{eventData?.address}</div>
                  <div className={Style.timing}>
                    {eventData ? eventData?.full_address : ""}
                  </div>
                </div>
              </div>
              <hr />

              <form onSubmit={handleSubmit(onSubmit)} className={Style.descDiv}>
                <div className={Style.desc}>Tickets:</div>
                {ticketData &&
                  ticketData?.map((ticketitem) => (
                    <div
                      key={ticketitem.id}
                      style={{
                        display: "flex",
                        gap: "0px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <label
                        htmlFor={ticketitem.id}
                        className={Style.labelText}
                      >
                        {ticketitem.name} - ${ticketitem.price} - (
                        {`ends ${moment(ticketitem?.end_date).format(
                          "ddd, MMM D • h:mm A"
                        )}`}
                        )
                      </label>
                    </div>
                  ))}
                <hr />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* Blank */}
                </div>
              </form>
            </div>
            <div className={Style.right}>
              {eventData?.event_image ? (
                <img
                  src={eventData?.event_image}
                  alt={"event_image"}
                  className={Style.eventImg}
                />
              ) : (
                <div className={`${Style.eventImg} ${Style.skeletonImg}`} />
              )}
              <div className={Style.aboutEventDiv}>
                <div className={Style.descDiv}>
                  <div className={Style.aboutEventText}>About Event</div>
                  <div
                    className={`${Style.aboutEventDetail} about-event-detail`}
                  >
                    {eventData?.about ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(eventData?.about),
                        }}
                      />
                    ) : (
                      "No description available"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default MyEventPage;
