// src/ui/admin/features/blog/screens/users/users.screen.tsx

import React, {useEffect, useState} from 'react';
import './user-interests.style.scss';
import {Link} from "react-router-dom";
import api from "../../../../../../utils/api.ts";
import {getUserInterestsData, IUserInterest} from "../../../../../../data/authenticate/user.data.ts";
import UserInterestsTable from "../../components/user-interests-table/user-interests-table.component.tsx";

const AdminInterestsPage: React.FC = () => {
    const [userInterests, setUserInterests] = useState<IUserInterest[]>([]);

    useEffect(() => {
        getUserInterestsData().then((data) => {
            setUserInterests(data.data);
        })
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`user-interests/${id}`).then((_) => {
            setUserInterests(userInterests.filter(user => user._id !== id));
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
                    <Link to={"/admin/add-interest"}>
                        <button className="primary-button">Add an interest</button>
                    </Link>
                </div>
            </div>
            <UserInterestsTable interests={userInterests} onDelete={handleDelete}/>
        </div>
    );
};

export default AdminInterestsPage;
