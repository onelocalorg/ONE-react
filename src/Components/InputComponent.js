import React from "react";
// import style from "../Styles/InputComponent.module.css";

const InputComponent = ({
  type,
  placeholder,
  register,
  inputRef,
  style,
  id,
  value,
  name,
  className,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(inputRef)}
        style={{ style }}
        value={value}
        id={id}
        name={name}
        className={className}
      />
    </>
  );
};

export default InputComponent;
