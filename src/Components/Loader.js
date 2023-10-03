import React from "react";
import style from "../Styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loaderOverlay}>
      <div className={style.customLoader}></div>
    </div>
  );
};

export default Loader;
