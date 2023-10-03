import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/ForgotForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterComponent from "../Components/ToasterComponent";
import { forgotApi } from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";

const ForgotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mail, setMail] = useState("");

  const onSubmit = (data) => {
    forgotApi(data);
    setMail(data.email);
    ToasterSuccess("Mail sent", 1000);
  };

  const errorMessages = Object.values(errors).map(({ message }) => message);

  const renderSuccessMessage = mail !== "" && (
    <p className={style.notify}>
      Check your mail <span>{mail}</span> and reset your password.
    </p>
  );

  useEffect(() => {
    errorMessages.forEach((errorMessage) => ToasterComponent(errorMessage));
  }, [errorMessages]);

  return (
    <div className={style.loginForm}>
      <div>
        <h2 className={style.h2}>Forgot Password</h2>
      </div>
      {renderSuccessMessage || (
        <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
          <InputComponent
            type="email"
            placeholder="Enter email id"
            register={register}
            inputRef="email"
            registerOptions={{
              required: "Enter Valid Email",
              maxLength: 80,
            }}
          />
          <ButtonComponent type="submit" cta="Submit" />
        </form>
      )}
    </div>
  );
};

export default ForgotForm;
