import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import user from "../images/user.png";
import currencyIcon from "../images/currency-icon.png";
import style from "../Styles/MyProfile.module.css";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import defaultStyle from "../Styles/InputComponent.module.css";

const MyProfileForm = ({ userInfo }) => {
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: userInfo?.userData?.email,
      first_name: userInfo?.userData?.first_name,
      last_name: userInfo?.userData?.last_name,
    },
  });

  useEffect(() => {
    setValue("email", userInfo?.userData?.email);
    setValue("first_name", userInfo?.userData?.first_name);
    setValue("last_name", userInfo?.userData?.last_name);
  }, [userInfo?.userData]);

  const onSubmit = async (data) => {
    console.log("Dataaaa");
  };

  const userProfileImage = userInfo?.userData?.profile_image ? (
    <img
      src={userInfo?.userData?.profile_image}
      alt="user"
      className={style.profileImage}
    />
  ) : (
    <img src={user} alt="user" className={style.profileImage} />
  );

  return (
    <div className={style.container}>
      <div className={style.profileImageContainer}>{userProfileImage}</div>
      <div className={style.profileItem}>
        <div className={style.profileLable}></div>
        <div className={style.profileField}>
          <button className={style.linkPayBtn}>
            <img
              src={currencyIcon}
              alt="currency"
              className={style.linkPayIcon}
            />
            Link Payout Method
          </button>
        </div>
      </div>
      <div className={style.profileItem}>
        <div className={style.profileLable}>Email</div>
        <div className={style.profileField}>
          {userInfo?.userData?.email || ""}
        </div>
      </div>
      <div className={style.profileItem}>
        <div className={style.profileLable}>Name</div>
        <div className={style.profileField}>
          {`${userInfo?.userData?.first_name || ""} ${
            userInfo?.userData?.last_name || ""
          }`}
        </div>
      </div>
      <div className={style.profileItem}>
        <div className={style.profileLable}>Nick Name</div>
        <div className={style.profileField}>
          {userInfo?.userData?.nick_name || ""}
        </div>
      </div>
      <div className={style.formDiv}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={style.profileLable}>Email</div>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                disabled={true}
                placeholder={"Email"}
                register={register}
                inputRef={"email"}
                name={"email"}
                className={`${defaultStyle.input} ${style.inputField}`}
              />
            </div>
          </div>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={style.profileLable}>First Name</div>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                placeholder={"First Name"}
                register={register}
                inputRef={"first_name"}
                name={"first_name"}
                className={`${defaultStyle.input} ${style.inputField}`}
              />
            </div>
          </div>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={style.profileLable}>Last Name</div>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                placeholder={"Last Name"}
                register={register}
                inputRef={"last_name"}
                name={"last_name"}
                className={`${defaultStyle.input} ${style.inputField}`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfileForm;
