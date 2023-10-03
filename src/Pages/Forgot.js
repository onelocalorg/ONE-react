import React from "react";
import style from "../Styles/Forgot.module.css";
import ForgotForm from "./ForgotForm";
import ForgotinImage from '../images/Forgot.svg'

const Forgot = () => {
  return (
    <div className={style.container}>
      <div className={style.mainDiv}>
        <div className={style.leftDiv}>
          <ForgotForm />
        </div>
        <div className={style.rightDiv}>
          <img src={ForgotinImage} alt="SignIn" />
        </div>
      </div>{" "}
    </div>
  );
};

export default Forgot;
