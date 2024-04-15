import React from "react";
import RightArrow from "../Components/SVGR/RightArrow";
import { type } from "@testing-library/user-event/dist/type";

function Button(props) {
  return (
    <button
      style={{
        width: "20vw",
        padding: "1% 2%",
        backgroundColor: "#DABD84",
        borderRadius: "18px",
        border: "none",
      }}
      onClick={props.onClick}
    >
      <div style={{ display: "flex" }}>
        <span
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Post Offer
        </span>
        <div style={{}}>
          <RightArrow fill="#BF820A" />
        </div>
      </div>
    </button>
  );
}

export default Button;
