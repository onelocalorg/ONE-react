import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/LoginForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterComponent from "../Components/ToasterComponent";
import { loginWithEmailApi } from "../api/services";
import ToasterSuccess from "./../Components/ToasterSuccess";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Loader from "../Components/Loader";
import defaultStyle from "../Styles/InputComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/slices/UserSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMAIL_FORMAT, REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import { useLocation } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(REQUIRED_FIELD_MESSAGE)
      .email("Invalid Email")
      .matches(EMAIL_FORMAT, "Invalid Email"),
    password: yup.string().required(REQUIRED_FIELD_MESSAGE),
    // .min(8, "password must be at least 8 characters")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d).+$/,
    //   "Password must contain at least 1 letter and 1 number"
    // ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  // useEffect(() => {
  //   const errorMsg = Object.values(errors).map((item) => item.message);
  //   errorMsg.slice(0, 1).forEach((errorMessage) => {
  //     ToasterComponent(errorMessage, 3000);
  //   });
  // }, [errors]);

  const [isLoading, setIsLoading] = useState(false);
  const handleSuccessfulLogin = () => {
    ToasterSuccess("Login Successfully", 1500);

    navigate("/my-profile");
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginWithEmailApi(data);
      if (response?.success === true) {
        // Data set
        dispatch(
          setUserData({
            profile_image: response?.data?.pic,
            userId: response?.data?.id,
            ...response?.data,
          })
        );
        localStorage.setItem(
          "user_info",
          JSON.stringify({
            profile_image: response?.data?.pic || "",
            userId: response?.data?.id,
          })
        );

        handleSuccessfulLogin();
      } else {
        ToasterComponent(
          response?.message || "Incorrect email or password",
          3000
        );
      }
    } catch (error) {
      ToasterComponent("Incorrect email or password", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const [show, setShow] = useState(false);

  return (
    <div className={style.loginForm}>
      <div>
        {/* <h2 className={style.h2}>
          Welcome to <span>Admin</span>
        </h2> */}
        <h3 className={style.h3}>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
        <div className={style.inputWrapper}>
          <InputComponent
            type={"text"}
            placeholder={"Email"}
            register={register}
            inputRef={"email"}
            name={"email"}
            registerOptions={{
              required: "Enter Valid Email",
              maxLength: 80,
            }}
            className={defaultStyle.input}
          />
          <div>
            {errors.email &&
              (errors.email.type === "required" ||
                errors.email.type === "email" ||
                errors.email.type === "matches") && (
                <div role="alert" className={style.error}>
                  {errors?.email?.message}
                </div>
              )}
          </div>
        </div>

        <div className={style.inputWrapper}>
          <InputComponent
            type={show ? "text" : "password"}
            placeholder={"Password"}
            register={register}
            inputRef={"password"}
            name={"password"}
            registerOptions={{
              required: "Length between 6 to 12",
              minLength: 6,
              maxLength: 12,
            }}
            className={defaultStyle.input}
          />
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
          {errors.password &&
            (errors.password.type === "required" ||
              errors.password.type === "min" ||
              errors.password.type === "matches") && (
              <div role="alert" className={style.error}>
                {errors?.password?.message}
              </div>
            )}
        </div>
        <div className={style.ButtonLink}>
          <ButtonComponent type={"submit"} cta={"Submit"} />
          <span>
            <Link className={style.forgotlink} to={"/forgot"}>
              Forgot Password?
            </Link>
          </span>
        </div>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default LoginForm;
