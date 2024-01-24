import React from "react";
import style from "../Styles/NotFound.module.css";
import Img from "../images/Page404.svg";
import HeaderComponent from "../Components/HeaderComponent";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGotohome = () => {
    navigate("/");
  };
  return (
    <div className={style.mainDiv}>
      <HeaderComponent />
      <div className={style.formContainer}>
        <h2 className={style.notFoundTitle}>Page Not Found</h2>
        <img src={Img} alt={"404 Page"} className={style.imageStyle} />
        <div>
          <button className={style.backBtn} onClick={handleGotohome}>
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className={style.container}>
  //     <div className={style.mainDiv}>
  //       <div className={style.leftDiv}>
  //         <h2 style={{ fontSize: "45px" }}>
  //           404 <br /> Page <br /> Not Found
  //         </h2>
  //       </div>
  //       <div className={style.rightDiv}>
  //         <img src={Img} alt={"404 Page"} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default NotFound;
