import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './traveler-auth.context.tsx';
import { replaceSpace } from "../utils/string-manipulation.ts";
import { strings } from "../i18n/strings.ts";
import { showUserData } from "../data/authenticate/user.data.ts";

interface PrivateRouteProps {
    element: React.ReactElement;
    role: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, role }) => {
    const { isAuthenticated, isLoading, userId } = useAuth();
    const [hasInterest, setHasInterest] = useState<boolean | undefined>(undefined);
    const [userRole, setRole] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        if (userId) {
            showUserData(userId).then((response) => {
                console.log(response.data)
                setHasInterest(response.data?.hasInterests);
                setRole(response.data?.role);
            });
        }
    }, [userId]);

    // Show loading spinner while isLoading or hasInterest is undefined (meaning it's still loading)
    if ( isLoading || ((userRole === undefined || hasInterest === undefined) && isAuthenticated)  ) {
        return <div>Loading...</div>; // Optionally replace with a custom loading component
    }
    if(userRole==='host'){
        console.log('host', userRole);
        return element;
    }

    // Authentication and role validation logic
    if (isAuthenticated && role.includes(userRole ? userRole : "")) {
        console.log('interest', hasInterest);

        if (location.pathname !== '/user-interests') {
            console.log('userRole', userRole)
            if (hasInterest) {

                return element;
            }
            else if (!hasInterest && userRole!=='host') {
                return (
                    <Navigate
                        to={`/user-interests`}
                        state={{ from: location }}
                    />
                );
            }
        } else if (location.pathname === '/user-interests') {
            if (hasInterest) {
                if(userRole === 'host')
                return (
                    <Navigate
                        to={`/`}
                        state={{ from: location }}
                    />
                );
            } else {
                return element;
            }
        }
    } else {
        return (
            <Navigate
                to={`/${replaceSpace(strings.navbar.signin)}`}
                state={{ from: location }}
            />
        );
    }
};

export default PrivateRoute;
