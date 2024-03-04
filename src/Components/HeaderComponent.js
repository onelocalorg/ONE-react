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
    <div className={HeaderStyle.nav}>
      <div className={HeaderStyle.navHeader}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px",
            cursor: "pointer",
            flex: "1",
          }}
          onClick={goToHomePage}
          aria-hidden="true"
        >
          <img src={logo} alt="logo" className={HeaderStyle.oneLogo} />
          {/* <h2 className={HeaderStyle.brand}>NE</h2>
        <div className={HeaderStyle.subBrand}>Boulder, CO</div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "-0.5px",
            }}
          >
            <div className={HeaderStyle.brand}>NE</div>
            <div className={HeaderStyle.subBrand} style={{ marginTop: "-6px" }}>
              Boulder, CO
            </div>
          </div>
        </div>

        <HeaderUserComponent
          headerClass={HeaderStyle}
          calledFromClass="eventDetailHeader"
        />
      </div>
    </div>
  );
};

export default HeaderComponent;
