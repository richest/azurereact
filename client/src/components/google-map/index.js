import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

import style from "./map.module.scss";
import laptopImg from "assets/blog.jpg";

export const MapContainer = ({ google, propertyList }) => {
  const list = propertyList;

  const [selectedElement, setSelectedElement] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow] = useState(true);

  const handleClick = (marker, ele) => {
    setActiveMarker(marker);
    setSelectedElement(ele);
  };

  useEffect(() => {
    setSelectedElement({});
  }, []);

  return (
    <>
      <Map
        google={google}
        zoom={14}
        initialCenter={{
          lat: list?.length > 0 && Number(list[0]?.location?.latitude),
          lng: list?.length > 0 && Number(list[0]?.location?.longitude),
        }}
        center={{
          lat: list?.length > 0 && Number(list[0]?.location?.latitude),
          lng: list?.length > 0 && Number(list[0]?.location?.longitude),
        }}
        containerStyle={mapStyle}
        zoomControl={false}
        fullscreenControl={false}
        scaleControl={false}
        streetViewControl={false}
      >
        {list?.length &&
          list?.map((ele, index) => (
            <Marker
              key={index}
              name={"Your position"}
              onClick={(props, marker) => {
                handleClick(marker, ele);
              }}
              position={{
                lat: ele?.location?.latitude && Number(ele?.location?.latitude),
                lng:
                  ele?.location?.longitude && Number(ele?.location?.longitude),
              }}
            />
          ))}
        {Object.keys(selectedElement)?.length && (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            onCloseClick={() => {
              setSelectedElement({});
            }}
          >
            <div className={style.mainDiv}>
              <div className={style.imgDiv}>
                <img src={laptopImg} alt="" />
              </div>
              <div className={style.contentDiv}>
                <p className={style.price}>
                  ${" "}
                  {selectedElement?.sale?.amount?.saleamt
                    ? Number(
                        selectedElement?.sale?.amount?.saleamt
                      ).toLocaleString()
                    : "--"}
                </p>
                <p className={style.bedBath}>
                  {selectedElement?.building?.rooms?.beds || "--"} bd,{" "}
                  {selectedElement?.building?.rooms?.bathstotal || "--"} bt
                </p>
                <p className={style.bedBath}>
                  {selectedElement?.building?.size?.universalsize || "--"} sqft
                </p>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API_KEY,
})(MapContainer);

const mapStyle = {
  width: "100%",
  height: "100%",
};
