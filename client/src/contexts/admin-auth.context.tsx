import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './traveler-auth.context.tsx';
import { replaceSpace } from "../utils/string-manipulation.ts";
import { strings } from "../i18n/strings.ts";

interface AdminRouteProps {
    element: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
    const { isAuthenticated, isLoading, userRole } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(userRole);

    return isAuthenticated && userRole === 'admin' ? (
        element
    ) : (
        <Navigate to={`/${replaceSpace(strings.navbar.signin)}`} state={{ from: location }} />
    );
};

export default AdminRoute;
