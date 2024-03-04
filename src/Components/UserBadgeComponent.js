import React from "react";
import { useNavigate } from "react-router-dom";

const UserBadgeComponent = ({ src, recentUserId }) => {
  const navigate = useNavigate();

  const ticketPage = () => {
    navigate(`/user/${recentUserId}`);
  };
  return (
    <>
      <img
        onClick={ticketPage}
        src={src}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          flexShrink: 0,
          cursor: "pointer",
        }}
      />
    </>
  );
};

export default UserBadgeComponent;
