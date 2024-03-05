import React, { useEffect } from "react";
import style from "../Styles/MyProfile.module.css";
import MyProfileForm from "./MyProfileForm";
import HeaderComponent from "../Components/HeaderComponent";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { getUserDetails } from "../api/services";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/slices/UserSlice";
import { PrivateComponent } from "../Components/PrivateComponent";

const MyProfile = () => {
  const scrollToTop = useScrollToTop();
  const userInfo = useSelector((state) => state?.userInfo);
  console.log(userInfo);
  const dispatch = useDispatch();

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
  return (
    <div className={style.mainDiv}>
      <PrivateComponent />
      <HeaderComponent />
      <div className={style.formContainer}>
        <MyProfileForm userInfo={userInfo} />
      </div>
    </div>
  );
};

export default MyProfile;
