import { useLoaderData, Await, Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import { Alert, LinearProgress } from "@mui/material";

const AuthLayout: React.FC = () => {
    // @ts-expect-error No error expected
    const { initPromise } = useLoaderData();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Await resolve={initPromise} errorElement={<Alert severity="error">Something went wrong!</Alert>}>
                {() => <Outlet />}
            </Await>
        </Suspense>
    );
};

export default AuthLayout;
