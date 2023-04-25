import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "components/button";
import TextField from "components/text-field";
import PriceRangeModal from "./price-range-modal";
import BedModal from "./bed-modal";
import LotSquareFeet from "./lot-square-feet-modal";
import { FilterContext } from "context/search-filter-context";

import style from "./search.module.scss";
import HomeType from "./home-type";

const SearchFilters = () => {
  const [openPrice, setOpenPrice] = useState(false);
  const [homeTypeFilter, setHomeTypeFilter] = useState(false);

  const [openBed, setOpenBed] = useState(false);
  // const [openBath, setOpenBath] = useState(false);
  const [openSquare, setOpenSquare] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const {
    homeType,
    priceMinMax,
    lotMinMax,
    bedsMinMax,
    setHomeType,
    handleClearFilter,
    handleFetchResult,
  } = useContext(FilterContext);

  const { search } = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInpVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetchResult(inpVal);
    navigate(`/filters-page?search=${inpVal}`);
  };

  useEffect(() => {
    setInpVal(search?.split("?search=")[1]?.replace(/%20/g, " "));
  }, [search]);

  return (
    <>
      <div className={style.main}>
        <form className={style.fieldDiv} onSubmit={handleSubmit}>
          <TextField
            placeholder="Enter an Address, City or Postal Code"
            type="text"
            className={style.field}
            value={inpVal}
            handleChange={handleChange}
          />
          <Button title="Search" className={style.btn} />
        </form>

        <div className={style.filtersDiv}>
          <div style={{ position: "relative" }}>
            <Button
              title="Price"
              className={`${style.btn3} ${priceMinMax?.priceMin || priceMinMax.priceMin
                ? style.active
                : ""
                } `}
              handleClick={() => setOpenPrice(true)}
            />

            {openPrice && <PriceRangeModal setOpenPrice={setOpenPrice} />}
          </div>
          <div style={{ position: "relative" }}>
            <Button
              title="Bed"
              className={`${style.btn1} ${bedsMinMax?.bedsMin || bedsMinMax.bedsMax ? style.active : ""
                } `}
              handleClick={() => setOpenBed(true)}
            />
            {openBed && <BedModal setOpenBed={setOpenBed} />}
          </div>

          {/* <div style={{ position: "relative" }}>
            <Button
              title="Bath"
              className={style.btn1}
              handleClick={() => setOpenBath(true)}
            />
            {openBath && <BathModal setOpenBath={setOpenBath} />}
          </div> */}

          <div style={{ position: "relative" }}>
            <Button
              title="Home type"
              className={`${style.btn1} ${homeType ? style.active : ""} `}
              handleClick={() => setHomeTypeFilter(true)}
            />
            {homeTypeFilter && (
              <HomeType
                setHomeTypeFilter={setHomeTypeFilter}
                setHomeType={setHomeType}
                homeType={homeType}
              />
            )}
          </div>

          <div style={{ position: "relative" }}>
            <Button
              title="Lot Square Feet"
              className={`${style.btn1} ${lotMinMax?.lotMin || lotMinMax.lotMax ? style.active : ""
                } `}
              handleClick={() => setOpenSquare(true)}
            />

            {openSquare && <LotSquareFeet setOpenSquare={setOpenSquare} />}
          </div>

          <Button
            title="Clear Filters"
            className={style.btn1}
            handleClick={handleClearFilter}
          />
        </div>
      </div>
    </>
  );
};

export default SearchFilters;
