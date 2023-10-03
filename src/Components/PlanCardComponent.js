import React from "react";
import style from "../Styles/PlanCardComponent.module.css";

function PlanCardComponent({ name, price, interval, isActive }) {
  const isActiveText = isActive ? "Active" : "De-active";
  return (
    <div className={style.card}>
      <p style={{textAlign:"center", fontSize:"40px", fontWeight:"500", width:"100%", WebkitTextStroke:"2px #171717", color:"transparent"}}>{price}</p>
      <p>Name : {name}</p>
      <p>Duration: {interval}</p>
      <span style={{width:"100%",height:"40px", backgroundColor:"#fff",borderRadius:"10px",color: isActive ? "green" : "red", fontWeight:"500", display:"flex", justifyContent:"center",alignItems:"center"}}>{isActiveText}</span>
    </div>
  );
}

export default PlanCardComponent;
