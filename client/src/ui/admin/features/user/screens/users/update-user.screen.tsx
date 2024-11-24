import React, { useEffect, useState } from "react";
import api from "../../../../../../utils/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { IUserData, showUserData } from "../../../../../../data/authenticate/user.data.ts";
import AdminUserForm from "../../components/user-form/user-form.component.tsx";

const AdminUpdateUser: React.FC = () => {
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
            console.log("Update user values: ", values);
            const formData = new FormData();

            // Append the rest of the form data
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('email', values.email);
            if (values.city) formData.append('city', values.city);
            if (values.address) formData.append('address', values.address);
            if (values.postalCode) formData.append('postalCode', values.postalCode);
            if (values.phoneNumber) formData.append('phoneNumber', values.phoneNumber);
            if (values.bio) formData.append('bio', values.bio);
            if (values.provider) formData.append('provider', values.provider);
            if (values.role === "host" && values.hostSpecificField) {
                formData.append('hostSpecificField', values.hostSpecificField);
            }
            values.role && formData.append('role', values.role);
            if (values.password) {
                formData.append('password', values.password);
            }

            // Handle image uploads
            if (values.image) {
                formData.append('image', values.image);
            }

            // Append interests as individual entries
            // values.interests?.forEach((interest: string) => {
                values.interests && values.interests.length >=1  &&formData.append('interests', values.interests.join(","));
            // });

            // Create a dictionary from FormData
            const formDataDict: { [key: string]: any } = {};

            for (let pair of formData.entries()) {
                if (pair[0]==='interests') formDataDict[pair[0]] = (pair[1] as string).split(",");
                else formDataDict[pair[0]] = pair[1];
            }
            console.log(formDataDict)

            await api.put(`/users/${user?._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response =>{
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
                <AdminUserForm
                    user={user}
                    title="Update User"
                    submitText="Update"
                    onSubmit={handleSubmit}
                />
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default AdminUpdateUser;
