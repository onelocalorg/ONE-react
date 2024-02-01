import React from "react";
import style from "../Styles/ForgotOtp.module.css";
import ForgotOtpForm from "./ForgotOtpForm";
import HeaderComponent from "../Components/HeaderComponent";

const ForgotOtp = () => {
  return (
    <div className={style.mainDiv}>
      <HeaderComponent />
      <div className={style.formContainer}>
        <ForgotOtpForm />
      </div>
    </div>
  );
};

export default ForgotOtp;
