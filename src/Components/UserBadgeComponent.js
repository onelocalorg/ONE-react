import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../Styles/UserBadgeComponent.module.css";

const UserBadgeComponent = ({ src, recentUserId }) => {
  const navigate = useNavigate();

  const ticketPage = () => {
    navigate(`/user/${recentUserId}`);
  };
  return (
    <>
      <img onClick={ticketPage} src={src} className={style.userbadge} />
    </>
  );
};

export default UserBadgeComponent;
