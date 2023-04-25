import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Button from "components/button";
import TextField from "components/text-field";
import style from "./plan-modal.module.scss";

const PlanModal = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [errorsMsg, setErrorsMsg] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onChangeStripe = (e, index) => {
    const temp = [...errorsMsg];
    if (e.error) {
      temp[index] = e.error.message;
      setErrorsMsg([...temp]);
    } else {
      temp[index] = "";
      setErrorsMsg([...temp]);
    }
  };

  const formSubmit = (data) => {
    stripeSubmit(data);
  };

  const stripeSubmit = async (data) => {
    if (!stripe || !elements) {
      return false;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        return false;
      } else {
        if (paymentMethod) {
          console.log(paymentMethod);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <CardNumberElement
            className={style.cardNum}
            onChange={(e) => onChangeStripe(e, 0)}
            options={{
              placeholder: "4511 1111 1111 1111",
              ...option,
            }}
          />
          <small className="error" style={{ color: "#df2244" }}>
            {errorsMsg[0] && errorsMsg[0]}
          </small>
        </div>

        <div className={style.cvcField}>
          <div style={{ width: "50%" }}>
            <CardExpiryElement
              className={style.expireDate}
              onChange={(e) => onChangeStripe(e, 1)}
              options={{
                placeholder: "mm/yy",
                ...option,
              }}
            />
            <small className="error" style={{ color: "#df2244" }}>
              {errorsMsg[1] && errorsMsg[1]}
            </small>
          </div>

          <div style={{ width: "50%" }}>
            <CardCvcElement
              className={style.cvcFieldInput}
              onChange={(e) => onChangeStripe(e, 2)}
              options={{
                placeholder: "cvc",
                ...option,
              }}
            />
            <small className="error" style={{ color: "#df2244" }}>
              {errorsMsg[2] && errorsMsg[2]}
            </small>
          </div>
        </div>
        <TextField
          name={"userName"}
          register={register}
          error={errors?.userName}
          errorMessage={errors?.userName?.message}
          placeholder={"Card Holder Name"}
          inputDivStyle={style.inputDivStyle}
        />
        <TextField
          name={"zipCode"}
          register={register}
          error={errors?.zipCode}
          errorMessage={errors?.zipCode?.message}
          placeholder={"Zip Code"}
          inputDivStyle={style.inputDivStyle}
        />
        <TextField
          name={"email"}
          register={register}
          error={errors?.email}
          errorMessage={errors?.email?.message}
          placeholder={"Email Address"}
          inputDivStyle={style.inputDivStyle}
        />

        <div className={style.payBtnDiv}>
          <Button title={"Pay"} className={style.payBtn} type={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default PlanModal;

const option = {
  style: {
    base: {
      fontSize: "16px",
      color: "#9097A2",
      "::placeholder": {
        color: "#989898",
      },
    },
    invalid: {
      color: "#ED3E2E",
    },
  },
};

const schema = yup.object().shape({
  userName: yup.string().required(),
  zipCode: yup.string().required().min(4).max(4),
  email: yup.string().email().required(),
});
