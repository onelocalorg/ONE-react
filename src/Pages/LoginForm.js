import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/LoginForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterComponent from "../Components/ToasterComponent";
import { logInApi } from "../api/services";
import ToasterSuccess from "./../Components/ToasterSuccess";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Loader from "../Components/Loader";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      const response = await logInApi(data);

      if (response.success === true) {
        handleSuccessfulLogin();
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
      navigate("/dashboard");
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
            registerOptions={{
              required: "Enter Valid Email",
              maxLength: 80,
            }}
          />
        </div>

        <div className={style.inputWrapper}>
          <InputComponent
            type={show ? "text" : "password"}
            placeholder={"Password"}
            register={register}
            inputRef={"password"}
            registerOptions={{
              required: "Length between 6 to 12",
              minLength: 6,
              maxLength: 12,
            }}
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
