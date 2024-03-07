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
  disabled,
  accept,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        style={{ style }}
        id={id}
        className={className}
        disabled={disabled}
        accept={accept}
        {...register(inputRef)}
      />
    </>
  );
};

export default InputComponent;
