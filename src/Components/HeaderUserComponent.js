import React, { useEffect, useRef, useState } from "react";
import Style from "../Styles/UserDropdown.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { logOutPanel } from "../Redux/thunk/userThunk";
import ToasterSuccess from "./ToasterSuccess";
import { IoCreateSharp } from "react-icons/io5";

const HeaderUserComponent = ({
  headerClass,
  calledFromClass,
  isCreateEventEnabled,
}) => {
  const userInfo = useSelector((state) => state?.userInfo);
  const state = useSelector(
    (state) => state?.userInfo.userData?.isEventActiveSubscription
  );
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
    ToasterSuccess("Logout Successfully", 1000);
    navigate("/");
  };

  const userProfileImage = userInfo?.userData?.profile_image ? (
    <img
      src={userInfo?.userData?.profile_image}
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
  );

  return (
    <div className={Style.userMainDiv}>
      <div className={headerClass.userCover}>
        {userInfo?.userData ? (
          userProfileImage
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
          <ul
            className={`${Style.dropdownMenu} ${calledFromClass || ""}`}
            style={{ width: "max-content" }}
          >
            <li aria-hidden="true">
              <NavLink to={"/my-profile"} className={headerClass.navLink}>
                <FaUser />
                <span className={Style.menuOption}>My Profile</span>
              </NavLink>
            </li>
            <li aria-hidden="true">
              <NavLink to={"/my-events"} className={headerClass.navLink}>
                <FaCalendarAlt />
                <span className={Style.menuOption}>My Events</span>
              </NavLink>
            </li>
            <li aria-hidden="true">
              {state && (
                <NavLink to={"/create-event"} className={headerClass.navLink}>
                  <IoCreateSharp />
                  <span className={Style.menuOption}>Create Event</span>
                </NavLink>
              )}
            </li>
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
