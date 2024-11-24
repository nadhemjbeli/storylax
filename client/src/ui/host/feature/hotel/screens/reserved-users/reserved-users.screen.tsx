// src/ui/host/features/reserved-users/screens/reserved-users/reserved-users.screen.tsx

import React, { useEffect, useState } from 'react';
import './reserved-users.style.scss';
import {getReservedUsersByHost} from "../../../../../../data/hotel/hotel-reservations.data.ts";
import ReservedUsersTable from "../../components/reserved-users-table/reserved-users-table.component.tsx";
import {IUserData} from "../../../../../../data/authenticate/user.data.ts";

const ReservedUsers: React.FC = () => {
    const [reservedUsers, setReservedUsers] = useState<IUserData[]>([]);

    useEffect(() => {
        getReservedUsersByHost().then((response) => {
            setReservedUsers(response.data);
        });
    }, []);

    return (
        <div className="admin-hotels-page">
            <div className={"title-wrapper"}>
                <h2>My Reserved Clients</h2>
            </div>
            {
                reservedUsers?
                    <ReservedUsersTable reservedUsers={reservedUsers}/>:
                    <p>Loading...</p>
            }
        </div>
    );
};

export default ReservedUsers;

