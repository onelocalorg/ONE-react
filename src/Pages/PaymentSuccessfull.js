import React, { useEffect } from "react";
import img from "../images/payment_done.svg";
import Style from "../Styles/payment.module.css";
import { useNavigate } from "react-router-dom";

const PaymentSuccessfull = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, [navigate]);

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className={Style.container}>
      <img src={img} alt="done" className={Style.img} />
      <div className={Style.msg}>
        Your Payment has been processed successfully..
      </div>
      <div className={Style.naviagte}>
        Page will be automatically redirected to the main page or click button
        below
      </div>
      <button className={Style.btn} onClick={handleNavigate}>
        Main Page
      </button>
    </div>
  );
};

export default PaymentSuccessfull;
