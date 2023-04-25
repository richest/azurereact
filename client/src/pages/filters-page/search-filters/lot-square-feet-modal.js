/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TextField from "components/text-field";
import Button from "components/button";
import { FilterContext } from "context/search-filter-context";

import style from "./search.module.scss";

const LotSquareFeet = ({ setOpenSquare }) => {
  const { lotMinMax, setLotMinMax } = useContext(FilterContext);
  const [error, setError] = useState("");

  const { handleSubmit, register, reset } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    const { lotMax, lotMin } = data;
    if (lotMax !== "" && Number(lotMax) < Number(lotMin)) {
      setError("Max value must be greater than Min value");
    } else {
      setLotMinMax({ ...data });
      setOpenSquare(false);
      setError("");
    }
  };

  useEffect(() => {
    reset({ ...lotMinMax });
  }, [lotMinMax]);

  return (
    <>
      <div
        onClick={() => setOpenSquare(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "transparent",
          zIndex: 1500,
        }}
      ></div>

      <div className={style.priceRange} style={{ left: "-130%" }}>
        <p className={style.price}>Lot Square Feet Range</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.flex}>
            <TextField
              name="lotMin"
              label="MIN"
              placeholder="MIN"
              className={style.field}
              type="number"
              register={register}
            />
            <TextField
              name="lotMax"
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
    </>
  );
};

export default LotSquareFeet;
