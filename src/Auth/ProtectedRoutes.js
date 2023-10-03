import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("success_key");
    
    // Check if the value is null or "null"
    if (login === null || login.trim() === "null") {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default ProtectedRoutes;
