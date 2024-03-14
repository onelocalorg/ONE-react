import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";
import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import ticketIcon from "../images/ticket-icon.png";
import payoutIcon from "../images/payout-icon.png";
import { adminToolUpdate, getPayout, singleEvents } from "../api/services";
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
import proImg from "../images/Oval Copy 5.png";
import arrow from "../images/Shape.svg";
import DateTimePicker from "../Components/DateTimePicker";
import InputComponent from "../Components/InputComponent";
import EditIcon from "../images/Edit icon.svg";
import TextAreaComponent from "../Components/TextAreaComponent";
import AddressMapApiComponent from "../Components/AddressMapApiComponent";
import AddSvg from "../images/Add.svg";
import ToasterSuccess from "../Components/ToasterSuccess";
import ModalComponent from "../Components/ModalCompnent";
import Card from "../Components/Card";
import locationPin from "../images/map-pin.svg";
import tent from "../images/Vector.png";
import "../App.css";
import CreateTicketComponent from "../Components/CreateTicketComponent";
import DatePickerHookForm from "../Components/DatePickerHookForm";
import ReactQuillEditor from "../Components/ReactQuillEditor";
import EditTicketComponent from "../Components/EditTicketComponent";
import Form from "react-bootstrap/Form";

const AdminToolsPage = () => {
  const { adminId } = useParams();
  //   console.log(adminId);
  const scrollToTop = useScrollToTop();
  const [eventData, setEventData] = useState({});
  const [ticketData, setTicketData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userInfo = useSelector((state) => state?.userInfo);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [addPayoutType, setAddPayoutType] = useState(null);

  const navigate = useNavigate();
  const onLastPage = () => {
    navigate("/my-events");
  };
  const schema = yup.object().shape({
    startDate: yup.string(),
    endDate: yup.string(),
    address: yup.string(),
    confirmationMail: yup.string(),
    mainAddress: yup.object(),
    full_address: yup.string(),
    aboutEvent: yup.string(),
    name: yup.string(),
    switch: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mainAddress: {},
      full_address: "",
    },
  });

  const formVal = watch();

  const [eventImage, setEventImage] = useState("");
  const [editTicketId, setEditTicketId] = useState("");
  const [eventImageToUpdate, setEventImageToUpdtate] = useState(null);
  const [payoutDetails, setPayoutDetails] = useState({});

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setEventImageToUpdtate(selectedFile);
      const [fileNameWithoutExtension] = selectedFile["name"].split(".");
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result);
      };

      // handleFileUpload(type, reader.result, fileNameWithoutExtension);
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    // Scroll to top as some time it shows in middle of after image section when comes to detail page
    scrollToTop();

    const fetchEventData = async () => {
      if (adminId) {
        try {
          setLoading(true);
          const response = await singleEvents(adminId);
          setEventData(response?.data);
          setTicketData(response?.data?.tickets);
          setValue("name", response?.data?.name);
          setValue("full_address", "");
          setValue("address", response?.data?.address);
          setValue("confirmationMail", response?.data?.email_confirmation_body);
          setValue("aboutEvent", response?.data?.about);
          setValue("start_date", new Date(response?.data?.start_date));
          setValue("end_date", new Date(response?.data?.end_date));
          setValue(
            "switch",
            response?.data?.event_type === "AO" ? true : false
          );
          setEventImage(response?.data?.event_image);
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
  }, [adminId]);
  useEffect(() => {
    // Scroll to top as some time it shows in middle of after image section when comes to detail page
    scrollToTop();

    const fetchEventData = async () => {
      if (adminId) {
        try {
          setLoading(true);
          const response = await getPayout(adminId);
          console.log(response?.data);
          setPayoutDetails(response?.data);
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
  }, [adminId]);

  const hideModalFunc = () => {
    setEditTicketId("");
  };

  console.log(errors);

  const onSubmit = async (data) => {
    setLoading(true);
    // const demoData = {
    //   lat: data.mainAddress?.geometry?.location.lat(),
    //   lng: data.mainAddress?.geometry?.location.lng(),
    //   place: data?.mainAddress?.formatted_address,
    // };
    // console.log(demoData);
    const toggleValue = data?.switch === false ? "VF" : "AO";
    // Convert the parsed date to ISO 8601 UTC format
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("event_type", toggleValue);
    formData.append("about", data.aboutEvent);
    formData.append("address", data.address);
    formData.append("email_confirmation_body", data.confirmationMail);
    formData.append("start_date", new Date(data.start_date).toISOString());
    formData.append("end_date", new Date(data.end_date).toISOString());
    formData.append(
      "full_address",
      Object.keys(data?.mainAddress || {}).length === 0
        ? "-"
        : `${data?.mainAddress?.formatted_address}`
      // : `${data.mainAddress?.name}, ${data?.mainAddress?.formatted_address}`
    );
    formData.append(
      "event_lat",
      Object.keys(data?.mainAddress || {}).length === 0
        ? "0"
        : `${data.mainAddress?.geometry.location.lat()}`
    );
    formData.append(
      "event_lng",
      Object.keys(data?.mainAddress || {}).length === 0
        ? "0"
        : `${data.mainAddress?.geometry.location.lng()}`
    );
    if (eventImageToUpdate && eventImageToUpdate !== null) {
      formData.append("event_image", eventImageToUpdate);
    }

    try {
      const res = await adminToolUpdate(adminId, formData); // Wait for the promise to resolve
      if (res.code === 200) {
        ToasterSuccess(`${res.message}`, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function showExpenseAdd() {
    setAddPayoutType("expense");
    setShowPayoutModal(true);
    console.log("Called showExpenseAdd");
  }

  function showPayoutAdd() {
    setAddPayoutType("payout");
    setShowPayoutModal(true);
    console.log("Called showPayoutAdd");
  }

  function hideFunc() {
    setShowPayoutModal(false);
  }

  const [showModalTicket, setShowModalTicket] = useState(false);

  const addNewTicketModalOpen = () => {
    setShowModalTicket((prev) => !prev);
  };

  if (error) {
    return <NotFound />;
  }

  const doCheckInCheck = () => {
    console.log("checkedin");
    ToasterSuccess("checkedin", 2000);
  };

  ///edit ticket modal form submit

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
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={Style.wrapper}>
            <div className={Style.left}>
              {/* //event name */}
              <button className={Style.adminToolBtn} type="button">
                <img
                  src={ticketIcon}
                  className={Style.adminToolBtnIcon}
                  alt="ticket"
                />
                {"Admin Tools"}
              </button>

              {/* <button
                className={Style.checkIns}
                type="button"
                onClick={doCheckInCheck}
              >
                {"Check Ins"}
              </button> */}
              <div className={Style.switchWraper}>
                <div className={Style.fontLabel}>Village Friendly</div>
                <label className={`${Style.toggleswitch}`}>
                  <InputComponent
                    type="checkbox"
                    className={`${Style.toggleswitchCheckbox}`}
                    register={register}
                    inputRef={"switch"}
                  />
                  <span className={`${Style.toggleswitchSlider}`}></span>
                </label>
                <div className={Style.fontLabel}>Adult Oriented</div>
              </div>

              <div className={Style.boxes}>
                <InputComponent
                  type={"text"}
                  className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.textBlack} ${Style.wfull} ${Style.eventName} ${Style.borderOutline} ${Style.borderRadius10} ${Style.paadingX7}`}
                  inputRef={"name"}
                  register={register}
                  placeholder={"event name"}
                />
              </div>
              {/* boxes 1  */}
              <div className={Style.boxes}>
                {/* <DateTimePicker date={date} setDate={getDate} /> */}
                <div
                  className={Style.iconDiv}
                  style={{ backgroundColor: "#db9791" }}
                >
                  <img src={calendarIcon} alt="calendar" />
                </div>
                <div
                  className={`${Style.infoDiv} ${Style.wfull} ${Style.bgGray}`}
                >
                  <div className={Style.date} style={{ color: "black" }}>
                    Start Date
                  </div>
                  {eventData?.start_date && (
                    <DatePickerHookForm
                      control={control}
                      className={`${Style.wfull} ${Style.bgTransparent}`}
                      name="start_date"
                      // maxDate={new Date(eventData.end_date)}
                      minDate={new Date()}
                    />
                  )}
                </div>
              </div>
              {/*box1.1*/}
              <div className={Style.boxes}>
                <div
                  className={Style.iconDiv}
                  style={{ backgroundColor: "#db9791" }}
                >
                  <img src={calendarIcon} alt="calendar" />
                </div>
                <div
                  className={`${Style.infoDiv} ${Style.wfull} ${Style.bgGray}`}
                >
                  <div className={Style.date} style={{ color: "black" }}>
                    End Date
                  </div>
                  {eventData?.end_date && (
                    <DatePickerHookForm
                      control={control}
                      className={`${Style.wfull} ${Style.bgTransparent}`}
                      // start_date={end_date}
                      name="end_date"
                      // maxDate={new Date(eventData?.end_date)}
                      minDate={new Date(formVal.start_date)}
                    />
                  )}
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
                <div
                  className={`${Style.infoDiv} ${Style.wfull} ${Style.paddingMargin0}`}
                  style={{ gap: "3px" }}
                >
                  {/* <div className={Style.date}>{eventData?.address}</div> */}
                  <InputComponent
                    type={"text"}
                    // disabled={true}
                    className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.borderOutline} ${Style.flexGrow1} ${Style.borderRadius10} ${Style.paadingX7}`}
                    inputRef={"address"}
                    register={register}
                    placeholder={"address"}
                  />

                  {/* <div className={Style.timing}>
                    {eventData ? eventData?.full_address : ""}
                  </div> */}
                  <AddressMapApiComponent
                    parentStyle={`${Style.flexGrow1}`}
                    inputRef={"mainAddress"}
                    setValue={setValue}
                    className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.textBlack} ${Style.wfull} ${Style.paadingX7} ${Style.borderOutline} ${Style.height} ${Style.borderRadius10}`}
                    placeholder={"Google Address"}
                  />
                </div>
              </div>
              <hr />

              <div className={`${Style.descDiv} refer`}>
                <div
                  className={`${Style.desc}`}
                  style={{ display: "flex", gap: "10px" }}
                  onClick={addNewTicketModalOpen}
                >
                  Tickets:{" "}
                  <div className={``} style={{ cursor: "pointer" }}>
                    <img src={AddSvg} alt="addIcon" />
                  </div>
                </div>

                {ticketData &&
                  ticketData?.map((ticketitem) => (
                    <div
                      key={ticketitem.id}
                      style={{
                        display: "flex",
                        gap: "3px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <label
                        htmlFor={ticketitem.id}
                        className={`${Style.labelText} ${Style.elipsisTicket}`}
                      >
                        {ticketitem.name} - ${ticketitem.price} - (
                        {`ends ${moment(ticketitem?.end_date).format(
                          "ddd, MMM D • h:mm A"
                        )}`}
                        )
                      </label>
                      <img
                        src={EditIcon}
                        alt="editIcon"
                        style={{ cursor: "pointer" }}
                        onClick={() => setEditTicketId(ticketitem.id)}
                      />
                    </div>
                  ))}
                <hr />
                <div className={Style.desc}>Confirmation Mail:</div>

                <ReactQuillEditor
                  control={control}
                  id={"confirmationMail"}
                  name={"confirmationMail"}
                  modules={{
                    toolbar: {
                      container: [
                        ["bold", "italic", "underline", "strike"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link"],
                        ["clean"],
                      ],
                    },
                  }}
                />
                <hr />
                <div className={Style.uniqueViewDiv}>
                  <div>
                    <div>Unique Views: 3</div>
                    <hr />
                  </div>
                </div>
                <div className={Style.financialSection}>
                  <div className={Style.financeLbl}>Financials</div>
                  <div>
                    <div className={Style.financeItem}>
                      <span>Revenue</span>
                      <span className={Style.itemAmt}>
                        ${payoutDetails?.revenue_amount}
                      </span>
                    </div>
                    <div className={Style.financeItem}>
                      <span>Expenses</span>
                      <span className={Style.itemAmt}>
                        ${payoutDetails?.total_expenses}
                      </span>
                    </div>
                    <div className={Style.financeItem}>
                      <span>Profit</span>
                      <span className={Style.itemAmt}>
                        ${payoutDetails?.total_profit}
                      </span>
                    </div>
                    <div
                      className={`${Style.financeItem} ${Style.payoutSection}`}
                    >
                      <span>Payouts</span>
                      <span className={Style.itemAmt}>
                        ${payoutDetails?.total_payout}
                      </span>
                    </div>
                    <div className={Style.financeItem}>
                      <span>Remaining</span>
                      <span className={Style.itemAmt}>
                        ${payoutDetails?.remaining_amount}
                      </span>
                    </div>
                    <div className={Style.sendPayoutSection}>
                      <span className={Style.itemAmt}>
                        <button className={Style.itemBtn} type="button">
                          <img
                            src={payoutIcon}
                            alt="payout"
                            className={Style.itemBtnIcon}
                          />
                          <span className={Style.itemBtnText}>
                            Send Payouts
                          </span>
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
                <hr />
                <button
                  type="submit"
                  className={Style.purchase}
                  style={
                    {
                      // marginTop: "10px",
                    }
                  }
                >
                  <span>SAVE EVENT</span>
                  <span className={Style.arrowIcon}>
                    <img src={arrow} alt="arrow" />
                  </span>
                </button>
              </div>
            </div>
            <div className={`${Style.right} ${Style.posRelative}`}>
              <label
                htmlFor="addImage"
                className={`${Style.top10} ${Style.left10} ${Style.posAbsolute}`}
                style={{ cursor: "pointer" }}
              >
                <img src={AddSvg} alt="addIcon" />
              </label>
              <input
                accept={"image/png, image/gif, image/jpeg"}
                id={"addImage"}
                className={`${Style.dNone}`}
                type="file"
                // ref={eventImageref}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
              {eventData?.event_image ? (
                <img
                  src={eventImage}
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
                      <ReactQuillEditor
                        id={"aboutEvent"}
                        control={control}
                        name={"aboutEvent"}
                        modules={{
                          toolbar: {
                            container: [
                              ["bold", "italic", "underline", "strike"],
                              [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                              ],
                              ["link", "image"],
                              ["clean"],
                            ],
                          },
                        }}
                      />
                    ) : (
                      "No description available"
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={Style.purchase}
                onClick={handleSubmit(onSubmit)}
                style={{
                  marginTop: "10px",
                  // pointerEvents: !confirmation ? "none" : "",
                }}
              >
                <span>SAVE EVENT</span>
                <span className={Style.arrowIcon}>
                  <img src={arrow} alt="arrow" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {showPayoutModal && (
        <PayoutModalDialog addPayoutType={addPayoutType} hideFunc={hideFunc} />
      )}
      {loading && <Loader />}
      {ticketData &&
        ticketData?.map((ticketitem) =>
          editTicketId === ticketitem.id ? (
            <ModalComponent
              key={ticketitem.id}
              hideFunc={hideModalFunc}
              show={ticketitem.id === editTicketId}
              // className={`${Style.wModal}`}
              wrapperClassname={` ${Style.wModal}`}
              header={
                <div className={`${Style.modalTicketHeader}`}>
                  <h2 className={`${Style.headerTitle}`}>Edit Ticket</h2>
                  <div className={`${Style.pointernone} ${Style.cardWrapper}`}>
                    <Card
                      eventId={adminId}
                      key={0}
                      tent={tent}
                      img={eventData?.event_image}
                      start_date={eventData?.start_date}
                      name={eventData?.name}
                      full_address={eventData?.full_address}
                      locationPin={locationPin}
                      ticket={eventData?.tickets}
                      address={eventData?.address}
                      start_date_label={eventData?.start_date_label}
                      start_time_label={eventData?.start_time_label}
                      eventProducer={eventData?.eventProducer}
                    />
                  </div>
                </div>
              }
              body={
                <EditTicketComponent
                  ticketitem={ticketitem}
                  adminId={adminId}
                  Style={Style}
                  eventData={eventData}
                  hideModal={hideModalFunc}
                  setTicketData={setTicketData}
                />
              }
            />
          ) : (
            ""
          )
        )}
      <ModalComponent
        hideFunc={addNewTicketModalOpen}
        show={showModalTicket}
        // className={`${Style.wModal}`}
        wrapperClassname={` ${Style.wModal}`}
        header={
          <div className={`${Style.modalTicketHeader}`}>
            <h2 className={`${Style.headerTitle}`}>Add Ticket</h2>
            <div className={`${Style.pointernone} ${Style.cardWrapper}`}>
              <Card
                eventId={adminId}
                key={0}
                tent={tent}
                img={eventData?.event_image}
                start_date={eventData?.start_date}
                name={eventData?.name}
                full_address={eventData?.full_address}
                locationPin={locationPin}
                ticket={eventData?.tickets}
                address={eventData?.address}
                start_date_label={eventData?.start_date_label}
                start_time_label={eventData?.start_time_label}
                eventProducer={eventData?.eventProducer}
              />
            </div>
          </div>
        }
        body={
          <CreateTicketComponent
            adminId={adminId}
            Style={Style}
            eventData={eventData}
            hideModal={addNewTicketModalOpen}
            setTicketData={setTicketData}
          />
        }
      />
    </>
  );
};

export default AdminToolsPage;
