import React from "react";
import style from "../Styles/Login.module.css";
import LoginForm from "./LoginForm";
import SigninImage from '../images/Login.svg'

const Login = () => {
  return (
    <div className={style.container}>
      <div className={style.mainDiv}>
        <div className={style.leftDiv}>
          <LoginForm />
        </div>
        <div className={style.rightDiv}>
          <img src={SigninImage} alt={"SignIn"} />
        </div>
      </div>{" "}
    </div>
  );
};

export default Login;
