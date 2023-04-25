/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchSearchFilter } from "redux/actions/actions";

export const FilterContext = createContext({});

const priceObj = {
  priceMin: "",
  priceMax: "",
};
const lotObj = {
  lotMin: "",
  lotMax: "",
};
const bedsObj = {
  bedsMin: "",
  bedsMax: "",
};

const SearchFilterContext = ({ children }) => {
  const [priceMinMax, setPriceMinMax] = useState({ ...priceObj });
  const [lotMinMax, setLotMinMax] = useState({ ...lotObj });
  const [bedsMinMax, setBedsMinMax] = useState({ ...bedsObj });
  const [sort, setSort] = useState("Asc");
  const [homeType, setHomeType] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [loading, setLoading] = useState(false);

  const pageSize = 20;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { search } = useLocation();

  // clear Filter
  const handleClearFilter = () => {
    setPriceMinMax(priceObj);
    setLotMinMax(lotObj);
    setBedsMinMax(bedsObj);
    setHomeType("");
    setOrderBy("");
    setPage(1);
  };

  const handleSort = () => {
    if (sort === "Asc") {
      setSort("Desc");
    } else {
      setSort("Asc");
    }
  };

  // fetch result
  const handleFetchResult = (inpSearch) => {
    const params = {
      search: inpSearch || search?.split("?search=")[1]?.replace(/%20/g, " "),
      page: page,
      pageSize: pageSize,
      latitude: "",
      longitude: "",
      priceMin: priceMinMax.priceMin,
      priceMax: priceMinMax.priceMax,
      bedsMin: bedsMinMax.bedsMin,
      bedsMax: bedsMinMax.bedsMax,
      homeType: homeType === "Home type" ? "" : homeType,
      lotMin: lotMinMax.lotMin,
      lotMax: lotMinMax.lotMax,
      orderBy: orderBy === "Default" ? "" : orderBy,
      sort: sort.toLocaleLowerCase(),
    };
    dispatch(fetchSearchFilter(params, setLoading));
  };

  useEffect(() => {
    setPage(1);
    handleFetchResult();
  }, [priceMinMax, bedsMinMax, lotMinMax, homeType, orderBy, sort]);

  useEffect(() => {
    handleFetchResult();
  }, [page, pageSize]);

  return (
    <FilterContext.Provider
      value={{
        priceMinMax,
        lotMinMax,
        bedsMinMax,
        homeType,
        orderBy,
        page,
        pageSize,
        sort,
        setPriceMinMax,
        setLotMinMax,
        setHomeType,
        setOrderBy,
        setBedsMinMax,
        handleClearFilter,
        setPage,
        handleFetchResult,
        handleSort,
        loading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default SearchFilterContext;
