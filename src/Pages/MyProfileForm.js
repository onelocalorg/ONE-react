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
    first_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    last_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: userInfo?.userData?.first_name,
      last_name: userInfo?.userData?.last_name,
      nick_name: userInfo?.userData?.nick_name,
    },
  });
  console.log("errors", errors);
  useEffect(() => {
    setValue("first_name", userInfo?.userData?.first_name);
    setValue("last_name", userInfo?.userData?.last_name);
    setValue("nick_name", userInfo?.userData?.nick_name);
  }, [userInfo?.userData]);

  const onSubmit = async (data) => {
    console.log("Dataaaa", data);
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
      <div className={style.profileTitleItem}>
        <div className={style.profileTitle}>
          {`${userInfo?.userData?.first_name || ""} ${
            userInfo?.userData?.last_name || ""
          }`}
        </div>
      </div>
      <div className={style.profileSubTitleItem}>
        <div className={style.profileSubTitle}>
          {userInfo?.userData?.nick_name || ""}
        </div>
      </div>
      <div className={style.formDiv}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formBox}>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                placeholder={"First Name"}
                register={register}
                inputRef={"first_name"}
                name={"first_name"}
                className={`${defaultStyle.input} ${style.inputField}`}
                registerOptions={{
                  required: "Enter Valid Email",
                  maxLength: 80,
                }}
              />
            </div>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                placeholder={"Last Name"}
                register={register}
                inputRef={"last_name"}
                name={"last_name"}
                className={`${defaultStyle.input} ${style.inputField}`}
                registerOptions={{
                  required: "Enter Valid Email",
                  maxLength: 80,
                }}
              />
            </div>
          </div>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                placeholder={"Nick Name"}
                register={register}
                inputRef={"nick_name"}
                name={"nick_name"}
                className={`${defaultStyle.input} ${style.inputField}`}
                registerOptions={{
                  required: "Enter Valid Email",
                  maxLength: 80,
                }}
              />
            </div>
          </div>
          <div className={style.formBtnDiv}>
            <button className={style.formBtn} type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfileForm;
