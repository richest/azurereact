import React, { useState } from "react";

import Navbar from "components/navbar";
import Button from "components/button";

import style from "./plan.module.scss";
import Container from "components/container";
import Modal from "components/modal";
import PlanModal from "./plan-modal";

const Plans = () => {
  const [open, setOpen] = useState(false);

  const handleBuyClick = (amount) => {
    setOpen(true);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div className={style.gridDiv}>
          {planCards.map((ele, index) => (
            <div key={index} className={style.cardDiv}>
              <h1>{ele.heading}</h1>
              <p className={style.body}>{ele.body}</p>
              <h6>{ele.price}</h6>
              {ele.btnText && (
                <Button
                  title={"Buy"}
                  className={style.buyButton}
                  handleClick={() => handleBuyClick(ele.amount)}
                />
              )}
            </div>
          ))}
        </div>

        <Modal open={open} handleClose={() => setOpen(false)}>
          <PlanModal />
        </Modal>
      </Container>
    </div>
  );
};

export default Plans;

const planCards = [
  {
    heading: "Free Trail",
    body: "One report per calculator",
    price: "$free",
  },
  {
    heading: "Standard Plan",
    body: "10 reports per calculator",
    price: "$10/per month",
    amount: 10,
    btnText: "Buy",
  },
  {
    heading: "Permium Plan ",
    body: "Unlimited reports per calculator",
    price: "$20/per month",
    btnText: "Buy",
    amount: 20,
  },
];
