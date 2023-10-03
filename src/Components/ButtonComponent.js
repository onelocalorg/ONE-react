import React from "react";
import style from "../Styles/ButtonComponent.module.css";

const ButtonComponent = ({ cta, onClick, loading, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={style.btn}
    >
      {cta}
    </button>
  );
};

export default ButtonComponent;
