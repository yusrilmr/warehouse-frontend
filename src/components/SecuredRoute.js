/* eslint-disable */
import React from "react";
import { Route, Redirect } from "react-router-dom";
const SecuredRoute = ({ children, ...rest }) => {
    return (
        <Route {...rest} render={({ location }) =>
                sessionStorage.getItem("jwt") ? (children) : (
                    <Redirect to={{ pathname: "/", state: { from: location } }} />
                )
        } />
    );
};
export default SecuredRoute;