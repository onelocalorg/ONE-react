import React from "react";
import style from "../Styles/Reset.module.css";
import ForgotinImage from "../images/Forgot.svg";
import ResetPass from "./ResetPass";
import HeaderComponent from "../Components/HeaderComponent";

const Reset = () => {
  return (
    <div className={style.mainDiv}>
      <HeaderComponent />
      <div className={style.formContainer}>
        <ResetPass />
      </div>
    </div>
  );
  // return (
  //   <div className={style.container}>
  //     <div className={style.mainDiv}>
  //       <div className={style.leftDiv}>
  //         <ResetPass />
  //       </div>
  //       <div className={style.rightDiv}>
  //         <img src={ForgotinImage} alt={"SignIn"} />
  //       </div>
  //     </div>{" "}
  //   </div>
  // );
};

export default Reset;
