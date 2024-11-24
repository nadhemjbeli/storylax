import React, { useEffect, useState } from "react";
import api from "../../../../../../utils/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { IUserData, showUserData } from "../../../../../../data/authenticate/user.data.ts";
import AdminUserInterestsForm from "../../components/user-interests-form/user-interests-form.component.tsx";

const AdminUpdateUserInterests: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IUserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            showUserData(id).then((data) => {
                setUser(data.data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: IUserData) => {



        try {
            console.log("Update user values: ", values)

            await api.post(`/user-interests/${user?._id}/multiple`, values.interests).then(response =>{
                console.log('Server response:', response.data);

                // Redirect to the users list after successful update
                navigate(`/admin/users`);
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="update-user">
            {user ? (
                <AdminUserInterestsForm
                    user={user}
                    title="Add User Interests"
                    submitText="Add"
                    onSubmit={handleSubmit}
                />
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default AdminUpdateUserInterests;
