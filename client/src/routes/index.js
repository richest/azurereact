import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import Login from "pages/auth/login";
import SignUp from "pages/auth/sign-up";
import HomePage from "pages/home-page";
import FiltersPage from "pages/filters-page";
import SearchFilterContext from "context/search-filter-context";
import Plans from "pages/plans";

const Routes = ({ isLogin }) => {
  return (
    <>
      {!isLogin ? (
        <Switch>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/filters-page"
            element={
              <SearchFilterContext>
                <FiltersPage />
              </SearchFilterContext>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/filters-page"
            element={
              <SearchFilterContext>
                <FiltersPage />
              </SearchFilterContext>
            }
          />
          <Route path="/plan" element={<Plans />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Switch>
      )}
    </>
  );
};

export default Routes;
