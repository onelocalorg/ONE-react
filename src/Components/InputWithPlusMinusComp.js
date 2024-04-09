/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { HiMiniMinusSmall } from "react-icons/hi2";
import { HiPlusSmall } from "react-icons/hi2";

const InputWithPlusAndMinusComponent = ({
  type,
  placeholder,
  register,
  inputRef,
  id,
  name,
  className,
  boundary,
  classNamebtn1,
  classNamebtn2,
  setValue,
  defaultValue,
}) => {
  const [value, setCounter] = useState(defaultValue);

  const handleIncrement = () => {
    setCounter((prevValue) =>
      prevValue < boundary ? prevValue + 1 : prevValue
    );
  };

  const handleDecrement = () => {
    setCounter((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };
  useEffect(() => {
    setValue(inputRef, value);
  }, [value]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <button
        onClick={handleDecrement}
        className={classNamebtn1}
        type="button"
        disabled={value === defaultValue ? true : false}
      >
        <HiMiniMinusSmall />
      </button>
      <div className={className}>{value}</div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(inputRef, { value: value })}
        style={{ display: "none" }}
        value={value}
        id={id}
        name={name}
        onChange={(e) => setValue(e.target.value)} // Update value on change
      />
      <button
        onClick={handleIncrement}
        className={classNamebtn2}
        type="button"
        disabled={value === boundary ? true : false}
      >
        <HiPlusSmall />
      </button>
    </div>
  );
};

export default InputWithPlusAndMinusComponent;
