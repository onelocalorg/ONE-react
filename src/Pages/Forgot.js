import React from "react";
import style from "../Styles/Forgot.module.css";
import ForgotForm from "./ForgotForm";
import ForgotinImage from "../images/Forgot.svg";
import HeaderComponent from "../Components/HeaderComponent";

const Forgot = () => {
  return (
    <div className={style.mainDiv}>
      <HeaderComponent />
      <div className={style.formContainer}>
        <ForgotForm />
      </div>
    </div>
  );

  // return (
  //   <div className={style.container}>
  //     <div className={style.mainDiv}>
  //       <div className={style.leftDiv}>
  //         <ForgotForm />
  //       </div>
  //       <div className={style.rightDiv}>
  //         <img src={ForgotinImage} alt="SignIn" />
  //       </div>
  //     </div>{" "}
  //   </div>
  // );
};

export default Forgot;
