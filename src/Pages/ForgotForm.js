import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackSharp } from "react-icons/io5";
import InputComponent from "../Components/InputComponent";
import style from "../Styles/ForgotForm.module.css";
import ButtonComponent from "../Components/ButtonComponent";
import ToasterError from "../Components/ToasterComponent";
import { forgotPasswordApi } from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";
import defaultStyle from "../Styles/InputComponent.module.css";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import Loader from "../Components/Loader";

const ForgotForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = yup.object().shape({
    email: yup.string().required(REQUIRED_FIELD_MESSAGE).email("Invalid Email"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const [mail, setMail] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await forgotPasswordApi(data);
      if (response?.success) {
        ToasterSuccess(response?.message || "", 3000);
        reset();
      } else {
        ToasterError(response?.message || "", 2500);
      }
    } catch (error) {
      ToasterError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // const errorMessages = Object.values(errors).map(({ message }) => message);

  // const renderSuccessMessage = mail !== "" && (
  //   <p className={style.notify}>
  //     Check your mail <span>{mail}</span> and reset your password.
  //   </p>
  // );

  // useEffect(() => {
  //   errorMessages.forEach((errorMessage) => ToasterComponent(errorMessage));
  // }, [errorMessages]);

  return (
    <div className={style.loginForm}>
      <div>
        <h2 className={style.h3}>Forgot Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
        <div className={style.inputWrapper}>
          <InputComponent
            type="text"
            placeholder="Enter email"
            register={register}
            name="email"
            inputRef="email"
            registerOptions={{
              required: "Enter Valid Email",
              maxLength: 80,
            }}
            className={defaultStyle.input}
          />
          <div>
            {errors.email &&
              (errors.email.type === "required" ||
                errors.email.type === "email") && (
                <div role="alert" className={style.error}>
                  {errors?.email?.message}
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

export default ForgotForm;
