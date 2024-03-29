import React from "react";
import Style from "../Styles/WhoUserBadgeComponent.module.css";

const WhoUserBadgeComponent = ({ dataItem, onClickAddData }) => {
  return (
    <div className={Style.userBadgeWrapper} onClick={onClickAddData}>
      <img src={dataItem?.pic} alt="user" className={Style.userImg} />
      {dataItem.first_name}
      {""}
      {dataItem.last_name}
    </div>
  );
};

export default WhoUserBadgeComponent;
