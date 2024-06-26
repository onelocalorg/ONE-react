import React, { useEffect } from "react";
import style from "../Styles/Login.module.css";
import MyProfileForm from "./MyProfileForm";
import LoginProfileForm from "./LoginProfileForm";
import { useScrollToTop } from "../hooks/useScrollToTop";
import HeaderComponent from "../Components/HeaderComponent";

const Login = () => {
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop(); // Automatically scroll to top when the component is mounted
  }, []);

  // return (
  //   <div className={style.container}>
  //     <div className={style.mainDiv}>
  //       <div className={style.leftDiv}>
  //         <LoginForm />
  //       </div>
  //       <div className={style.rightDiv}>
  //         <img src={SigninImage} alt={"SignIn"} />
  //       </div>
  //     </div>{" "}
  //   </div>
  // );

  return (
    <div className={style.mainDiv}>
      <HeaderComponent />
      <div className={style.formContainer}>
        <LoginProfileForm />
      </div>
    </div>
  );
};

export default Login;
