import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './user-interests-form.style.scss';
import {
    getUserInterestsData,
    IUserData,
    IUserInterest,
    IUserInterestsData,
} from '../../../../../data/authenticate/user.data.ts';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import api from '../../../../../utils/api.ts';
import { useAuth } from '../../../../../contexts/traveler-auth.context.tsx';

interface UserInterestsFormProps {
    onSubmit: (values: IUserData) => void;
    submitText: string;
    title: string;
    user: IUserInterestsData;
}

const MAX_INTERESTS = 4;

const UserFormSchema = Yup.object().shape({
    // Schema validation can be added here if needed
});

const TravelerUserInterestsForm: React.FC<UserInterestsFormProps> = ({
                                                                         user,
                                                                         title,
                                                                         submitText,
                                                                         onSubmit,
                                                                     }) => {
    const [interests, setInterests] = useState<IUserInterest[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>( []);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { userId, isAuthenticated, hasInterests } = useAuth();

    useEffect(() => {
        // if (isAuthenticated && hasInterests) {
        //     navigate('/');
        //     return;
        // }
        // Fetch all available interests
        getUserInterestsData().then((data) => {
            setInterests(data.data);
        });
    }, [userId]);


    const { handleSubmit, setValues } = useFormik({
        initialValues: {
            interests: selectedInterests||[],
        },
        validationSchema: UserFormSchema,
        onSubmit: (values) => {
            onSubmit(values as any);
        },
    });

    useEffect(() => {
        user && setValues(({...user, interests:selectedInterests} as any));
        console.log('selected interests:',selectedInterests)
    }, [selectedInterests]);
    const handleInterestChange = (interestId: string) => {
        let updatedUser = user;
        if (updatedUser.interests && updatedUser.interests.length < MAX_INTERESTS){

            setErrorMessage(null);
            if (updatedUser && updatedUser.interests?.includes(interestId)) {
                // Remove interest if already selected
                updatedUser.interests = updatedUser.interests?.filter((interest:string) => interest !== interestId);
                // setSelectedInterests((prev) => prev.filter((id) => id !== interestId));
                setErrorMessage(null);
            }
            else {
                // Add the user if they are not associated
                updatedUser.interests?.push(interestId);
            }
        }
        else if (updatedUser.interests && updatedUser.interests.length >= MAX_INTERESTS) {

            if (updatedUser && updatedUser.interests?.includes(interestId)) {
                // Remove interest if already selected
                updatedUser.interests = updatedUser.interests?.filter((interest:string) => interest !== interestId);
                // setSelectedInterests((prev) => prev.filter((id) => id !== interestId));
                setErrorMessage(null);
            }
            else {
                // Show error message if the limit is reached
                setErrorMessage(`You can only select up to ${MAX_INTERESTS} interests.`);
            }
        }
        setSelectedInterests(prevInterests => {
            if(!prevInterests.includes(interestId)) {
                // Filter out the old interest and add the updated one
                return [...prevInterests, interestId];
            }
            else {
                // Filter out the old interest and add the updated one
                return prevInterests.filter((interest:string) => interest !== interestId);
            }
        });
        // user && setValues(({...user, interests:selectedInterests} as any));
    };

    const handleCancel = async () => {
        // Send a PUT request to update user data
        await api.put(`/users/current`, { interests: selectedInterests }).then((response) => {
            console.log('Updated User response:', response.data);
            navigate(`/`);
        });
    };

    return (
        <div className="admin-form user-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="tags-wrapper">
                    {interests.map((interest) => (
                        <div key={interest._id} className="switch-aside">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id={interest._id}
                                    name="tags"
                                    defaultValue={interest._id}
                                    checked={user.interests?.includes(interest._id as string)}
                                    onChange={() => handleInterestChange(interest._id as string)}
                                />
                                <span className="slider"></span>
                            </label>
                            <label htmlFor={interest._id}>{interest.name}</label>
                        </div>
                    ))}
                </div>

                {/* Error message if max limit is reached */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p className="counter">
                    Selected interests: {user.interests?.length}/{MAX_INTERESTS}
                </p>

                <div className="form-footer">
                    <div className="button-group">
                        <button type="button" className="interest-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="interest-submit-button">
                            {submitText}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TravelerUserInterestsForm;
