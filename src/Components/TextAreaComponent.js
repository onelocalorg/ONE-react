import React from "react";

const TextAreaComponent = ({
  placeholder,
  register,
  inputRef,
  style,
  id,
  value,
  name,
  className,
  disabled,
  // rows,
  // cols,
}) => {
  return (
    <>
      <textarea
        placeholder={placeholder}
        value={value}
        style={{ style }}
        id={id}
        name={name}
        className={className}
        disabled={disabled}
        {...register(inputRef)}
        // rows={rows || "3"}
        // cols={cols || "50"}
      />
    </>
  );
};

export default TextAreaComponent;
