import React from "react";
import style from "../Styles/InputComponent.module.css";

const InputComponent = ({
  type,
  placeholder,
  register,
  inputRef,
  registerOptions,
}) => {
  return (
    <>
      <input
        className={style.input}
        type={type}
        placeholder={placeholder}
        {...register(inputRef, registerOptions)}
      />
    </>
  );
};

export default InputComponent;
