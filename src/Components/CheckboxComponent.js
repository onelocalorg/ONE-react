import React from "react";

const CheckboxComponent = ({ label, register, checkboxRef }) => {
    return (
        <label style={{ display: "flex", alignItems: "center" }}>
            <input
                type="checkbox"
                {...register(checkboxRef)}
                style={{
                    marginRight: "10px",
                }}
            />
            {label}
        </label>
    );
};

export default CheckboxComponent;