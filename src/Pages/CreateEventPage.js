import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import calendarIcon from "../images/Group 33778.svg";
import locationIcon from "../images/Group 18184.svg";
import ticketIcon from "../images/ticket-icon.png";
import Card from "../Components/Card";
import locationPin from "../images/map-pin.svg";
import tent from "../images/Vector.png";

import { createTicketApi } from "../api/services";
import Style from "../Styles/MyEventPage.module.css";
import Loader from "../Components/Loader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ToasterError from "../Components/ToasterComponent";
import NotFound from "./NotFound";
import { useScrollToTop } from "../hooks/useScrollToTop";
import HeaderComponent from "../Components/HeaderComponent";
import { PrivateComponent } from "../Components/PrivateComponent";
import { useSelector } from "react-redux";
import arrow from "../images/Shape.svg";

import InputComponent from "../Components/InputComponent";
import EditIcon from "../images/Edit icon.svg";

import AddressMapApiComponent from "../Components/AddressMapApiComponent";
import AddSvg from "../images/Add.svg";
import ToasterSuccess from "../Components/ToasterSuccess";
import "../App.css";
import CreateTicketComponent from "../Components/CreateTicketComponent";
import DatePickerHookForm from "../Components/DatePickerHookForm";
import ReactQuillEditor from "../Components/ReactQuillEditor";
import EditTicketComponent from "../Components/EditTicketComponent";
import ModalComponent from "../Components/ModalCompnent";
import CreateTicketCreateFlowCmp from "../Components/CreateTicketCreateFlowCmp";
import EditTicketCreateFlowCmp from "../Components/EditTicketCreateFlowCmp";
import ToasterComponent from "../Components/ToasterComponent";

const CreateEventPage = () => {
  const [ticketData, setTicketData] = useState([]);
  const [AddressValue, setAddressValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const navigate = useNavigate();

  const state = useSelector(
    (state) => state?.userInfo?.userData?.isEventActiveSubscription
  );

  useEffect(() => {
    if (state === false) {
      navigate("/");
    }
  }, [state]);
  const onLastPage = () => {
    navigate("/my-events");
  };
  const schema = yup.object().shape({
    start_date: yup.string(),
    end_date: yup.string(),
    address: yup.string().required("Address is Required"),
    confirmationMail: yup.string(),
    mainAddress: yup.object(),
    full_address: yup.string(),
    aboutEvent: yup.string(),
    name: yup.string().required("Event Name Required"),
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
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      aboutEvent: "",
      confirmationMail: "",
    },
  });
  useEffect(() => {
    const errorMsg = Object.values(errors).map((item) => item?.message);

    errorMsg.slice(0, 1).forEach((errorMessage) => {
      ToasterComponent(errorMessage, 3000);
    });
  }, [errors]);

  const startDateInstance = watch("start_date");
  const endDateInstance = watch("end_date");

  const [eventImage, setEventImage] = useState("");
  const [editTicketId, setEditTicketId] = useState("");
  const [eventImageToUpdate, setEventImageToUpdate] = useState(null);
  const [showModalTicket, setShowModalTicket] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setEventImageToUpdate(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImage(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const hideModalFunc = () => {
    setEditTicketId("");
  };

  const onSubmit = async (data) => {
    if (eventImageToUpdate === null) {
      ToasterComponent("Event Image is Mandatory", 2000);
    } else {
      setLoading(true);
      const toggleValue = data?.switch === false ? "VF" : "AO";
      // Convert the parsed date to ISO 8601 UTC format
      const idArray = ticketData.map((item) => item.id).join(",");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("tickets", idArray);
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
        const res = await createTicketApi(formData); // Wait for the promise to resolve
        if (res.success) {
          ToasterSuccess(`${res.message}`, 2000);
          navigate("/my-events");
        } else {
          ToasterError(`${res.message}`, 2000);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onChangeAddress = (event) => {
    setAddressValue(event.target.value);
  };

  const onLocationSelect = (value) => {
    setAddressValue(value);
  };
  function hideFunc() {
    setShowPayoutModal(false);
  }

  const addNewTicketModalOpen = () => {
    setShowModalTicket((prev) => !prev);
  };

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      <div className={Style.mainDiv}>
        <PrivateComponent />
        <HeaderComponent isCreateEventEnabled={state} />
        <div className={Style.dataContainer}>
          <div className={Style.btnDiv}>
            <button className={Style.backButton} onClick={onLastPage}>
              {"< back"}
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={Style.wrapper}>
            <div className={Style.left}>
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
                  placeholder={"Event name"}
                />
              </div>
              {/* boxes 1  */}
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
                    Start Date
                  </div>

                  <DatePickerHookForm
                    control={control}
                    className={`${Style.wfull} ${Style.bgTransparent}`}
                    name="start_date"
                    minDate={new Date()}
                  />
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

                  <DatePickerHookForm
                    control={control}
                    className={`${Style.wfull} ${Style.bgTransparent}`}
                    name="end_date"
                    minDate={new Date()}
                  />
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
                  <InputComponent
                    type={"text"}
                    className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.borderOutline} ${Style.flexGrow1} ${Style.borderRadius10} ${Style.paadingX7}`}
                    inputRef={"address"}
                    register={register}
                    placeholder={"address"}
                  />

                  <AddressMapApiComponent
                    value={AddressValue}
                    parentStyle={`${Style.flexGrow1}`}
                    inputRef={"mainAddress"}
                    setValue={setValue}
                    className={`${Style.timing} ${Style.outline} ${Style.bgGray} ${Style.textBlack} ${Style.wfull} ${Style.paadingX7} ${Style.borderOutline} ${Style.height} ${Style.borderRadius10}`}
                    placeholder={"Google Address"}
                    onChangeAddress={onChangeAddress}
                    onLocationSelect={onLocationSelect}
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
              {eventImage ? (
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
                </div>
              }
              body={
                <EditTicketCreateFlowCmp
                  ticketitem={ticketitem}
                  Style={Style}
                  hideModal={hideModalFunc}
                  startDateInstance={startDateInstance}
                  endDateInstance={endDateInstance}
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
        wrapperClassname={` ${Style.wModal}`}
        header={
          <div className={`${Style.modalTicketHeader}`}>
            <h2 className={`${Style.headerTitle}`}>Add Ticket</h2>
          </div>
        }
        body={
          <CreateTicketCreateFlowCmp
            Style={Style}
            hideModal={addNewTicketModalOpen}
            setTicketData={setTicketData}
            startDateInstance={startDateInstance}
            endDateInstance={endDateInstance}
            ticketData={ticketData}
          />
        }
      />
      {loading && <Loader />}
    </>
  );
};

export default CreateEventPage;
