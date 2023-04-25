import {
  LOGIN,
  LOGOUT,
  SEARCH_FILTER_DATA,
  USER,
} from "../constants/constants";

const initState = {
  token: sessionStorage.getItem("rentalAuthToken") || null,
  userId: sessionStorage.getItem("userId") || null,
  userData: {},
  searchFilterData: {},
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        userData: { ...payload.userData },
        token: payload.token,
        userId: payload.userData.userId,
      };

    case USER:
      return {
        ...state,
        userData: { ...payload },
      };
    case SEARCH_FILTER_DATA:
      return {
        ...state,
        searchFilterData: { ...payload },
      };
    case LOGOUT:
      return {
        ...state,
        userData: {},
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};
