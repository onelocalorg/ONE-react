import React from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Style from "../Styles/NavHeader.module.css";
import logo from "../images/logo.svg";
import searchIcon from "../images/Search.svg";
import { useNavigate } from "react-router-dom";
import HeaderUserComponent from "./HeaderUserComponent";
import { IoMdClose } from "react-icons/io";

function NavHeaderComponent({ setFilterData, filterData }) {
  const navigate = useNavigate();

  const getFilterOutPut = (e) => {
    setFilterData(e.target.value);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const handleClearSearch = () => {
    setFilterData("");
  };

  return (
    <div>
      <div className={Style.navHeader}>
        <div className={Style.filterContainer}>
          <img src={searchIcon} alt="search.." />
          <input
            type="text"
            className={Style.filter}
            placeholder="Search"
            onChange={getFilterOutPut}
            value={filterData}
          />
          {filterData ? (
            <span onClick={handleClearSearch} className={Style.clearIcon}>
              <IoMdClose />
            </span>
          ) : (
            <span className={Style.clearIcon}></span>
          )}
        </div>

        <div className={Style.upperHeader}>
          <div className={Style.brandText} onClick={goToHomePage}>
            <img src={logo} alt="logo" className={Style.oneLogo} />
            <div>
              <div className={Style.brand}>NE</div>
              <div className={Style.subBrand}>Boulder, CO</div>
            </div>
          </div>

          <HeaderUserComponent headerClass={Style} />
        </div>
      </div>
      <div>
        <div>Somethinggggg</div>
      </div>
    </div>
  );
}

export default NavHeaderComponent;
