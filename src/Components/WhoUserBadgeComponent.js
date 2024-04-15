import React, { useState } from "react";
import Style from "../Styles/WhoUserBadgeComponent.module.css";
import RightArrow from "../Components/SVGR/RightArrow";

const WhoUserBadgeComponent = ({
  dataItem,
  onClickAddData,
  isFromGraits = false,
}) => {
  const [points, setPoints] = useState(0);
  if (isFromGraits) {
    return (
      <div className={Style.userBadgeWrapper}>
        <img src={dataItem?.pic} alt="user" className={Style.userImg} />
        <span>
          {dataItem.first_name}
          {""}
          {dataItem.last_name}
        </span>
        <span className={Style.pointsContainer}>
          <span
            className={Style.rangeBtnConatner}
            onClick={() => setPoints(points - 1)}
          >
            -
          </span>
          {points}
          <span
            className={Style.rangeBtnConatner}
            onClick={() => setPoints(points + 1)}
          >
            +
          </span>
          <span
            // className={Style.rangeBtnConatner}
            onClick={() => onClickAddData(points)}
          >
            <RightArrow
              fill="#fff"
              fillArrowColor="#007112"
              width="35px"
              height="35px"
            />
          </span>
        </span>
      </div>
    );
  } else {
    return (
      <div className={Style.userBadgeWrapper} onClick={onClickAddData}>
        <img src={dataItem?.pic} alt="user" className={Style.userImg} />
        {dataItem.first_name}
        {""}
        {dataItem.last_name}
      </div>
    );
  }
};

export default WhoUserBadgeComponent;
