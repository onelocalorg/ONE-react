import React, { useEffect, useRef, useState } from "react";
import Style from "../Styles/UserDropdown.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { logOutPanel } from "../Redux/thunk/userThunk";

const HeaderUserComponent = ({ headerClass }) => {
  const userInfo = useSelector((state) => state?.userInfo);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const optionMenu = useRef(null);

  const closeOpenMenus = (e) => {
    if (isDropdownOpen && !optionMenu.current?.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", closeOpenMenus);

    return () => {
      window.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logOutPanel());
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className={Style.userMainDiv}>
      <div className={headerClass.userCover}>
        {userInfo?.userData ? (
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
            aria-hidden="true"
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
      <div className={Style.dropdown} ref={optionMenu}>
        {isDropdownOpen && (
          <ul className={Style.dropdownMenu}>
            <li onClick={handleLogout} aria-hidden="true">
              <CiLogout />
              <span className={Style.menuOption}>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderUserComponent;
