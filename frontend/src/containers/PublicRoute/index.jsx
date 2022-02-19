import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const access = useState((state) => state.profile.access);
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
