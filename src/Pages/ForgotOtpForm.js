import React, { useState } from "react";

import { IoChevronBackSharp } from "react-icons/io5";

import style from "../Styles/ForgotOtpForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterError from "../Components/ToasterComponent";
import { submitOtpApi } from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../Components/Loader";
import OtpInput from "react-otp-input";

const ForgotOtpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const numInputs = 6;

  const location = useLocation();
  let tokenParam = location.search;
  let finalToken = tokenParam.replace("?token=", "").trim();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < numInputs) {
      setIsSubmitted(true);
      return;
    }

    setIsLoading(true);
    setIsSubmitted(false);

    try {
      const response = await submitOtpApi({ otp, otpUniqueKey: finalToken });
      if (response?.success) {
        ToasterSuccess(response?.message || "", 3000);
        navigate(`/reset-password?token=${finalToken}`);
      } else {
        ToasterError(response?.message || "", 2500);
      }
    } catch (error) {
      ToasterError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (otp) => {
    setOtp(otp);
  };

  return (
    <div className={style.loginForm}>
      <div>
        <h2 className={style.h3}>Enter OTP</h2>
      </div>

      <form className={style.formBox} onSubmit={handleFormSubmit}>
        <div className={style.inputWrapper}>
          <OtpInput
            value={otp}
            onChange={handleOTPChange}
            numInputs={numInputs}
            renderSeparator={<span> </span>}
            renderInput={(props) => (
              <input {...props} className={style.otpInput} />
            )}
            // shouldAutoFocus
          />
          <div>
            {isSubmitted && otp.length < numInputs && (
              <div role="alert" className={style.error}>
                All digits are required
              </div>
            )}
          </div>
        </div>
        <div className={style.ButtonLink}>
          <ButtonComponent type="submit" cta="Submit" />
          <span>
            <Link className={style.loginLink} to={"/login"}>
              <IoChevronBackSharp className={style.backIcon} />
              Back to Login
            </Link>
          </span>
        </div>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default ForgotOtpForm;
