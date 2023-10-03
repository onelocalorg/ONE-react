import React from "react";
import style from "../Styles/Login.module.css";
import Img from '../images/Page404.svg'

const NotFound = () => {
    return (
      <div className={style.container}>
        <div className={style.mainDiv}>
          <div className={style.leftDiv}>
            <h2 style={{fontSize:"45px"}}>404 <br /> Page <br /> Not Found</h2>
          </div>
          <div className={style.rightDiv}>
            <img src={Img} alt={"404 Page"} />
          </div>
        </div>
      </div>
    );
}

export default NotFound