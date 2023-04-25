import React, { useContext } from "react";

import Navbar from "components/navbar";
import SearchFilters from "./search-filters";
import Container from "components/container";
import MapIntegrationCards from "./map-integration-cards";

import style from "./filters.module.scss";
import Loading from "components/loading";
import { FilterContext } from "context/search-filter-context";

const FiltersPage = () => {
  const { loading } = useContext(FilterContext);

  return (
    <>
      <Navbar />
      {loading && (
        <div className={style.bgLoader}>
          <Loading loaderClass={style.loadingClass} />
        </div>
      )}

      <div className={style.bg}>
        <Container>
          <SearchFilters />
          <MapIntegrationCards />
        </Container>
      </div>
    </>
  );
};

export default FiltersPage;
