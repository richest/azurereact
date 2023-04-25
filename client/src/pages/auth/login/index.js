import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import LoginWithGoogle from "components/google-auth";
import LoginWithFacebook from "components/facebook-auth";
import TextField from "components/text-field";
import Checkbox from "components/checkbox";
import Button from "components/button";
import axios from "utils/axios";
import { login } from "utils/end-points";
import { authAction } from "redux/actions/actions";
import { createNotification } from "common/create-notification";

import style from "./login.module.scss";
import bg from "assets/auth-bg.png";
// import facebook from "assets/fb.svg";
// import twitter from "assets/google.svg";
import instagram from "assets/twitter.svg";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(login, { ...data });
      const token = res.headers.authorization;
      dispatch(authAction(res.data, token));
    } catch (err) {
      createNotification("error", "Error", err?.response?.data?.msg);
    }
    setIsLoading(false);
  };

  return (
    <div className={style.main}>
      <div className={style.flexDiv}>
        <div className={style.imgDiv}>
          <img src={bg} alt="" />
        </div>

        <div className={style.detailsDiv}>
          <h6>Welcome Back !</h6>

          <p className={style.title}>Sign in to continue to Rent Potential. </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="text"
              name="email"
              placeholder="Enter email"
              className={style.field}
              register={register}
              errorMessage={errors?.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              className={style.field}
              register={register}
              errorMessage={errors?.password?.message}
            />

            <Checkbox label="Remember me" className={style.checkbox} />

            <Button
              title="Log In"
              className={style.btn}
              isLoading={isLoading}
            />
          </form>

          <p className={style.sign}>Sign in with</p>

          <div className={style.flex}>
            <LoginWithFacebook />
            <LoginWithGoogle />
            <img src={instagram} alt="" />
          </div>

          <p className={style.title}>
            Don't have an account?{" "}
            <Link to="/sign-up">
              <span className={style.signUp}>Signup now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

const schema = yup.object({
  email: yup
    .string()
    .email("please enter valid email")
    .required("email is required"),
  password: yup.string().required("password is required").min(6),
});
