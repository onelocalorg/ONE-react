import DOMPurify from "dompurify";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCardListAPI,
  getTaxAndAmout,
  singleEvents,
  submitPurchaseData,
} from "../api/services";
import locationIcon from "../images/Group 18184.svg";
import calendarIcon from "../images/Group 33778.svg";
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";

import { yupResolver } from "@hookform/resolvers/yup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import UserConfirmDialog from "../Components/EmailModalDialog";
import HeaderComponent from "../Components/HeaderComponent";
import InputComponent from "../Components/InputComponent";
import InputWithPlusAndMinusComponent from "../Components/InputWithPlusMinusComp";
import Loader from "../Components/Loader";
import PurchaseModalDialog from "../Components/PurchaseModalDialog";
import ToasterComponent from "../Components/ToasterComponent";
import { useScrollToTop } from "../hooks/useScrollToTop";
import Style from "../Styles/EventPage.module.css";
import NotFound from "./NotFound";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPurchseDialog, setShowPurchseDialog] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showBillingInformation, setShowBillingInformation] = useState(false);
  const [activePurchaseStep, setActivePurchaseStep] = useState(0); //0 - new register, 1- already user email available
  const userInfo = useSelector((state) => state?.userInfo);
  const scrollToTop = useScrollToTop();

  const onLastPage = () => {
    navigate("/");
  };
  const handleRedirectProfile = () => {
    if (userInfo?.userData?.userId === eventData?.eventProducer?.id) {
      navigate("/my-profile");
    }
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
  const [taxAmount, setTaxAmount] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [savedcard, setSavedCard] = useState("");

  const [loading, setloading] = useState(true);
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
          setloading(false);
          setError(error.message);
          console.log(error);
        } finally {
          setloading(false);
        }
      }
    };

    fetchEventData();
  }, [eventId]);
  const navigateToTicketPurchase = (link) => {
    if (link) {
      window.open(link, "_self");
    }
  };

  const getCardList = async () => {
    setloading(true);
    const res = await getCardListAPI();

    setloading(false);
    if (res?.success) {
      setSavedCard(res?.data?.default_source ? res?.data?.default_source : "");
    } else {
      ToasterComponent(res?.message || "No card found", 2000);
    }
  };

  useEffect(() => {
    if (userInfo?.userData) {
      setloading(true);
      getCardList();
      setloading(false);
    }
  }, [userInfo.userData]);

  const submitBuyData = async () => {
    const linktoTicketPurchase = ticketData.find(
      (item) => item.id === formVal.ticket
    );
    setloading(true);
    const responseData = await submitPurchaseData(
      linktoTicketPurchase?.id,
      formVal?.quantity,
      savedcard
    );
    setloading(false);
    if (responseData.success) {
      navigate("/payment-successfull");
    } else {
      // hideFunc(false);
      ToasterComponent(responseData?.message || "Something went wrong", 1500);
    }
  };

  const handleZeroTicketNotLoggedIn = async () => {
    setloading(true);
    const res = await getCardListAPI();
    const linktoTicketPurchase = ticketData.find(
      (item) => item.id === formVal.ticket
    );

    const sendCard = res?.data?.default_source ? res?.data?.default_source : "";
    const responseData = await submitPurchaseData(
      linktoTicketPurchase?.id,
      formVal?.quantity,
      sendCard
    );
    setloading(false);
    if (responseData.success) {
      navigate("/payment-successfull");
    } else {
      // hideFunc(false);
      ToasterComponent(responseData?.message || "Something went wrong", 1500);
      // awaitsubmitBuyData();
    }
  };
  const onSubmit = async (data) => {
    if (!userInfo?.userData) {
      setActivePurchaseStep(0);
      setShowLoginDialog(true);
      return;
    } else {
      setActivePurchaseStep(1);
      setShowBillingInformation(false);

      if (taxAmount?.total > 0) {
        setShowPurchseDialog(true);
      } else {
        submitBuyData();
        return;
      }

      setShowRegister(false);
      return;
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
            (item) => item.id === formVal?.ticket
          );

          if (linktoTicketPurchase) {
            const res = await getTaxAndAmout(
              linktoTicketPurchase[0]?.id,
              Number(1)
            );
            setTaxAmount(res?.data);
            setConfirmation(res?.success);
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
    if (formVal?.ticket) {
      getDataOfAmountAndTax();
    }
  }, [trakker]);

  const trakkerQuantity = watch("quantity");
  useEffect(() => {
    setTaxAmount({});
    const getDataOfAmountAndTax = async () => {
      try {
        if (Number(formVal?.quantity) > 0 && formVal?.ticket) {
          setloading(true);

          const linktoTicketPurchase = ticketData.filter(
            (item) => item.id === formVal?.ticket
          );

          // API call to get the amount of tickets
          if (linktoTicketPurchase) {
            const res = await getTaxAndAmout(
              linktoTicketPurchase[0]?.id,
              Number(formVal?.quantity)
            );
            setTaxAmount(res?.data);
            setConfirmation(res?.success);
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

    if (Number(formVal?.quantity) > 0 && formVal?.ticket) {
      getDataOfAmountAndTax();
    }
  }, [trakkerQuantity]);

  if (error) {
    return <NotFound />;
  }

  const showTickets = false;

  return (
    <>
      <div className={Style.mainDiv}>
        <HeaderComponent />
        <div className={Style.dataContainer}>
          <div>
            <button className={Style.backButton} onClick={onLastPage}>
              {"< back"}
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
                    {/* {eventData
                      ? moment(eventData?.start_date).format("MMMM DD, YYYY")
                      : ""} */}
                    {DateTime.fromISO(eventData?.startDate).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </div>
                  <div className={Style.timing}>
                    {/* {eventData
                      ? moment(eventData?.start_date).format("ddd")
                      : ""}
                    ,{" "}
                    {eventData
                      ? moment(eventData?.start_date).format("hh:mm A")
                      : ""}{" "}
                    -{" "}
                    {eventData
                      ? moment(eventData?.end_date).format("hh:mm A")
                      : ""} */}
                    {`${DateTime.fromISO(eventData?.startDate).toLocaleString(
                      DateTime.TIME_SIMPLE
                    )} ${
                      eventData.endDate
                        ? " - " +
                          DateTime.fromISO(eventData?.endDate).toLocaleString(
                            DateTime.TIME_SIMPLE
                          )
                        : ""
                    }`}
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
                  <div className={Style.date}>{eventData?.venue}</div>
                  <div className={Style.timing}>
                    {eventData ? eventData?.address : ""}
                  </div>
                </div>
              </div>
              {/* boxes 3  */}
              <div
                className={Style.boxes}
                style={{
                  width: "90%",
                  cursor:
                    userInfo?.userData?.userId === eventData?.host?.id
                      ? "pointer"
                      : "auto",
                }}
                onClick={handleRedirectProfile}
              >
                <div
                  className={Style.producerDiv}
                  style={{ overflow: "hidden" }}
                >
                  <img
                    src={eventData?.host?.pic ? eventData.host.pic : proImg}
                    alt="producerIcon"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "opacity 0.3s ease-in-out",
                      opacity: eventData?.host?.pic ? 1 : 0.5, // Lower opacity for placeholder
                    }}
                  />
                </div>
                <div className={Style.producerInfo}>
                  <div className={Style.proName}>
                    {eventData ? eventData?.host?.firstName : ""}{" "}
                    {eventData ? eventData?.host?.lastName : ""}
                  </div>
                  <div className={Style.timing}>
                    {/* {eventData ? eventData?.eventProducer?.user_type : ""} */}
                    Producer
                  </div>
                </div>
              </div>
              <hr />

              {/* boxes 4 */}

              {/* //here we need to mapover the tickets array and need to make radio button available options */}

              {showTickets && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={Style.descDiv}
                >
                  <div className={Style.desc}>Ticket list</div>
                  {ticketData &&
                    ticketData?.map((ticketitem) => (
                      <div
                        key={ticketitem.id}
                        style={{
                          display: "flex",
                          gap: "8px",
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
                          // value={Number(ticketitem?.price)}
                          value={ticketitem?.id}
                          style={{ height: "18px" }}
                          disabled={
                            ticketitem?.max_quantity_to_show === 0 ||
                            eventData.cancelled
                              ? true
                              : false
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
                          className={Style.labelText}
                        >
                          {/* Label content here */}${ticketitem.price} -{" "}
                          {ticketitem.name}
                          {ticketitem?.max_quantity_to_show === 0 && (
                            <span
                              style={{
                                fontWeight: "600",
                                color: "red",
                                padding: "0 7px",
                                fontSize: "12px",
                              }}
                            >
                              -- sold out --
                            </span>
                          )}
                        </label>

                        {formVal.ticket === ticketitem.id && (
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
                      <div style={{ padding: "8px 0" }}>
                        <div className={Style.calcDiv}>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailLbl}`}
                          >
                            Sub Total
                          </p>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailVal}`}
                          >
                            $
                            {taxAmount?.sub_total
                              ? Number(taxAmount?.sub_total).toFixed(2)
                              : "0.00"}
                          </p>
                        </div>
                        <div className={Style.calcDiv}>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailLbl}`}
                          >
                            Platform Fee
                          </p>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailVal}`}
                          >
                            $
                            {taxAmount?.platformFee
                              ? taxAmount?.platformFee
                              : "0.00"}
                          </p>
                        </div>
                        <div className={Style.calcDiv}>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailLbl}`}
                          >
                            Sales Tax
                          </p>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailVal}`}
                          >
                            $
                            {taxAmount?.salesTax ? taxAmount?.salesTax : "0.00"}
                          </p>
                        </div>
                        <div className={Style.calcDiv}>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailLbl}`}
                          >
                            Payment Fee
                          </p>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailVal}`}
                          >
                            $
                            {taxAmount?.paymentFee
                              ? taxAmount?.paymentFee
                              : "0.00"}
                          </p>
                        </div>
                        {/* <div className={Style.calcDiv}>
                        <p className={`${Style.descDetail}`}>Ticket Price</p>
                        <p className={`${Style.descDetail}`}>
                          {taxAmount?.ticket_price} $
                        </p>
                      </div>
                      <div className={Style.calcDiv}>
                        <p className={`${Style.descDetail}`}>Quantity</p>
                        <p className={`${Style.descDetail}`}>
                          {taxAmount?.quantity}
                        </p>
                      </div> 
                      <div className={Style.calcDiv}>
                        <p className={`${Style.descDetail}`}>Service Tax</p>
                        <p className={`${Style.descDetail}`}>
                          {taxAmount?.service_tax}
                        </p>
                      </div>*/}
                        <hr />
                        <div className={Style.calcDiv}>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailLbl}`}
                          >
                            Total
                          </p>
                          <p
                            className={`${Style.descDetail} ${Style.descDetailVal}`}
                          >
                            ${taxAmount?.total ? taxAmount?.total : "0.00"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <hr />
                  {!eventData.hasOwnProperty("cancelled") && (
                    <button
                      type="submit"
                      className={Style.purchase}
                      style={{
                        marginTop: "10px",
                        pointerEvents: !confirmation ? "none" : "",
                      }}
                    >
                      {<span>BUY TICKET</span>}
                      <span className={Style.arrowIcon}>
                        <img src={arrow} alt="arrow" />
                      </span>
                    </button>
                  )}
                </form>
              )}
            </div>
            <div className={Style.right}>
              {eventData?.images?.length > 0 ? (
                <img
                  src={eventData.images[0]?.url}
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
                    {eventData?.details ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(eventData?.details),
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
      {showLoginDialog && (
        <UserConfirmDialog
          hideFunc={setShowLoginDialog}
          purchaseFunc={setShowPurchseDialog}
          setloadingFunc={setloading}
          setShowRegister={setShowRegister}
          setShowBillingInformation={setShowBillingInformation}
          setUserEmail={setUserEmail}
          setActivePurchaseStep={setActivePurchaseStep}
          handleZeroTicketNotLoggedIn={handleZeroTicketNotLoggedIn}
          taxAmount={taxAmount}
        />
      )}
      {taxAmount?.total > 0 && showPurchseDialog && (
        <Elements stripe={stripePromise}>
          <PurchaseModalDialog
            hideFunc={setShowPurchseDialog}
            purchaseTotal={taxAmount?.total}
            setloadingFunc={setloading}
            showRegister={showRegister}
            showBillingInformation={showBillingInformation}
            setShowBillingInformation={setShowBillingInformation}
            userEmail={userEmail}
            activePurchaseStep={activePurchaseStep}
            ticketFormVal={formVal}
            ticketData={ticketData}
          />
        </Elements>
      )}
    </>
  );
};

export default EventPage;
