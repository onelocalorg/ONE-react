import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/LoginForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterComponent from "../Components/ToasterComponent";
import { logInApi, loginWithEmailApi } from "../api/services";
import ToasterSuccess from "./../Components/ToasterSuccess";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Loader from "../Components/Loader";
import defaultStyle from "../Styles/InputComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/slices/UserSlice";

const LoginForm = () => {
  const userInfo = useSelector((state) => state?.userInfo);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo?.userData) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const errorMsg = Object.values(errors).map((item) => item.message);
    errorMsg.slice(0, 1).forEach((errorMessage) => {
      ToasterComponent(errorMessage, 3000);
    });
  }, [errors]);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginWithEmailApi(data);
      if (response?.success === true) {
        // Data set
        dispatch(setUserData({ profile_image: response?.data?.pic }));
        localStorage.setItem(
          "user_info",
          JSON.stringify({
            profile_image: response?.data?.data?.pic || "",
          })
        );
        handleSuccessfulLogin();
      } else {
        ToasterComponent(response?.message || "wrong email or password", 3000);
      }
    } catch (error) {
      ToasterComponent("wrong email or password", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = () => {
    ToasterSuccess("Login Successfully", 1500);
    setTimeout(() => {
      // navigate("/dashboard");
      navigate("/");
    }, 1000);
  };

  const [show, setShow] = useState(false);

  return (
    <div className={style.loginForm}>
      <div>
        <h2 className={style.h2}>
          Welcome to <span>Admin</span>
        </h2>
        <h3 className={style.h3}>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
        <div className={style.inputWrapper}>
          <InputComponent
            type={"email"}
            placeholder={"email"}
            register={register}
            inputRef={"email"}
            name={"email"}
            registerOptions={{
              required: "Enter Valid Email",
              maxLength: 80,
            }}
            className={defaultStyle.input}
          />
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
        </div>
        <span>
          <Link className={style.forgotlink} to={"/forgot"}>
            Forgot Password?
          </Link>
        </span>
        <ButtonComponent type={"submit"} cta={"Submit"} />
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default LoginForm;
