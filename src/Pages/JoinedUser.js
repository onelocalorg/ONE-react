import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserDetails } from "../api/services";
import JoinedProfileForm from "./JoinedProfileForm";
import { PrivateComponent } from "../Components/PrivateComponent";
import HeaderComponent from "../Components/HeaderComponent";
import style from "../Styles/MyProfile.module.css";

const JoinedUser = () => {
  const params = useParams();

  return (
    <div className={style.mainDiv}>
      <PrivateComponent />
      <HeaderComponent />
      <JoinedProfileForm params={params} />
      {/* {params?.recentUserId} */}
    </div>
  );
};

export default JoinedUser;
