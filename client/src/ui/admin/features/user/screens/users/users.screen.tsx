// src/ui/admin/features/blog/screens/users/users.screen.tsx

import React, {useEffect, useState} from 'react';
import './users.style.scss';
import {Link} from "react-router-dom";
import api from "../../../../../../utils/api.ts";
import {getUsersData, IUserData} from "../../../../../../data/authenticate/user.data.ts";
import UserTable from "../../components/users-table/users-table.component.tsx";

const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<IUserData[]>([]);

    useEffect(() => {
        getUsersData().then((data) => {
            setUsers(data.data);
        })
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`users/${id}`).then((_) => {
            setUsers(users.filter(user => user._id !== id));
        })
    };

    return (
        <div className="admin-users-page">
            <div className={"title-wrapper"}>
                <h2>Manage Users</h2>
                <div className="buttons-wrapper">
                    {/*<Link to={"/admin/blog-tags"}>*/}
                    {/*    <button className="primary-button button-icon">*/}
                    {/*        <TagsIcon className={"svg-icon"} />*/}
                    {/*    </button>*/}
                    {/*</Link>*/}
                    <Link to={"/admin/interests"}>
                        <button className="primary-button">interests</button>
                    </Link>
                </div>
            </div>
            <UserTable users={users} onDelete={handleDelete}/>
        </div>
    );
};

export default AdminUsers;
