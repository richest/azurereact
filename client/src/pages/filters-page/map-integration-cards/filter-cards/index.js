/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Pagination from "components/pagination";
import ViewCardModal from "./view-card-model/index";
import { FilterContext } from "context/search-filter-context";

import style from "./filter-card.module.scss";
import laptopImg from "assets/calculator.jpeg";
import asc from "assets/accending-decending.svg";

const FilterCards = ({ propertyList, cardsModal }) => {
  useContext(FilterContext);
  const [open, setOpen] = useState(false);
  const [singleData, setSingleData] = useState([]);

  const navigate = useNavigate();

  const { page, pageSize, setPage, orderBy, setOrderBy, handleSort, sort } =
    useContext(FilterContext);

  const {
    
    token,
    searchFilterData: { status },
  } = useSelector((state) => state.auth);

  const handleClick = (ind) => {
    const temp = [...propertyList];
    let s = [temp[ind]];
    setSingleData([...s]);
    setOpen(true);
  };

  const handleCalculatorClick = (calcStatus) => {
    if (token) {
      navigate("/plan");
    } else {
      navigate("/login");
    }
  };

  const handleSelectChange = (e) => {
    setOrderBy(e.target.value);
  };

  useEffect(() => {
    if (propertyList?.length === 1) {
      handleClick(0);
    }
  }, [propertyList]);

  return (
    <>
      {propertyList?.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "20px 0px",
            position: "sticky",
            top: "0px",
            padding: "10px",
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <p className={style.totalFilter}>{status.total} totals</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                marginRight: "15px",
              }}
            >
              <p className={style.totalFilter}>Sort By:</p>
              <select
                className={`${style.select} ${
                  orderBy !== "Default" && orderBy ? style.active_select : ""
                }`}
                name="orderBy"
                value={orderBy || "Default"}
                onChange={handleSelectChange}
              >
                {sortOptions.map((ele, index) => (
                  <option key={index} value={ele.value}>
                    {ele.description}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.flexx} onClick={handleSort}>
              <p>{sort}.</p>
              <img src={asc} alt="" />
            </div>
          </div>
        </div>
      )}

      <div className={`${style.cards_wrapper} ${cardsModal}`}>
        {propertyList?.map((ele, ind) => (
          <div className={style.cardDiv} key={ind}>
            <div>
              <div className={style.img}>
                <img src={laptopImg} alt="" />
              </div>
              <div style={{ padding: "10px 20px" }}>
                <p className={style.p}>
                  ${" "}
                  {ele?.sale?.amount?.saleamt
                    ? Number(ele?.sale?.amount?.saleamt).toLocaleString()
                    : "--"}
                </p>
                <p className={style.h1}>{ele?.address?.oneLine || "--"}</p>
                <p className={style.h1}>
                  {ele?.building?.rooms?.bathstotal || "--"}{" "}
                  {ele?.building?.rooms?.bathstotal > 1 ? "Baths" : "Bath"},{" "}
                  {ele?.building?.rooms?.beds || "--"}{" "}
                  {ele?.building?.rooms?.beds > 1 ? "Beds" : "Bed"}
                </p>
                <p className={style.h1}>{ele?.summary?.propclass}</p>
                <p className={style.h1}>
                  {`${ele?.building?.size?.universalsize || "--"} Sqft/${
                    ele?.summary?.propsubtype
                  } `}{" "}
                </p>

                <button
                  className={style.button}
                  onClick={() => handleClick(ind)}
                >
                  View More
                </button>
              </div>
            </div>

            <div className={style.flex}>
              <button
                className={style.btn1}
                onClick={() => handleCalculatorClick("rehab")}
              >
                Rehab Calculator
              </button>
              <button
                className={style.btn2}
                onClick={() => handleCalculatorClick("rental")}
              >
                Rental Calculator
              </button>
            </div>
          </div>
        ))}
      </div>

      <ViewCardModal open={open} setOpen={setOpen} propertyList={singleData} />

      {propertyList?.length > 0 && (
        <Pagination
          setPage={setPage}
          count={status?.total || 0}
          pageSize={pageSize}
          page={page}
        />
      )}
    </>
  );
};

export default FilterCards;

const sortOptions = [
  {
    value: "Default",
    description: "Default",
  },
  {
    value: "calendardate",
    description: "Calendar Date",
  },
  {
    value: "publisheddate",
    description: "Published Date",
  },
  {
    value: "propertytype",
    description: "Property Type",
  },
  {
    value: "saleamt",
    description: "Amount of Last Sale",
  },
  {
    value: "avmvalue",
    description: "Avm Value",
  },
  {
    value: "assdttlvalue",
    description: "Assessed Total Value",
  },
  {
    value: "salesearchdate",
    description: "Last sale date",
  },
  {
    value: "saletransactiondate",
    description: "Purchase Date",
  },
  {
    value: "beds",
    description: "Beds",
  },
  {
    value: "bathstotal",
    description: "Baths Total",
  },
  {
    value: "universalsize",
    description: "Universal Size",
  },
  {
    value: "lotsize1",
    description: "Lot Size Acres",
  },
  {
    value: "lotsize2",
    description: "Lot Square Feet",
  },
];
