import React, { useState } from "react";
import style from "../Styles/SidebarComponent.module.css";
import { CgEventbrite } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { PiUserListFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GiTicket } from "react-icons/gi";
import { MdSubscriptions } from "react-icons/md";

const SidebarComponent = ({ logout }) => {
  const [toggle, setToggle] = useState(false);

  const collapser = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div
      className={style.sidebar}
      style={{
        width: toggle ? "90px" : "270px",
        transition: "all 0.5s ease-in-out",
        boxShadow: toggle ? "0px 2px 10px #aa8de5f2" : "none",
      }}
    >
      <div className={style.logoBox}>
        <h3>
          <CgEventbrite className={style.logoIcon} />
          <p
            style={{
              display: toggle ? "none" : "flex",
              transition: "all 0.4s ease",
            }}
          >
            Event<span>MVP</span>
          </p>
        </h3>
      </div>
      <ul className={style.menubar}>
        <li>
          <BiMenuAltLeft className={style.icon} onClick={collapser} />
        </li>

        <li>
          <NavLink to={"/dashboard/userlist"} className={style.menubarLink}>
            <PiUserListFill className={style.iconList} />
            <span
              style={{
                display: toggle ? "none" : "flex",
                transition: "all 0.4s ease",
              }}
            >
              User List
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/ticketlist"} className={style.menubarLink}>
            <GiTicket className={style.iconList} />
            <span
              style={{
                display: toggle ? "none" : "flex",
                transition: "all 0.4s ease",
              }}
            >
              Ticket List
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/subscriptionsplans"} className={style.menubarLink}>
            <MdSubscriptions className={style.iconList} />
            <span
              style={{
                display: toggle ? "none" : "flex",
                transition: "all 0.4s ease",
              }}
            >
              Plan List
            </span>
          </NavLink>
        </li>
      </ul>
      <div className={style.logoutBox} onClick={logout}>
        <>
          <RiLogoutCircleRLine className={style.iconList} />
          <span
            style={{
              display: toggle ? "none" : "flex",
              transition: "all 0.4s ease",
            }}
          >
            logout
          </span>
        </>
      </div>
    </div>
  );
};

export default SidebarComponent;
