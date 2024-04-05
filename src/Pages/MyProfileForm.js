import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import user from "../images/user.png";
import currencyIcon from "../images/currency-icon.png";
import style from "../Styles/MyProfile.module.css";
import { REQUIRED_FIELD_MESSAGE } from "../utils/AppConstants";
import { useForm } from "react-hook-form";
import InputComponent from "../Components/InputComponent";
import defaultStyle from "../Styles/InputComponent.module.css";
import {
  getConnectLinkAPI,
  updateUserProfileApi,
  uploadImageAPI,
} from "../api/services";
import ToasterSuccess from "../Components/ToasterSuccess";
import ToasterError from "../Components/ToasterComponent";
import Loader from "../Components/Loader";
import TextAreaComponent from "../Components/TextAreaComponent";
import { setUserData } from "../Redux/slices/UserSlice";
import { useDispatch } from "react-redux";
import whitetent from "../images/white-tent.png";
import playerIcon from "../images/player.png";
import backgroundDefault from "../images/background-default.png";
import { fireEvent } from "@testing-library/react";
import SignUpMemberShipComponent from "../Components/SignUpMemberShipComponent";

import { packageListApi } from "../api/services";

function findObjectByKey(array, key, value) {
  return array.find((obj) => obj[key] === value);
}

const MyProfileForm = ({ userInfo, onClickDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileCoverImage, setProfileCoverImage] = useState(null);
  const profilePicInputRef = useRef(null);
  const profileCoverInputRef = useRef(null);
  const [select, setSelectData] = useState({});
  const [EventProduce, setEventProduce] = useState(false);
  const [isProduceMemberShip, setProduceSetUpMemberShip] = useState(false);
  const [isPlayerActiveSubscription, setIsPlayerActiveSubscription] =
    useState(false);
  const [isEventProduerSubscription, setIsEventProducerSubscription] =
    useState(false);

  const [resultApiData, setResultApiData] = useState(false);

  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    first_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    last_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  });

  const PROFILE_PIC = "pic";
  const PROFILE_COVER_PIC = "cover_image";

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

  const callPackageListAPi = async () => {
    setIsLoading(true);
    try {
      const response = await packageListApi();
      const { data } = response.data;
      data.forEach((e) => {
        if (e.title === "Event Producer") {
          setIsEventProducerSubscription(e.status);
        }
        if (e.title === "Player") {
          setIsPlayerActiveSubscription(e.status);
        }
      });
      setResultApiData(data);
      // console.log("data", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    callPackageListAPi();
  }, []);
  useEffect(() => {
    setValue("first_name", userInfo?.userData?.first_name);
    setValue("last_name", userInfo?.userData?.last_name);
    setValue("nick_name", userInfo?.userData?.nick_name || "");
    setValue("about", userInfo?.userData?.about || "");
    setValue("catch_phrase", userInfo?.userData?.catch_phrase || "");
    setSkills(userInfo?.userData?.skills || []);
    setProfileImage(userInfo?.userData?.profile_image);
    setProfileCoverImage(userInfo?.userData?.cover_image);
  }, [userInfo?.userData]);

  const handleImageClick = (e, type) => {
    if (type === PROFILE_PIC) {
      profilePicInputRef.current.click();
    } else if (type === PROFILE_COVER_PIC) {
      profileCoverInputRef.current.click();
    }
  };

  const getConnectLink = async () => {
    try {
      setIsLoading(true);
      const response = await getConnectLinkAPI();

      if (response?.data) {
        const linkUrl = response?.data || "";
        if (linkUrl !== "") {
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

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const [fileNameWithoutExtension] = selectedFile["name"].split(".");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === PROFILE_PIC) {
          setProfileImage(reader.result);
        } else if (type === PROFILE_COVER_PIC) {
          setProfileCoverImage(reader.result);
        }

        handleFileUpload(type, reader.result, fileNameWithoutExtension);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileUpload = async (upload_key, imgBase64, imgName) => {
    try {
      setIsLoading(true);
      const response = await uploadImageAPI({
        uploadKey: upload_key,
        imageName: imgName,
        base64String: imgBase64,
        userId: userInfo?.userData?.userId,
      });

      if (response?.success) {
        if (upload_key === PROFILE_PIC) {
          dispatch(
            setUserData({
              ...userInfo?.userData,
              profile_image: response?.data?.imageUrl,
            })
          );

          localStorage.setItem(
            "user_info",
            JSON.stringify({
              profile_image: response?.data?.imageUrl || "",
              userId: userInfo?.userData?.userId,
            })
          );
        } else if (upload_key === PROFILE_COVER_PIC) {
          dispatch(
            setUserData({
              ...userInfo?.userData,
              cover_image: response?.data?.imageUrl,
            })
          );
        }

        ToasterSuccess(response?.message || "Image uploaded successfully.");
      } else {
        ToasterError(response?.message || "Something went wrong");
      }
    } catch (error) {
      ToasterError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (event, type) => {
    // Handle image loading error
    if (type === "backgroundImg") {
      event.target.src = backgroundDefault;
    } else {
      event.target.src = user;
    }
    event.target.onerror = null; // To avoid infinite loop in case the backup image also fails
  };

  const onClickEventProducer = () => {
    const result = findObjectByKey(resultApiData, "key", "event_producer");
    setSelectData(result);
    setEventProduce(true);
  };

  const onClickPlayer = () => {
    const result = findObjectByKey(resultApiData, "key", "player_membership");
    setSelectData(result);
    setEventProduce(true);
  };
  const userProfileImage = userInfo?.userData?.profile_image ? (
    <>
      <input
        type="file"
        ref={profilePicInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, PROFILE_PIC)}
      />
      <MdOutlineEdit
        className={style.editProfileImgIcon}
        onClick={(e) => handleImageClick(e, PROFILE_PIC)}
      />
      <img
        src={profileImage}
        alt="user"
        className={style.profileImage}
        onError={(e) => handleError(e, "profileImg")}
      />
    </>
  ) : (
    <>
      <input
        type="file"
        ref={profilePicInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, PROFILE_PIC)}
      />
      <MdOutlineEdit
        className={style.editProfileImgIcon}
        onClick={(e) => handleImageClick(e, PROFILE_PIC)}
      />
      <img src={user} alt="user" className={style.profileImage} />
    </>
  );

  const userProfileCoverImage = userInfo?.userData?.cover_image ? (
    <>
      <input
        type="file"
        ref={profileCoverInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, PROFILE_COVER_PIC)}
      />
      <MdOutlineEdit
        className={style.editImageIcon}
        onClick={(e) => handleImageClick(e, PROFILE_COVER_PIC)}
      />
      <img
        src={profileCoverImage}
        alt="background"
        className={style.profileBackImage}
        onError={(e) => handleError(e, "backgroundImg")}
      />
    </>
  ) : (
    <div className={style.blankCover}>
      <input
        type="file"
        ref={profileCoverInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e, PROFILE_COVER_PIC)}
      />
      <MdOutlineEdit
        className={style.editImageIcon}
        onClick={(e) => handleImageClick(e, PROFILE_COVER_PIC)}
      />
    </div>
  );

  return (
    <div className={style.container}>
      <div className={style.imageSection}>
        <div className={style.profileBackContainer}>
          {userProfileCoverImage}
        </div>
        <div className={style.profileImageContainer}>{userProfileImage}</div>
      </div>

      <div className={style.profileItem}>
        <div className={`${style.profileField} ${style.connectBtn}`}>
          {!userInfo?.userData?.isConnectedLinked ? (
            <button className={style.linkPayBtn} onClick={getConnectLink}>
              <img
                src={currencyIcon}
                alt="currency"
                className={style.linkPayIcon}
              />
              Link Payout Method
            </button>
          ) : (
            <button className={style.linkPayBtn}>
              <img
                src={currencyIcon}
                alt="currency"
                className={style.linkPayIcon}
              />
              Payout Method Connected
            </button>
          )}
        </div>
      </div>

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
        <div className={`${style.profileItem} ${style.profileFieldItem}`}>
          <div className={style.memberDiv}>
            <div className={style.memberLbl}>Membership</div>
            <div className={style.btnSection}>
              <button
                className={`${style.memberbtn} ${style.playerBtn} ${
                  isPlayerActiveSubscription && style.ActiveBorderColor
                }`}
                onClick={onClickPlayer}
              >
                <img
                  src={playerIcon}
                  className={style.eventPlayerBtnIcon}
                  alt="player"
                />
                Player
              </button>
              <button
                className={`${style.memberbtn} ${style.eventProdBtn} ${
                  isEventProduerSubscription && style.ActiveBorderColor
                }`}
                onClick={onClickEventProducer}
              >
                <img
                  src={whitetent}
                  className={style.eventProdBtnIcon}
                  alt="tent"
                />
                Event Producer
              </button>
            </div>
          </div>
        </div>
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
                placeholder={"Add a skill (Press enter to add)"}
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

            <button
              className={style.formBtn}
              type="button"
              onClick={onClickDelete}
            >
              delete
            </button>
          </div>
        </form>
      </div>

      <SignUpMemberShipComponent
        setEventProduce={setEventProduce}
        select={select}
        setProduceSetUpMemberShip={setProduceSetUpMemberShip}
        EventProduce={EventProduce}
        isProduceMemberShip={isProduceMemberShip}
      />
      <div>{isLoading && <Loader />}</div>
    </div>
  );
};

export default MyProfileForm;
