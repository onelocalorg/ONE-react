import React from "react";
import Style from "../Styles/MyTicketsData.module.css";
import logo from "../images/logo.svg";
import searchIcon from "../images/Search.svg";
import { useNavigate } from "react-router-dom";
import HeaderUserComponent from "./HeaderUserComponent";
import { IoMdClose } from "react-icons/io";

function MyEventFilterComponent({
  setFilterData,
  filterData,
  isCreateEventEnabled,
}) {
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
    <div className={Style.nav}>
      <div className={Style.navHeader}>
        <div
          className={Style.filterContainer}
          style={{ flex: "1", justifyContent: "flex-start" }}
        >
          <img src={searchIcon} alt="search.." />
          <input
            type="text"
            className={Style.filter}
            placeholder="Search"
            onChange={getFilterOutPut}
            // disabled={!filter}
            style={{ width: "100%" }}
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1px",
            cursor: "pointer",
            flex: "1",
          }}
          onClick={goToHomePage}
          aria-hidden="true"
        >
          <img src={logo} alt="logo" className={Style.oneLogo} />
          {/* <h2 className={Style.brand}>NE</h2>
        <div className={Style.subBrand}>Boulder, CO</div> */}

          <div className={Style.BounderWrapper}>
            <div className={Style.brand}>NE</div>
            <div className={Style.subBrand}>Boulder, CO</div>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <HeaderUserComponent
            headerClass={Style}
            isCreateEventEnabled={isCreateEventEnabled}
          />
        </div>
      </div>
    </div>
  );
}

export default MyEventFilterComponent;
