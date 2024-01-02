import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import moment from "moment";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";
import { getAmountOfTickets, singleEvents } from "../api/services";

import Style from "../Styles/EventPage.module.css";
import Loader from "../Components/Loader";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ToasterComponent from "../Components/ToasterComponent";
import InputWithPlusAndMinusComponent from "../Components/InputWithPlusMinusComp";

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const onLastPage = () => {
    navigate("/");
  };

  const schema = yup.object().shape({
    ticket: yup.string().required("Do check ticket before buy"),
    // quantity: yup.object().shape({ value: yup.number(), label: yup.string() }),
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
  const [loading, setloading] = useState(false);
  const [taxAmount, setTaxAmount] = useState({});
  const [confirmation, setConfirmation] = useState(false);

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
  const onSubmit = async (data) => {
    try {
      setloading(true); // Start loading
      console.log(data);

      // Fetch object which has the same price as data.ticket
      const linktoTicketPurchase = ticketData.filter(
        (item) => item.price === data.ticket
      );

      // API call to get the amount of tickets
      const res = await getAmountOfTickets(
        linktoTicketPurchase[0]?.id,
        data.quantity
      );
      console.log(res);

      // Set link to navigate
      navigateToTicketPurchase(res?.data?.payment_link);
    } catch (error) {
      console.error("Error during submission:", error);
      // Handle the error appropriately
      // e.g., show an error message to the user
    } finally {
      setloading(false); // End loading
    }
  };

  const formVal = watch();
  console.log(formVal);

  const trakker = watch("ticket");

  useEffect(() => {
    setValue("quantity", 1);
  }, [trakker]);
  const trakkerQuantity = watch("quantity");
  useEffect(() => {
    setTaxAmount({});
    const getDataOfAmountAndTax = async () => {
      try {
        if (Number(formVal?.quantity) > 0) {
          setloading(true);
          const linktoTicketPurchase = ticketData.filter(
            (item) => item.price === formVal?.ticket
          );

          // API call to get the amount of tickets
          const res = await getAmountOfTickets(
            linktoTicketPurchase[0]?.id,
            Number(formVal?.quantity)
          );
          setTaxAmount(res?.data);
          setConfirmation(res?.success);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    getDataOfAmountAndTax();
  }, [trakkerQuantity, trakker]);

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
                        style={{ height: "20px" }}
                        disabled={
                          ticketitem?.max_quantity_to_show === 0 ? true : false
                        }
                      />

                      <label
                        htmlFor={ticketitem.id}
                        style={{
                          cursor:
                            ticketitem?.max_quantity_to_show === 0
                              ? "no-drop"
                              : "pointer",
                        }}
                      >
                        {/* Label content here */}
                        {ticketitem.name}-${ticketitem.price}
                      </label>

                      {formVal.ticket === ticketitem.price && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <InputWithPlusAndMinusComponent
                            type="number"
                            defaultValue={1}
                            register={register}
                            inputRef="quantity"
                            boundary={ticketitem?.max_quantity_to_show}
                            classNamebtn1={Style.iconCover}
                            classNamebtn2={Style.iconCover}
                            className={Style.counterInput}
                            setValue={setValue}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                <hr />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p className={Style.desc}>Price and Taxes</p>
                  {confirmation === true && (
                    <div>
                      <div className={Style.calcDiv}>
                        <p className={Style.descDetail}>Ticket Price</p>
                        <p className={Style.descDetail}>
                          {taxAmount?.ticket_price} $
                        </p>
                      </div>
                      <div className={Style.calcDiv}>
                        <p className={Style.descDetail}>Quantity</p>
                        <p className={Style.descDetail}>
                          {taxAmount?.quantity}
                        </p>
                      </div>
                      <div className={Style.calcDiv}>
                        <p className={Style.descDetail}>Service Tax</p>
                        <p className={Style.descDetail}>
                          {taxAmount?.service_tax}
                        </p>
                      </div>
                      <hr />
                      <div className={Style.calcDiv}>
                        <p className={Style.descDetail}>Total Amount</p>
                        <p className={Style.descDetail}>{taxAmount?.total} $</p>
                      </div>
                    </div>
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

              <h2 style={{ fontWeight: "600" }}>{`No Event Details Found`}</h2>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {loading && <Loader />}
    </>
  );
};

export default EventPage;
