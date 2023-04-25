/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FilterContext } from "context/search-filter-context";
import Button from "components/button";
import TextField from "components/text-field";

import style from "./search.module.scss";

const BedModal = ({ setOpenBed }) => {
  const { setBedsMinMax, bedsMinMax } = useContext(FilterContext);
  const [error, setError] = useState("");

  const { handleSubmit, register, reset } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    const { bedsMax, bedsMin } = data;
    if (bedsMax !== "" && Number(bedsMax) < Number(bedsMin)) {
      setError("Max value must be greater than Min value");
    } else {
      setBedsMinMax({ ...data });
      setOpenBed(false);
      setError("");
    }
  };

  useEffect(() => {
    reset({ ...bedsMinMax });
  }, [bedsMinMax]);

  return (
    <>
      <div
        onClick={() => setOpenBed(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "transparent",
          zIndex: 1500,
        }}
      ></div>

      <div className={style.priceRange}>
        <div>
          <p className={style.price}>Bed</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.flex}>
              <TextField
                name="bedsMin"
                label="MIN"
                placeholder="MIN"
                className={style.field}
                type="number"
                register={register}
              />

              <TextField
                name="bedsMax"
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

export default BedModal;
