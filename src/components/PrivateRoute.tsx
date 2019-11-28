import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useGlobalState } from "../storeProvider";

const PrivateRoute: React.FC = ({ Component, ...rest }: any) => {
  const state = useGlobalState();

  return (
    <Route
      {...rest}
      render={props =>
        state.isLogged ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
      }
    />
  );
};

export default PrivateRoute;
