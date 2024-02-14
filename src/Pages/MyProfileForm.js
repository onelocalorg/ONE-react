import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import user from "../images/user.png";
import currencyIcon from "../images/currency-icon.png";
import userbackground from "../images/userbackground.png";
import style from "../Styles/MyProfile.module.css";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import defaultStyle from "../Styles/InputComponent.module.css";
import { getConnectLinkAPI, updateUserProfileApi } from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";
import ToasterError from "../Components/ToasterComponent";
import Loader from "../Components/Loader";
import TextAreaComponent from "../Components/TextAreaComponent";

const MyProfileForm = ({ userInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState([]);
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
      nick_name: userInfo?.userData?.nick_name || "",
      about: userInfo?.userData?.about || "",
      catch_phrase: userInfo?.userData?.catch_phrase || "",
    },
  });

  useEffect(() => {
    setValue("first_name", userInfo?.userData?.first_name);
    setValue("last_name", userInfo?.userData?.last_name);
    setValue("nick_name", userInfo?.userData?.nick_name || "");
    setValue("about", userInfo?.userData?.about || "");
    setValue("catch_phrase", userInfo?.userData?.catch_phrase || "");
    setSkills(userInfo?.userData?.skills || []);
  }, [userInfo?.userData]);

  const handleImageClick = () => {
    console.log("Calllllllll");
  };

  const getConnectLink = async () => {
    try {
      setIsLoading(true);
      const response = await getConnectLinkAPI();

      if (response?.data?.data) {
        const linkUrl = response?.data?.data || "";
        if (linkUrl != "") {
          window.open(linkUrl, "_self");
        }
      } else {
        ToasterError(response?.message || "Something went wrong");
      }
    } catch (error) {
      ToasterError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      data["skills"] = skills?.length ? skills.toString() : "";
      const response = await updateUserProfileApi(
        userInfo?.userData?.userId,
        data
      );

      if (response?.success) {
        ToasterSuccess(response?.message || "", 1500);
      } else {
        ToasterError(response?.message || "", 1500);
      }
    } catch (error) {
      ToasterError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setSkills((prevSkills) => [...prevSkills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleChipDelete = (skillToDelete) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToDelete)
    );
  };

  const userProfileImage = userInfo?.userData?.profile_image ? (
    <>
      <MdOutlineEdit
        className={style.editProfileImgIcon}
        onClick={handleImageClick}
      />
      <img
        src={userInfo?.userData?.profile_image}
        alt="user"
        className={style.profileImage}
      />
    </>
  ) : (
    <>
      <MdOutlineEdit
        className={style.editProfileImgIcon}
        onClick={handleImageClick}
      />
      <img src={user} alt="user" className={style.profileImage} />
    </>
  );

  return (
    <div className={style.container}>
      <div className={style.imageSection}>
        <div className={style.profileBackContainer}>
          <MdOutlineEdit
            className={style.editImageIcon}
            onClick={handleImageClick}
          />
          <img
            src={userbackground}
            alt="background"
            className={style.profileBackImage}
          />
        </div>
        <div className={style.profileImageContainer}>{userProfileImage}</div>
      </div>
      {!userInfo?.userData?.isConnectedLinked && (
        <div className={style.profileItem}>
          <div className={`${style.profileField} ${style.connectBtn}`}>
            <button className={style.linkPayBtn} onClick={getConnectLink}>
              <img
                src={currencyIcon}
                alt="currency"
                className={style.linkPayIcon}
              />
              Link Payout Method
            </button>
          </div>
        </div>
      )}
      {/* <div className={style.profileTitleItem}>
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
      </div> */}
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
              />
              {errors.first_name && errors.first_name.type === "required" && (
                <div role="alert" className={style.error}>
                  {errors?.first_name?.message}
                </div>
              )}
            </div>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <InputComponent
                type={"text"}
                placeholder={"Last Name"}
                register={register}
                inputRef={"last_name"}
                name={"last_name"}
                className={`${defaultStyle.input} ${style.inputField}`}
              />
              {errors.last_name && errors.last_name.type === "required" && (
                <div role="alert" className={style.error}>
                  {errors?.last_name?.message}
                </div>
              )}
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
              />
            </div>
          </div>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <TextAreaComponent
                placeholder={"Enter a catchphrase"}
                register={register}
                inputRef={"catch_phrase"}
                name={"catch_phrase"}
                className={`${defaultStyle.textareaInput}`}
              />
            </div>
          </div>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <TextAreaComponent
                placeholder={"Tell us about yourself!"}
                register={register}
                inputRef={"about"}
                name={"about"}
                className={`${defaultStyle.textareaInput}`}
              />
            </div>
          </div>
          <div className={`${style.profileItem} ${style.profileFieldItem}`}>
            <div className={`${style.profileField} ${style.profileInputField}`}>
              <input
                type={"text"}
                placeholder={"Add a skill"}
                name={"skills"}
                className={`${defaultStyle.input} ${style.inputField}`}
                onKeyDown={handleEnterPress}
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className={style.skillChipDiv}>
                {skills.map((skill, index) => (
                  <span className={style.skillChip} key={index}>
                    <span>{skill}</span>
                    <span className={style.chipDelete}>
                      <MdCancel onClick={() => handleChipDelete(skill)} />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={style.formBtnDiv}>
            <button className={style.formBtn} type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
      <div>{isLoading && <Loader />}</div>
    </div>
  );
};

export default MyProfileForm;
