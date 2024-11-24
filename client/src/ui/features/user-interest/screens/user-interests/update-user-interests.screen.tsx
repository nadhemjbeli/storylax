import React, { useEffect, useState } from "react";
import api from "../../../../../utils/api.ts";
import { useNavigate } from "react-router-dom";
import { IUserData, showUserData } from "../../../../../data/authenticate/user.data.ts";
import TravelerUserInterestsForm from "../../components/user-interests-form/user-interests-form.component.tsx";
import {useAuth} from "../../../../../contexts/traveler-auth.context.tsx";
import './update-user-interests.style.scss'

const TravelerUpdateUserInterests: React.FC = () => {
    const { userId } = useAuth();
    const [user, setUser] = useState<IUserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            showUserData(userId).then((data) => {
                setUser(data.data);
            });
        }
    }, [userId]);

    const handleSubmit = async (values: IUserData) => {



        try {
            console.log("Update user values: ", values)

            await api.post(`/user-interests/current/multiple`, values.interests).then(response =>{
                console.log('Server response:', response.data);

                // Redirect to the users list after successful update
                navigate(`/`);
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="update-user-interests">
            {user ? (
                <TravelerUserInterestsForm
                    user={user}
                    title="Choose User Interests"
                    submitText="Choose"
                    onSubmit={handleSubmit}
                />
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default TravelerUpdateUserInterests;
