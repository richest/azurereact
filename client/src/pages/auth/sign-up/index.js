import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import TextField from "components/text-field";
import Button from "components/button";
import axios from "utils/axios";
import { sign_up } from "utils/end-points";
import { authAction } from "redux/actions/actions";
import { createNotification } from "common/create-notification";

import style from "./signup.module.scss";
import bg from "assets/auth-bg.png";
import facebook from "assets/fb.svg";
import twitter from "assets/google.svg";
import instagram from "assets/twitter.svg";

const SignUp = () => {
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
      const res = await axios.post(sign_up, { ...data });
      dispatch(authAction(res.data, res.headers.authorization));
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
          <h6>Register account</h6>
          <p className={style.title}>Get your Rent Potential account now. </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="User name"
              type="text"
              name="name"
              placeholder="Enter username"
              className={style.field}
              register={register}
              errorMessage={errors?.name?.message}
            />

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
            <p className={style.title} style={{ marginTop: "20px" }}>
              By registering you agree to the Skote
              <span className={style.signUp} style={{ cursor: "pointer" }}>
                {" "}
                Terms of Use
              </span>
            </p>

            <Button
              title="Register"
              className={style.btn}
              isLoading={isLoading}
            />
          </form>

          <p className={style.sign}>Sign up using</p>

          <div className={style.flex}>
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={instagram} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

const schema = yup.object({
  email: yup
    .string()
    .email("please enter valid email")
    .required("email is required"),
  name: yup
    .string()
    .required("username is required")
    .min(3, "username must be at least 3 characters"),
  password: yup.string().required("password is required").min(6),
});
