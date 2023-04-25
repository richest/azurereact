import React from "react";

import laptopImg from "assets/blog.jpg";
import style from "./view-card.module.scss";

const ViewFilterCard = ({ propertyList }) => {
  return (
    <>
      <div className={style.cardsModal}>
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
              </div>
            </div>
            <div className={style.flex}>
              <button className={style.btn1}>Rehab Calculator</button>
              <button className={style.btn2}>Rental Calculator</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewFilterCard;
