//@ts-nocheck

import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router";
import { api } from "../AxiosInstants";
import { useAuthValidator } from "../store";

export const AuthGuard = ({ children, url, requiresAuth }) => {
    const { isAuthenticate, handleAuthenticate, handleUserDetails } = useAuthValidator((state) => state)

    if (requiresAuth && !isAuthenticate) {
        return <Navigate to={url} />;
    }

    if (!requiresAuth && isAuthenticate) {
        return <Navigate to={url} />;
    }

    return children;
};