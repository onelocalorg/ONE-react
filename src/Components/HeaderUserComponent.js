import React, { useState } from "react";
import Style from "../Styles/UserDropdown.module.css";
import { NavLink } from "react-router-dom";
import user from "../images/user.png";
import { useSelector } from "react-redux";

const HeaderUserComponent = ({ headerClass }) => {
  const userInfo = useSelector((state) => state?.userInfo);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={Style.userMainDiv}>
      <div className={headerClass.userCover}>
        {userInfo ? (
          <img
            src={user}
            alt="user"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={toggleDropdown}
          />
        ) : (
          <NavLink to={"/login"} className={headerClass.menubarLink}>
            <img
              src={user}
              alt="user"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </NavLink>
        )}
      </div>
      <div className={Style.dropdown}>
        {isDropdownOpen && (
          <ul className={Style.dropdownMenu}>
            <li>Logout</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderUserComponent;
