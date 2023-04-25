/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import style from "./search.module.scss";

const HomeType = ({ setHomeTypeFilter, setHomeType, homeType }) => {
  const handleSelect = (value) => {
    setHomeType(value);
    setHomeTypeFilter(false);
  };
  return (
    <>
      <div
        onClick={() => setHomeTypeFilter(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "transparent",
          zIndex: 1500,
        }}
      ></div>

      <div
        className={style.priceRange}
        style={{ maxHeight: "400px", overflowY: "auto", padding: "20px 0" }}
      >
        <>
          {homeTypesOption?.map((ele, index) => (
            <p
              key={index}
              style={{ cursor: "pointer" }}
              className={`${style.homeType_p} ${
                homeType === ele && style.active_P
              }`}
              onClick={() => handleSelect(ele)}
            >
              {ele}
            </p>
          ))}
        </>
      </div>
    </>
  );
};

export default HomeType;

const homeTypesOption = [
  "AGRICULTURAL (NEC)",
  "APARTMENT",
  "CABIN",
  "CLUB",
  "COMMERCIAL (NEC)",
  "COMMERCIAL BUILDING",
  "COMMERCIAL CONDOMINIUM",
  "COMMON AREA",
  "CONDOMINIUM",
  "CONVERTED RESIDENCE",
  "COUNTY PROPERTY",
  "DUPLEX",
  "FARMS",
  "FAST FOOD FRANCHISE",
  "FEDERAL PROPERTY",
  "FOREST",
  "GROUP QUARTERS",
  "INDUSTRIAL (NEC)",
  "INDUSTRIAL PLANT",
  "MANUFACTURED HOME",
  "MARINA FACILITY",
  "MISCELLANEOUS",
  "MOBILE HOME",
  "MOBILE HOME LOT",
  "MOBILE HOME PARK",
  "MULTI FAMILY DWELLING",
  "NURSERY/HORTICULTURE",
  "OFFICE BUILDING",
  "PUBLIC (NEC)",
  "RELIGIOUS",
  "RESIDENTIAL (NEC)",
  "RESIDENTIAL ACREAGE",
  "RESIDENTIAL LOT",
  "RETAIL TRADE",
  "SFR",
  "STATE PROPERTY",
  "STORES & OFFICES",
  "STORES & RESIDENTIAL",
  "TAX EXEMPT",
  "TOWNHOUSE/ROWHOUSE",
  "TRIPLEX",
  "UTILITIES",
  "VACANT LAND (NEC)",
];
