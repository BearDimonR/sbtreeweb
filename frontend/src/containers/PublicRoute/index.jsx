import React from "react";
import { Route } from "react-router-dom";
import PageContainer from "../PageContainer";

const PublicRoute = ({ component: Component, container, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (container) {
          return <PageContainer component={Component} />
        }
        return <Component {...props} {...rest} />;
      }}
    />
  );
};

export default PublicRoute;
