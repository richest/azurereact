import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "components/navbar";
import Container from "components/container";
import TextField from "components/text-field";
import Button from "components/button";
import { fetchSearchFilter } from "redux/actions/actions";

import style from "./home.module.scss";

const HomePage = () => {
  const [inpVal, setInpVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      search: inpVal,
      page: 1,
      pageSize: 20,
    };
    if (inpVal.length) {
      dispatch(fetchSearchFilter(params, setIsLoading, navigate));
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.header_wrapper}>
        <Container>
          <div className={style.header_container}>
            <h1>Find your next flip or rental property.</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                placeholder="Enter an Address, City or Postal Code"
                className={style.field}
                handleChange={(e) => setInpVal(e.target.value)}
              />
              <div className={style.btnDiv}>
                <Button
                  title="SEARCH"
                  className={style.searchBtn}
                  isLoading={isLoading}
                  disabled={!inpVal?.length}
                />
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
