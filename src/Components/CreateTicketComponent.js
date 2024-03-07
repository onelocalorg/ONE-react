import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import saveBtn from "../images/Change Button.svg";
import { adminToolUpdate, createTicket } from "../api/services";
import ToasterComponent from "./ToasterComponent";
import DatePickerHookForm from "./DatePickerHookForm";
import calender from "../images/calender.svg";
import ToasterSuccess from "./ToasterSuccess";

const CreateTicketComponent = ({
  Style,
  setLoading,
  hideModal,
  eventData,
  adminId,
}) => {
  const schema = yup.object().shape({
    name: yup.string(),
    quantity: yup.number(),
    // start_date: yup.string(),
    // end_date: yup.string(),
    price: yup.number(),
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
    defaultValues: {},
  });

  // const formval = watch("start_date");
  // console.log(formval);

  // console.log(eventData);
  // console.log(eventData?.location?.coordinates[0]);
  // console.log(eventData?.location?.coordinates[1]);

  const [start_date, setStartDate] = useState(new Date(eventData?.start_date));
  const [end_date, setEndDate] = useState(new Date(eventData?.end_date));
  // console.log(
  //   new Date(start_date).toISOString(),
  //   new Date(end_date).toISOString()
  // );
  const editTicketHandle = (dataOfCreateFrom) => {
    // console.log(dataOfCreateFrom);
    dataOfCreateFrom.start_date = new Date(start_date);
    dataOfCreateFrom.end_date = new Date(end_date);
    try {
      setLoading(true);
      if (dataOfCreateFrom) {
        createTicket(dataOfCreateFrom).then((res) => {
          console.log(res?.data?.id);
          const id = res?.data?.id;
          const formData = new FormData();
          formData.append("tickets", `${id}`);
          formData.append(
            "event_lng",
            `${eventData?.location?.coordinates[0]}`
          );
          formData.append(
            "event_lat",
            `${eventData?.location?.coordinates[1]}`
          );
          try {
            adminToolUpdate(adminId, formData).then((res) => {
              console.log(res);
              if (res.code === 200) {
                ToasterSuccess(`${res.message}`, 2000);
                hideModal();
              }
              if (res.success === false || res.code === "false") {
                ToasterComponent(`${res.message}`, 2000);
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(editTicketHandle)}
      className={`${Style.formTicketEdit}`}
    >
      <div className={`${Style.boxWrapper}`}>
        <h2 className={`${Style.editTicketHeader}`}>Ticket Name</h2>
        <InputComponent
          type={"text"}
          className={`${Style.inputStyliing}`}
          inputRef={"name"}
          register={register}
          placeholder={"Ticket Name"}
        />
      </div>
      <div className={`${Style.boxWrapper}`}>
        <h2 className={`${Style.editTicketHeader}`}>Ticket Timeframe</h2>
        {/* //calender */}
        <div className={`${Style.datePickerWrapper}`}>
          <img src={calender} alt="calender" />
          <DatePickerHookForm
            control={control}
            className={`${Style.wfull}`}
            start_date={start_date}
            setStartDate={setStartDate}
            endDate={eventData.end_date}
            name="start_date"
            maxDate={new Date(eventData.end_date)}
            minDate={new Date(eventData.start_date)}
          />
          {/* <div>to</div> */}
          <DatePickerHookForm
            control={control}
            className={`${Style.wfull}`}
            start_date={end_date}
            setStartDate={setEndDate}
            name="end_date"
            maxDate={new Date(eventData.end_date)}
            minDate={new Date(eventData.start_date)}
          />
        </div>
      </div>
      <div className={`${Style.boxWrapper}`}>
        <h2 className={`${Style.editTicketHeader}`}>Ticket Quantity</h2>
        <InputComponent
          type={"text"}
          className={`${Style.inputStyliing}`}
          inputRef={"quantity"}
          register={register}
          placeholder={"Ticket Quantity"}
        />
      </div>
      <div className={`${Style.boxWrapper} ${Style.currencyDiv}`}>
        <h2 className={`${Style.editTicketHeader}`}>Ticket Price</h2>
        <p className={`${Style.currency}`}>$</p>
        <InputComponent
          type={"number"}
          className={`${Style.inputStyliing}`}
          inputRef={"price"}
          register={register}
          placeholder={"Ticket Price"}
        />
      </div>
      <button className={Style.saveBtn} type="submit">
        Save
        <span className={Style.saveIcon}>
          <img src={saveBtn} alt="saveIcon" />
        </span>
      </button>
    </form>
  );
};

export default CreateTicketComponent;
