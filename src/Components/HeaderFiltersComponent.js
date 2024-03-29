import React from "react";
import Style from "../Styles/HeaderFiltersComponent.module.css";
import IconTextBadgeComponent from "./IconTextBadgeComponent";
import headerFilterData from "../utils/ButtonbadgeData";

const HeaderFiltersComponent = () => {
  return (
    <div className={`${Style.Wrapper} ${Style.font}`}>
      {headerFilterData.map((btnBadge, index) => (
        <IconTextBadgeComponent btnBadge={btnBadge} key={index} />
      ))}
    </div>
  );
};

export default HeaderFiltersComponent;
