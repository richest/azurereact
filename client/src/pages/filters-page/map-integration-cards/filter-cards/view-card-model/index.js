import React from "react";

import Modal from "components/modal";
import ViewFilterCard from "./view-filter-card";
import MapContainer from "components/google-map";

import style from "./view-card.module.scss";

const ViewCardModal = ({ open, setOpen, propertyList }) => {
  return (
    <div className={style.priceRange}>
      {" "}
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        className={style.modalFilter}
      >
        <div className={style.mapPage}>
          <div className={style.map}>
            <MapContainer propertyList={propertyList} />
          </div>
          <div className={style.cards}>
            <ViewFilterCard propertyList={propertyList} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewCardModal;
