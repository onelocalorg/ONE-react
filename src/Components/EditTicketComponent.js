import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import saveBtn from "../images/Change Button.svg";
import {
  adminToolUpdate,
  createTicket,
  singleEvents,
  updateTicket,
} from "../api/services";
import ToasterComponent from "./ToasterComponent";
import DatePickerHookForm from "./DatePickerHookForm";
import calender from "../images/calender.svg";
import Loader from "./Loader";
import ToasterSuccess from "./ToasterSuccess";

const EditTicketComponent = ({
  Style,
  hideModal,
  eventData,
  adminId,
  ticketitem,
  setTicketData,
}) => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string(),
    quantity: yup.number(),
    start_date: yup.string(),
    end_date: yup.string(),
    price: yup.string(),
  });

  const ticketData = ticketitem && ticketitem;

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
      name: ticketData?.name,
      quantity: ticketData?.quantity,
      price: ticketData?.price,
      start_date: new Date(ticketData?.start_date),
      end_date: new Date(ticketData?.end_date),
    },
  });

  const editTicketHandle = async (dataOfCreateFrom) => {
    if (dataOfCreateFrom.price) {
      const numberString = dataOfCreateFrom.price.toString();
      const isFloat = /^\d+(\.\d+)?$/.test(numberString);

      const isNumber = Number.isInteger(dataOfCreateFrom.price);

      if ((isFloat || isNumber) === false) {
        ToasterComponent(
          "you can't enter price value other than numbers",
          2000
        );
      }
    }

    setLoading(true);
    try {
      const dataToCreate = {
        ...dataOfCreateFrom,
        start_date: new Date(dataOfCreateFrom?.start_date).toISOString(),
        end_date: new Date(dataOfCreateFrom?.end_date).toISOString(),
        price: `${dataOfCreateFrom?.price}`,
      };

      const res = await updateTicket(ticketitem?.id, dataToCreate);
      if (res.code === 200) {
        const response = await singleEvents(adminId);
        setTicketData(response?.data?.tickets);
        ToasterSuccess("Ticket Updated Successfully", 2000);
        hideModal();
      } else if (res.success === false || res.code === "false") {
        ToasterComponent(`${res.message}`, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(errors);

  return (
    <>
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
              // start_date={start_date}
              // setStartDate={setStartDate}
              // endDate={eventData.end_date}
              name="start_date"
              maxDate={new Date(eventData.end_date)}
              minDate={new Date(eventData.start_date)}
            />
            {/* <div>to</div> */}
            <DatePickerHookForm
              control={control}
              className={`${Style.wfull}`}
              // start_date={end_date}
              // setStartDate={setEndDate}
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
            // type={"number"}
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
      {loading && <Loader />}
    </>
  );
};

export default EditTicketComponent;
