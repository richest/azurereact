import React from "react";
import { useSelector } from "react-redux";

import MapContainer from "components/google-map";
import FilterCards from "./filter-cards";

import style from "./integration-cards.module.scss";

const MapIntegrationCards = () => {
  const {
    searchFilterData: { property },
  } = useSelector((state) => state.auth);

  return (
    <div className={style.main}>
      {property?.length > 0 ? (
        <div className={style.mapPage}>
          <div className={style.map}>
            <MapContainer propertyList={property} />
          </div>
          <div className={style.cards}>
            <FilterCards propertyList={property} />
          </div>
        </div>
      ) : (
        <h1 className={style.noDataFound}> No Result Found</h1>
      )}
    </div>
  );
};

export default MapIntegrationCards;
