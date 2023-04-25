/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TextField from "components/text-field";
import Button from "components/button";
import { FilterContext } from "context/search-filter-context";

import style from "./search.module.scss";

const PriceRangeModal = ({ setOpenPrice }) => {
  const { priceMinMax, setPriceMinMax } = useContext(FilterContext);
  const [error, setError] = useState("");
  const { handleSubmit, register, reset } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    const { priceMax, priceMin } = data;
    if (priceMax !== "" && Number(priceMax) < Number(priceMin)) {
      setError("Max value must be greater than Min value");
    } else {
      setPriceMinMax({ ...data });
      setOpenPrice(false);
      setError("");
    }
  };

  useEffect(() => {
    reset({ ...priceMinMax });
  }, [priceMinMax]);

  return (
    <>
      <div
        onClick={() => setOpenPrice(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "transparent",
          zIndex: 1500,
        }}
      ></div>

      <div className={style.priceRange}>
        <div>
          <p className={style.price}>Price Range</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.flex}>
              <TextField
                name="priceMin"
                label="MIN"
                placeholder="MIN"
                className={style.field}
                type="number"
                register={register}
              />
              <TextField
                name="priceMax"
                label="MAX"
                placeholder="MAX"
                type="number"
                register={register}
                errorMessage={error}
              />
            </div>
            <Button title="Done" className={style.btn2} />
          </form>
        </div>
      </div>
    </>
  );
};

export default PriceRangeModal;
