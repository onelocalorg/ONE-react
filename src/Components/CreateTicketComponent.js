import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import saveBtn from "../images/Change Button.svg";
import { adminToolUpdate, createTicket, singleEvents } from "../api/services";
import ToasterComponent from "./ToasterComponent";
import DatePickerHookForm from "./DatePickerHookForm";
import calender from "../images/calender.svg";
import ToasterSuccess from "./ToasterSuccess";
import Loader from "./Loader";

const CreateTicketComponent = ({
  Style,
  hideModal,
  eventData,
  adminId,
  setTicketData,
  ticketData,
}) => {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string(),
    quantity: yup.number(),
    start_date: yup.string(),
    end_date: yup.string(),
    price: yup.number(),
  });

  const data = eventData || {};
  // const ticketData = eventData && eventData?.tickets;
  const idArray = ticketData.map((item) => item.id).join(",");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      start_date: new Date(data?.start_date),
      end_date: new Date(data?.end_date),
    },
  });

  const createTicketHandle = async (dataOfCreateFrom) => {
    // Early return if dataOfCreateFrom is not provided
    setLoading(true); // Start loading

    try {
      const dataToCreate = {
        ...dataOfCreateFrom,
        start_date: new Date(dataOfCreateFrom?.start_date).toISOString(),
        end_date: new Date(dataOfCreateFrom?.end_date).toISOString(),
      };

      // Await the creation of the ticket
      const createResponse = await createTicket(dataToCreate);

      if (
        createResponse.success === false ||
        createResponse.success === "false"
      ) {
        ToasterComponent(`${createResponse.message}`, 4000);
        return;
      }
      // Construct the new ID list
      const id = idArray
        ? idArray + "," + createResponse?.data?.id
        : createResponse?.data?.id;
      const formData = new FormData();
      formData.append("tickets", `${id}`);
      formData.append("event_lng", `${eventData?.location?.coordinates[0]}`);
      formData.append("event_lat", `${eventData?.location?.coordinates[1]}`);

      // Await the admin tool update
      const updateResponse = await adminToolUpdate(adminId, formData);

      if (updateResponse.code === 200) {
        ToasterSuccess(`${updateResponse.message}`, 2000);
        const response = await singleEvents(adminId);
        setTicketData(response?.data?.tickets);
        hideModal();
      } else if (
        updateResponse.success === false ||
        updateResponse.code === "false"
      ) {
        ToasterComponent(`${updateResponse.message}`, 2000);
      }
    } catch (error) {
      console.error(error);
      ToasterComponent("An error occurred.", 2000);
    } finally {
      setLoading(false); // End loading
    }
  };

  // console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(createTicketHandle)}
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

export default CreateTicketComponent;
