import {
  LOGIN,
  LOGOUT,
  SEARCH_FILTER_DATA,
  USER,
} from "../constants/constants";
import axios from "utils/axios";
import { homeSearch } from "utils/end-points";
import { createNotification } from "common/create-notification";

// Login
export const authAction = (userData, token) => {
  sessionStorage.setItem("userId", userData.userId);
  sessionStorage.setItem("rentalAuthToken", token);
  return {
    type: LOGIN,
    payload: { userData, token },
  };
};

export const fetchUser = (userData) => {
  return {
    type: USER,
    payload: userData,
  };
};
// Fetch User
export const fetchSearchFilter =
  (params, setLoading, navigate) => async (dispatch) => {
    setLoading && setLoading(true);
    try {
      const res = await axios.get(homeSearch, { params });
      navigate && navigate(`/filters-page?search=${params.search}`);

      dispatch({ type: SEARCH_FILTER_DATA, payload: res.data });
    } catch (err) {
      if (err.response.data.msg) {
        createNotification("error", "Error", "No Data Found", 1500);
      }
    }
    setLoading && setLoading(false);
  };

// Logout
export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
