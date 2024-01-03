import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
    const user = useAuth();
    if (user && user.user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedLayout;
