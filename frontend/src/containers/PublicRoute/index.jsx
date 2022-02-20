import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const access = useSelector((state) => state.profile.access);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (access) {
          return (
            <Redirect
              to={{ pathname: "/home", state: { from: props.location } }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
