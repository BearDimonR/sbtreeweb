import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageContainer from "../PageContainer";

const PrivateRoute = ({ component: Component, container, ...rest }) => {
  const location = useLocation();
  const access = useSelector((state) => state.profile.access);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!access) {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        } else if (container) {
          return <PageContainer component={Component} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
