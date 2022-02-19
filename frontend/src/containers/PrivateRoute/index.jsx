import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageContainer from "../PageContainer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const access = useSelector((state) => state.profile.access);
  return (
    <Route
      {...rest}
      render={() =>
        access ? (
          <PageContainer component={Component} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
