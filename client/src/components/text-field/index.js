import React from "react";

import style from "./textfield.module.scss";

const TextField = ({
  label,
  searchIcon,
  icon,
  placeholder,
  name,
  handleClick,
  handleChange,
  type,
  className,
  errorMessage,
  error,
  register,
  readyOnly,
  disabled,
  handleIconClick,
  value,
  styleField,
  inputDivStyle,
  ...restOfProps
}) => {
  const handleKeyDown = (e) => {
    const symbolArr = ["e"];
    if (symbolArr.includes(e.key)) {
      e.preventDefault();
    } else {
      return false;
    }
  };

  return (
    <div
      className={`${style.textFieldWrapper} ${className}`}
      style={styleField}
    >
      {label && <label>{label}</label>}
      <div className={style.inputDiv} onClick={handleClick && handleClick}>
        <input
          type={type || "text"}
          className={inputDivStyle}
          placeholder={placeholder}
          name={name || ""}
          value={value && value}
          onChange={handleChange && handleChange}
          style={{
            paddingLeft: searchIcon ? "54px" : "",
            paddingRight: icon && "45px",
            borderColor: errorMessage ? "#df2244" : "#e5e7e8",
            background: disabled && "#E5E7E8",
          }}
          {...(register && register(name))}
          onKeyPress={type === "number" ? handleKeyDown : undefined}
          disabled={disabled || false}
          readOnly={readyOnly || false}
        />
        {icon && (
          <img
            src={icon}
            alt=""
            className={style.icon}
            onClick={handleIconClick && handleIconClick}
          />
        )}
      </div>
      {errorMessage && (
        <span className={style.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default TextField;
