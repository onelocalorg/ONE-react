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
        {...register(inputRef)}
        placeholder={placeholder}
        name={name}
        value={value}
        style={{ style }}
        id={id}
        className={className}
        disabled={disabled}
        accept={accept}
        {...restprops}
      />
    </>
  );
};

export default InputComponent;
