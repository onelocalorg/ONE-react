import React, { useState, useCallback } from "react";
import style from "../Styles/Dashboard.module.css";
import SidebarComponent from "./../Components/SidebarComponent";
import DataContainer from './DataContainer';
import { useNavigate } from "react-router-dom";
import ToasterComponent from './../Components/ToasterComponent';
import Loader from './../Components/Loader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setIsLoading(true);
    localStorage.removeItem('success_key');
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
      ToasterComponent("Logout successfully", 2000);
    }, 2000);
  }, [navigate]);

  return (
    <div className={style.dashboard}>
      {isLoading && <Loader />}
      <SidebarComponent logout={logout} />
      <DataContainer />
    </div>
  );
};

export default Dashboard;
