import React from "react";
import style from "../Styles/DataContainer.module.css";
import wclmImg from "../images/Welcome.svg";
import { Link, Outlet } from "react-router-dom";
import {BsArrowRightShort} from 'react-icons/bs'
const DataContainer = () => {
  return (
    <div className={style.dataContainer}>
      <div className={style.text}>
        <p>Dashboard overview</p>
      </div>
      <div className={style.welcome}>
        <div className={style.welcomeText}>
          <h2>
            Hello , <span>Admin</span>
          </h2>
          <p>Have a nice day and don’t forget to take care of your health!</p>
          <Link className={style.link}><span>Learn More</span> <BsArrowRightShort className={style.icon}/></Link>
        </div>
        <div className={style.imgWrapper}>
          <img src={wclmImg} alt="Welcome Admin" />
        </div>
      </div>
      {/* <div className={style.wrapper}>
        <div className={style.box}>Box 1</div>
        <div className={style.box}>Box 2</div>
        <div className={style.box}>Box 3</div>
      </div> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DataContainer;
