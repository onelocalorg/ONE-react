import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/ResetForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterError from "../Components/ToasterComponent";
import { resetPasswordApi } from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import defaultStyle from "../Styles/InputComponent.module.css";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import Loader from "../Components/Loader";

const ResetPass = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(8, "password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Password must contain at least 1 letter and 1 number"
      ),
    confirmpassword: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .oneOf([yup.ref("password")], "Password do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const location = useLocation();
  let token = location.search;
  let finalToken = token.replace("?token=", "").trim();

  const onSubmit = async (data) => {
    if (data.password === data.confirmpassword) {
      setIsLoading(true);
      try {
        const response = await resetPasswordApi(finalToken, {
          password: data?.password,
        });

        if (response?.success) {
          ToasterSuccess(response?.message || "", 1500);
          navigate("/login");
        } else {
          ToasterError(response?.message || "", 1500);
        }
      } catch (error) {
        ToasterError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    } else {
      ToasterError("Password Not Matched", 2000);
    }
  };

  const EyeToggleButton = ({ show, setShow }) => (
    <button
      className={style.passIcon}
      type="button"
      onClick={() => setShow((prev) => !prev)}
    >
      {show ? (
        <AiOutlineEyeInvisible className="eye" />
      ) : (
        <AiOutlineEye className="eye" />
      )}
    </button>
  );

  return (
    <div className={style.loginForm}>
      <div>
        <h2 className={style.h3}>Reset Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
        <div className={style.inputWrapper}>
          <InputComponent
            type={show ? "text" : "password"}
            placeholder={"New Password"}
            register={register}
            inputRef={"password"}
            name={"password"}
            registerOptions={{
              required: "Enter Create Password",
              minLength: 6,
              maxLength: 12,
            }}
            className={defaultStyle.input}
          />
          <EyeToggleButton show={show} setShow={setShow} />
          {errors.password &&
            (errors.password.type === "required" ||
              errors.password.type === "min" ||
              errors.password.type === "matches") && (
              <div role="alert" className={style.error}>
                {errors?.password?.message}
              </div>
            )}
        </div>

        <div className={style.inputWrapper}>
          <InputComponent
            type={showConfirm ? "text" : "password"}
            placeholder={"Confirm Password"}
            register={register}
            inputRef={"confirmpassword"}
            name={"confirmpassword"}
            registerOptions={{
              required: "Enter Confirm Password",
              minLength: 6,
              maxLength: 12,
            }}
            className={defaultStyle.input}
          />
          <EyeToggleButton show={showConfirm} setShow={setShowConfirm} />
          {errors.confirmpassword &&
            (errors.confirmpassword.type === "required" ||
              errors.confirmpassword.type === "oneOf") && (
              <div role="alert" className={style.error}>
                {errors?.confirmpassword?.message}
              </div>
            )}
        </div>

        <ButtonComponent type={"submit"} cta={"Submit"} />
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default ResetPass;
