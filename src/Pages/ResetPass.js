import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/ForgotForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterComponent from "../Components/ToasterComponent";
import { resetApi } from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useLocation, useNavigate } from "react-router-dom";

const ResetPass = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorMsg = Object.values(errors).map((item) => item.message);
  useEffect(() => {
    errorMsg.map((i) => ToasterComponent(i));
  }, [errorMsg]);

  const navigate = useNavigate();

  const location = useLocation();
  let token = location.search;
  let final_token = token.replace("?token=", "").trim();

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      ToasterSuccess("Password Changed", 2000);
      resetApi(final_token, data);
      navigate("/login");
    }
    else {
      ToasterComponent("Password Not Matched", 2000)
    }
  };

  const EyeToggleButton = ({ show, setShow }) => (
    <button
      className={style.passIcon}
      type="button"
      onClick={() => setShow(prev => !prev)}
    >
      {!show ? <AiOutlineEyeInvisible className="eye" /> : <AiOutlineEye className="eye" />}
    </button>
  );

  return (
    <div className={style.loginForm}>
      <div>
        <h2 className={style.h2}>Reset Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>

        <div className={style.inputWrapper}>
          <InputComponent
            type={show ? "text" : "password"}
            placeholder={"Create Password"}
            register={register}
            inputRef={"password"}
            registerOptions={{
              required: "Enter Create Password",
              minLength: 6,
              maxLength: 12,
            }}
          />
          <EyeToggleButton show={show} setShow={setShow} />
        </div>

        <div className={style.inputWrapper}>
          <InputComponent
            type={showConfirm ? "text" : "password"}
            placeholder={"Confirm Password"}
            register={register}
            inputRef={"confirmPassword"}
            registerOptions={{
              required: "Enter Confirm Password",
              minLength: 6,
              maxLength: 12,
            }}
          />
          <EyeToggleButton show={showConfirm} setShow={setShowConfirm} />
        </div>


        <ButtonComponent type={"submit"} cta={"Submit"} />
      </form>

    </div>
  );
}

export default ResetPass;
