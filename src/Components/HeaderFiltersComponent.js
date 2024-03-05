import React from "react";
import Style from "../Styles/HeaderFiltersComponent.module.css";
import IconTextBadgeComponent from "./IconTextBadgeComponent";

const HeaderFiltersComponent = ({ data }) => {
  return (
    <div className={`${Style.Wrapper} ${Style.font}`}>
      {data.map((btnBadge, index) => (
        <IconTextBadgeComponent btnBadge={btnBadge} key={index} />
      ))}
    </div>
  );
};

export default HeaderFiltersComponent;
