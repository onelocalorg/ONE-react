import React, { useEffect } from "react";
import img from "../images/payment_failed.svg";
import Style from "../Styles/payment.module.css";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 7000);
  }, [navigate]);
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className={Style.container}>
      <img src={img} alt="failed" className={Style.img} />
      <div className={Style.msg} style={{ color: "red" }}>
        Your Payment has been failed
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

export default PaymentFailed;
