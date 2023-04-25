import React from "react";
import style from "./checkbox.module.scss";

const Checkbox = ({
  name,
  handleChange,
  checked,
  readOnly,
  className,
  register,
  label,
}) => {
  return (
    <label className={`${style.container} ${className}`}>
      <input
        type="checkbox"
        name={name}
        // onClick={handleChange && handleChange}
        onChange={handleChange && handleChange}
        checked={checked}
        readOnly={readOnly || false}
        {...(register && register(name))}
      />
      <span className={style.checkmark}></span>
      {label && <p> {label}</p>}
    </label>
  );
};

export default Checkbox;
