import React from "react";

import Button from "components/button";

import style from "./search.module.scss";

const BathModal = ({ setOpenBath }) => {
  return (
    <>
      <div
        onClick={() => setOpenBath(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "transparent",
          zIndex: 1500,
        }}
      ></div>

      <div className={style.priceRange}>
        <p className={style.price}>Bath</p>
        <div className={style.modalCounter}>
          <div className={style.modalFlex}>
            <p style={{ borderRight: "1px solid #6457df" }}>1+</p>
            <p style={{ borderRight: "1px solid #6457df" }}>2+</p>
            <p>3+</p>
          </div>
        </div>
        <Button title="4 or more" className={style.btn2} />
      </div>
    </>
  );
};

export default BathModal;
