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

const CreateTicketCreateFlowCmp = ({
  Style,
  hideModal,
  setTicketData,
  endDateInstance,
  startDateInstance,
  ticketData,
}) => {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup.string(),
    quantity: yup.number(),
    start_date: yup.string(),
    end_date: yup.string(),
    // price: yup.number(),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      start_date: new Date(startDateInstance),
      end_date: new Date(endDateInstance),
    },
  });
  const formVal = watch();
  console.log(errors, "errors");
  console.log(formVal);

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

      if (createResponse.code === 201) {
        ToasterSuccess(`${createResponse.message}`, 2000);
        // const response = await singleEvents(adminId);
        setTicketData([...ticketData, createResponse?.data]);
        hideModal();
      } else if (
        createResponse.success === false ||
        createResponse.code === "false"
      ) {
        ToasterComponent(`${createResponse.message}`, 2000);
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
              maxDate={new Date(endDateInstance)}
              minDate={new Date(startDateInstance)}
            />
            {/* <div>to</div> */}
            <DatePickerHookForm
              control={control}
              className={`${Style.wfull}`}
              // start_date={end_date}
              // setStartDate={setEndDate}
              name="end_date"
              maxDate={new Date(endDateInstance)}
              minDate={new Date(formVal?.start_date)}
            />
          </div>
        </div>
        <div className={`${Style.boxWrapper}`}>
          <h2 className={`${Style.editTicketHeader}`}>Ticket Quantity</h2>
          <InputComponent
            type={Text}
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

export default CreateTicketCreateFlowCmp;
