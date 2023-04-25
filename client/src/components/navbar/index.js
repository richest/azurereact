import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "components/container";
import Button from "components/button";
import { logoutUser } from "redux/actions/actions";

import style from "./navbar.module.scss";
import logo from "assets/logo.jpeg";

const Navbar = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("rentalAuthToken");
    dispatch(logoutUser());
  };

  return (
    <Container>
      <div className={style.main}>
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <div className={style.flex}>
          {!token ? (
            <>
              <Link to="/login">
                <Button title="LOGIN" className={style.btn} />
              </Link>
              <Link to="/sign-up">
                <Button title="SIGN UP" className={style.btn} />
              </Link>
            </>
          ) : (
            <Button
              title="LOGOUT"
              className={style.btn}
              handleClick={handleLogout}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
