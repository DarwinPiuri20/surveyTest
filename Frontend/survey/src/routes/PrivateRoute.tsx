import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import type {JSX} from "react";

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const {token}= useAuth();
    return token ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;