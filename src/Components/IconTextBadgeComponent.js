import React from "react";
import Style from "../Styles/HeaderFiltersComponent.module.css";
import { NavLink } from "react-router-dom";

const IconTextBadgeComponent = ({ btnBadge }) => {
  return (
    <NavLink
      to={btnBadge?.to}
      className={`${Style.btn} bagde`}
      style={{ backgroundColor: `${btnBadge?.bgColor}` }}
    >
      <img
        src={btnBadge?.icon}
        alt={btnBadge?.label}
        className={`${Style.icon}`}
      />
      {btnBadge?.label}
    </NavLink>
  );
};

export default IconTextBadgeComponent;
