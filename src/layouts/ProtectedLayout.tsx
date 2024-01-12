import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Protected layout component to redirect guest users to login page when attempting
 * to visit a protected page (i.e. pages which require authentication)
 *
 * @returns {React.FunctionComponent} The ProtectedLayout component
 */
const ProtectedLayout: React.FC = () => {
    const user = useAuth();
    if (user && user.user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedLayout;
