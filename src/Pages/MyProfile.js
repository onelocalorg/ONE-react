import React, { useEffect, useState } from "react";
import style from "../Styles/MyProfile.module.css";
import { getUserDetails, deleteUSer } from "../api/services";
import MyProfileForm from "./MyProfileForm";
import HeaderComponent from "../Components/HeaderComponent";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/slices/UserSlice";
import { PrivateComponent } from "../Components/PrivateComponent";
import { useNavigate, useParams } from "react-router-dom";
import Style from "../Styles/LoginProfile.module.css";
import { logOutPanel } from "../Redux/thunk/userThunk";
import ToasterComponent from "../Components/ToasterComponent";
import ModalComponent from "../Components/ModalCompnent";

const MyProfile = () => {
  const scrollToTop = useScrollToTop();
  const userInfo = useSelector((state) => state?.userInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const state = useSelector(
    (state) => state.userInfo?.userData?.isEventActiveSubscription
  );

  const [showModal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const userID = useSelector((state) => state?.userInfo?.userData?.id);

  useEffect(() => {
    // Scroll to top as some time it shows in middle page
    scrollToTop();

    // For get lates profile URL as url expires after some time
    if (userInfo?.userData?.userId) {
      async function getUserData() {
        const userResponseData = await getUserDetails(
          userInfo?.userData?.userId
        );

        // Data set
        if (userResponseData?.data) {
          dispatch(
            setUserData({
              profile_image: userResponseData?.data?.pic,
              userId: userResponseData?.data?.id,
              ...userResponseData?.data,
            })
          );
          localStorage.setItem(
            "user_info",
            JSON.stringify({
              profile_image: userResponseData?.data?.pic || "",
              userId: userResponseData?.data?.id,
            })
          );
        }
      }
      getUserData();
    }
  }, []);

  const hideOnclickEvenet = () => {
    setModal(false);
  };

  const onClickFincalDelete = async () => {
    setLoader(true);
    try {
      const res = await deleteUSer(userID);
      if (res.success === true) {
        dispatch(logOutPanel());
        ToasterComponent(`${res.message}`, 2000);
        navigate("/");
      } else {
        ToasterComponent(`${res.message}`, 2000);
      }
    } catch (e) {
      console.log("E", e);
    }

    setLoader(false);
  };

  const onClickDelete = () => {
    setModal(true);
  };
  return (
    <div className={style.mainDiv}>
      <PrivateComponent />
      <HeaderComponent isCreateEventEnabled={state} />
      <div className={style.formContainer}>
        <MyProfileForm userInfo={userInfo} onClickDelete={onClickDelete} />
      </div>

      <ModalComponent
        show={showModal}
        wrapperClassname={` ${Style.wModal}`}
        hideFunc={hideOnclickEvenet}
        isHeaderHight
        header={<div className="sendLayoutHeader" />}
        body={
          <div className={Style.modalContainer}>
            <div>
              <p className={Style.confirmationText1}>
                Are you sure you want to delete your account?
              </p>

              <div className={Style.btnContainer}>
                <button
                  onClick={() => {
                    onClickFincalDelete();
                  }}
                  className={`${Style.formBtn} ${Style.redBtn}`}
                >
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => {
                    hideOnclickEvenet();
                  }}
                  className={`${Style.formBtn}`}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default MyProfile;
