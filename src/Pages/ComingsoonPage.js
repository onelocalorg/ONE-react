import React from "react";
import { useNavigate } from "react-router-dom";

const ComingsoonPage = ({ pageName }) => {
  const navigate = useNavigate();
  const returnToHome = () => {
    navigate("/");
  };
  console.log({ pageName });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        paddingTop: "100px",
      }}
    >
      <div style={{ color: "greenyellow" }}>Coming Soon ...</div>
      <button
        onClick={returnToHome}
        style={{ border: "0", outline: "0", padding: "4px 10px" }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ComingsoonPage;
