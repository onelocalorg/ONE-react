import React from "react";
import user from "../images/user.png";
import currencyIcon from "../images/currency-icon.png";
import style from "../Styles/MyProfile.module.css";

const MyProfileForm = ({ userInfo }) => {
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
    </div>
  );
};

export default MyProfileForm;
