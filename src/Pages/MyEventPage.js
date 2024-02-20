import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import ticketIcon from "../images/ticket-icon.png";
import payoutIcon from "../images/payout-icon.png";
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
import ExpenseItemComponent from "../Components/ExpenseItemComponent";
import FinanceAddBtn from "../Components/FinanceAddBtn";
import PayoutModalDialog from "../Components/PayoutModalDialog";

const MyEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const scrollToTop = useScrollToTop();
  const userInfo = useSelector((state) => state?.userInfo);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [addPayoutType, setAddPayoutType] = useState(null);

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

  function showExpenseAdd() {
    setAddPayoutType("expense");
    // setShowPayoutModal(true);
    console.log("Called showExpenseAdd");
  }

  function showPayoutAdd() {
    setAddPayoutType("payout");
    // setShowPayoutModal(true);
    console.log("Called showPayoutAdd");
  }

  function hideFunc() {
    setShowPayoutModal(false);
  }

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
              <div className={Style.uniqueViewDiv} style={{ display: "none" }}>
                <div>
                  <div>Unique Views: 3</div>
                  <hr />
                </div>
              </div>
              <div
                className={Style.financialSection}
                style={{ display: "none" }}
              >
                <div className={Style.financeLbl}>Financials</div>
                <div>
                  <div className={Style.financeItem}>
                    <span>Revenue</span>
                    <span className={Style.itemAmt}>$10</span>
                  </div>
                  <div className={Style.financeItem}>
                    <span>Expenses</span>
                    <span className={Style.itemAmt}>$0</span>
                  </div>
                  <div className={Style.financeItem}>
                    <span>Profit</span>
                    <span className={Style.itemAmt}>$10.00</span>
                  </div>
                  <div
                    className={`${Style.financeItem} ${Style.payoutSection}`}
                  >
                    <span>Payouts</span>
                    <span className={Style.itemAmt}>$6</span>
                  </div>
                  <div className={Style.financeItem}>
                    <span>Remaining</span>
                    <span className={Style.itemAmt}>$4.00</span>
                  </div>
                  <div className={Style.sendPayoutSection}>
                    <span className={Style.itemAmt}>
                      <button className={Style.itemBtn}>
                        <img
                          src={payoutIcon}
                          alt="payout"
                          className={Style.itemBtnIcon}
                        />
                        <span className={Style.itemBtnText}>Send Payouts</span>
                      </button>
                      <div className={Style.payNoteText}>
                        Payout can be sent 3 days after the event. All refunds
                        must happen within this time before a payout can be
                        sent.
                      </div>
                    </span>
                  </div>
                </div>
                <div className={Style.listContainer}>
                  <div>
                    <div className={Style.listHead}>Expenses</div>
                    <div className={Style.noExpense}>No expenses yet</div>
                    <ExpenseItemComponent
                      title={"Bob Jones (sound gear)"}
                      subTitle1={`Payout for Garden Party`}
                      subTitle2={`on July 14, 2023`}
                    />
                    <FinanceAddBtn addAction={showExpenseAdd} />
                    <div className={Style.expenseItemTotalLine}></div>
                    <div className={Style.expenseItemTotal}>$0.00</div>
                  </div>
                  <div className={Style.payoutItemSection}>
                    <div>Payouts</div>
                    <ExpenseItemComponent
                      title={"Bob Jones (sound gear)"}
                      subTitle1={`Payout for Garden Party`}
                      subTitle2={`on July 14, 2023`}
                      itemAmt={"5.00"}
                    />
                    <ExpenseItemComponent
                      title={"Bob Jones (sound gear)"}
                      subTitle1={`Payout for Garden Party`}
                      subTitle2={`on July 14, 2023`}
                      itemAmt={""}
                    />
                    <FinanceAddBtn addAction={showPayoutAdd} />
                    <div className={Style.expenseItemTotalLine}></div>
                    <div className={Style.expenseItemTotal}>$6.00</div>
                  </div>
                </div>
              </div>
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
      {showPayoutModal && (
        <PayoutModalDialog addPayoutType={addPayoutType} hideFunc={hideFunc} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default MyEventPage;
