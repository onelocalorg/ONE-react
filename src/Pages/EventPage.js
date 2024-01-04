import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import moment from "moment";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";
import {
  getAmountOfTickets,
  getTaxAndAmout,
  singleEvents,
} from "../api/services";

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
        (item) => item.price === Number(data.ticket)
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

  const trakker = watch("ticket");

  useEffect(() => {
    setValue("quantity", 1);
    const getDataOfAmountAndTax = async () => {
      try {
        if (formVal?.ticket) {
          setloading(true);
          const linktoTicketPurchase = ticketData.filter(
            (item) => item.price === Number(formVal?.ticket)
          );
          console.log(linktoTicketPurchase);
          if (linktoTicketPurchase) {
            console.log(linktoTicketPurchase[0]?.id);
            const res = await getTaxAndAmout(
              linktoTicketPurchase[0]?.id,
              Number(1)
            );
            setTaxAmount(res?.data);
            setConfirmation(res?.success);
            console.log(res);
          } else {
            console.log("no event found");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    getDataOfAmountAndTax();
  }, [trakker]);

  const trakkerQuantity = watch("quantity");
  useEffect(() => {
    setTaxAmount({});
    const getDataOfAmountAndTax = async () => {
      try {
        if (Number(formVal?.quantity) > 0 && formVal?.ticket) {
          setloading(true);
          console.log(formVal?.ticket);
          console.log(formVal?.quantity);
          const linktoTicketPurchase = ticketData.filter(
            (item) => item.price === Number(formVal?.ticket)
          );
          console.log(linktoTicketPurchase);

          // API call to get the amount of tickets
          if (linktoTicketPurchase) {
            console.log(linktoTicketPurchase[0]?.id);
            const res = await getTaxAndAmout(
              linktoTicketPurchase[0]?.id,
              Number(formVal?.quantity)
            );
            setTaxAmount(res?.data);
            setConfirmation(res?.success);
            console.log(res);
          } else {
            console.log("no event found");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    getDataOfAmountAndTax();
  }, [trakkerQuantity]);

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
                alt={"event_image"}
                className={Style.eventImg}
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
                  <div className={Style.date}>
                    {eventData
                      ? moment(eventData?.start_date).format("DD MMMM YYYY")
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

              {/* boxes 3  */}
              <div
                className={Style.boxes}
                style={{
                  width: "90%",
                }}
              >
                <div
                  className={Style.producerDiv}
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={
                      eventData?.eventProducer?.pic === ""
                        ? proImg
                        : eventData?.eventProducer?.pic
                    }
                    alt="producerIcon"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className={Style.producerInfo}>
                  <div className={Style.proName}>
                    {eventData ? eventData?.eventProducer?.first_name : ""}{" "}
                    {eventData ? eventData?.eventProducer?.last_name : ""}
                  </div>
                  <div className={Style.timing}>
                    {/* {eventData ? eventData?.eventProducer?.user_type : ""} */}
                    Producer
                  </div>
                </div>
              </div>

              {/* boxes 4 */}

              <div className={Style.descDiv}>
                <div className={Style.desc}>Description</div>
                <div className={Style.descDetail}>
                  {eventData?.about
                    ? eventData?.about
                    : "No description available"}
                </div>
              </div>

              {/* //here we need to mapover the tickets array and need to make radio button available options */}

              <form onSubmit={handleSubmit(onSubmit)} className={Style.descDiv}>
                <div className={Style.desc}>Ticket list</div>
                {ticketData &&
                  ticketData?.map((ticketitem) => (
                    <div
                      key={ticketitem.id}
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <InputComponent
                        type={"radio"}
                        register={register}
                        inputRef={"ticket"}
                        name={"ticket"}
                        id={ticketitem.id}
                        value={Number(ticketitem?.price)}
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
                        className={Style.label}
                      >
                        {/* Label content here */}
                        {ticketitem.name}-${ticketitem.price}
                        {ticketitem?.max_quantity_to_show === 0 && (
                          <span
                            style={{
                              fontWeight: "600",
                              color: "red",
                              padding: "0 7px",
                            }}
                          >
                            -- sold out --
                          </span>
                        )}
                      </label>

                      {Number(formVal.ticket) === ticketitem.price && (
                        <>
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
                        </>
                      )}
                    </div>
                  ))}
                <hr />

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className={Style.desc}>Price and Taxes</div>
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
                  style={{
                    marginTop: "10px",
                    pointerEvents: !confirmation ? "none" : "",
                  }}
                >
                  <span>PURCHASE</span>
                  <span className={Style.arrowIcon}>
                    <img src={arrow} alt="arrow" />
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
