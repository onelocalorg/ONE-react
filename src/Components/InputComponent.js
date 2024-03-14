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
  ...restprops
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        style={{ style }}
        id={id}
        className={className}
        disabled={disabled}
        accept={accept}
        {...restprops}
        name={name}
        {...register(inputRef)}
      />
    </>
  );
};

export default InputComponent;
