import React from "react";
import api from "../../../../../../utils/api.ts";
import {useNavigate} from "react-router-dom";
import {IUserInterest} from "../../../../../../data/authenticate/user.data.ts";
import AdminInterestForm from "../../components/interest-form/interest-form.component.tsx";

const AdminAddInterest: React.FC = () => {
    const interest: IUserInterest = {
        name: "",
    }
    const navigate = useNavigate()
    const handleSubmit = async (values: IUserInterest) => {
        console.log('Submitted values:', values);

        // Send the FormData to the API
        try {
            await api.post('/user-interests', values);

            // Handle success, e.g., redirect to another page
            navigate(`/admin/interests`)
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };


    return (
        <div className="add-blog">
            <AdminInterestForm interest={interest}  title={"Add an interest"} submitText={"Submit"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddInterest;
