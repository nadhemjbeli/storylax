import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './traveler-auth.context.tsx';
import { showUserData } from "../data/authenticate/user.data.ts";

interface PrivateRouteProps {
    element: React.ReactElement;
    // role: string[];
}

const PublicRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated, isLoading, userId } = useAuth();
    const [hasInterest, setHasInterest] = useState<boolean | undefined>(undefined);
    const [userRole, setUserRole] = useState<string | undefined>(undefined);
    const location = useLocation();

    useEffect(() => {
        if (userId) {
            showUserData(userId).then((response) => {
                console.log(response.data)
                setHasInterest(response.data?.hasInterests);
                setUserRole(response.data?.role);
            });
        }
    }, [userId]);

    // Show loading spinner while isLoading or hasInterest is undefined (meaning it's still loading)
    if ( isLoading || (hasInterest === undefined && isAuthenticated) ) {
        return <div>Loading...</div>; // Optionally replace with a custom loading component
    }

    // Authentication and role validation logic
    if (isAuthenticated) {

        if (location.pathname === '/' ) {
            console.log('element', hasInterest)
            if (hasInterest || userRole ==='host') {
                return element;
            }
            else {
                return (
                    <Navigate
                        to={`/user-interests`}
                        state={{ from: location }}
                    />
                );
            }
        // } else {
        //     if (hasInterest) {
        //         return (
        //             <Navigate
        //                 to={`/`}
        //                 state={{from: location}}
        //             />
        //         );
        //     } else {
        //         return element;
        //     }
        }
    } else {
        return element
    }
};

export default PublicRoute;
