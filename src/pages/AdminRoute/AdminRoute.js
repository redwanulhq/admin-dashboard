import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, admin } = useAuth();
    console.log(admin, isLoading);
    let location = useLocation();
    if (isLoading) {
        return <h4 className="loading">Loading...</h4>;
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
