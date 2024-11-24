import React, { useEffect, useState } from "react";
import api from "../../../../../../utils/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import {
    IUserInterest,
    showInterestData,
} from "../../../../../../data/authenticate/user.data.ts";
import AdminInterestForm from "../../components/interest-form/interest-form.component.tsx";

const AdminUpdateInterest: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [interest, setInterest] = useState<IUserInterest | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            showInterestData(id).then((data) => {
                // console.log(data.data)
                setInterest(data.data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: IUserInterest) => {



        try {
            // console.log("Update user values: ", values)

            await api.put(`/user-interests/${interest?._id}`, values).then(response =>{
                console.log('Server response:', response.data);

                // Redirect to the users list after successful update
                navigate(`/admin/interests`);
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="update-user">
            {interest ? (
                <AdminInterestForm
                    interest={interest}
                    title="Update this interest"
                    submitText="Update"
                    onSubmit={handleSubmit}
                />
            ) : (
                <p>Loading interest data...</p>
            )}
        </div>
    );
};

export default AdminUpdateInterest;
