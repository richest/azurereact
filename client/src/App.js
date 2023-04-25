/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import axios from "utils/axios";
import Routes from "routes";
import { fetchUserId } from "utils/end-points";
import { fetchUser } from "redux/actions/actions";

const App = () => {
  const { userId, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const publishKey =
    "pk_test_51KyVHuJpuVkixyxX3AeXBUhfHMRiVBXTWYbxH1hpHhiLcCUc8pBM8nK5tRZPfNmUxaPuT4VEdOVTxwuc7FMLzSgQ00eADcN2Uu";
  const stripePromise = loadStripe(publishKey);

  const handleFetchUser = async () => {
    try {
      const res = await axios.get(fetchUserId(userId));
      dispatch(fetchUser(res.data));
    } catch (res) {}
  };
  useEffect(() => {
    if (userId) handleFetchUser();
  }, [userId]);

  return (
    <>
      <Elements stripe={stripePromise}>
        <Routes isLogin={!!token} />
      </Elements>
    </>
  );
};

export default App;
