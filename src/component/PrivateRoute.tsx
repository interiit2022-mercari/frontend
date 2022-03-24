import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// Use like Route
export default function PrivateRoute(props: any) {
  let auth = useAuth();
  let { children, role, ...rest } = props;
  let render = (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );

  if (auth !== null && auth.user) {
    if (role !== undefined) {
      if (auth.user.role === role) {
        render = props.children;
      } else {
        render = (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        );
      }
    } else {
      render = props.children;
    }
  }

  return <Route {...rest} render={({ location }) => render} />;
}
