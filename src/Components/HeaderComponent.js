import { useNavigate } from "react-router-dom";
import HeaderUserComponent from "./HeaderUserComponent";
import logo from "../images/logo.svg";
import HeaderStyle from "../Styles/Header.module.css";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <div className={HeaderStyle.navHeader}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "7px",
          flexGrow: "1",
          cursor: "pointer",
        }}
        onClick={goToHomePage}
        aria-hidden="true"
      >
        <img src={logo} alt="logo" className={HeaderStyle.oneLogo} />
        <h2 className={HeaderStyle.brand}>NE</h2>
      </div>

      <HeaderUserComponent
        headerClass={HeaderStyle}
        calledFromClass="eventDetailHeader"
      />
    </div>
  );
};

export default HeaderComponent;
