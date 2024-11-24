import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './user-interests-form.style.scss';
import {
    getUserInterestsData,
    IUserData,
    IUserInterest,
    IUserInterestsData
} from '../../../../../../data/authenticate/user.data.ts';
import * as Yup from 'yup';

interface UserInterestsFormProps {
    onSubmit: (values: IUserData) => void;
    submitText: string;
    title: string;
    user: IUserInterestsData;
}

const UserFormSchema = Yup.object().shape({
    // firstName: Yup.string().required('First name is required'),
    // lastName: Yup.string().required('Last name is required'),
    // email: Yup.string().email('Invalid email').required('Email is required'),
    // password: Yup.string().required('Password is required'),
    // city: Yup.string().required('City is required'),
    // address: Yup.string().required('Address is required'),
    // postalCode: Yup.string().required('Postal code is required'),
});

const AdminUserInterestsForm: React.FC<UserInterestsFormProps> = ({ user, title, submitText, onSubmit }) => {
    const [interests, setInterests] = useState<IUserInterest[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    // const {id} = useParams()

    useEffect(() => {
        getUserInterestsData().then((data) => {
            setInterests(data.data);
            // setFilteredCities(data.data.filter((city: ICitySchema) => city.name === searchQuery));
        });
    }, []);

    // useEffect(() => {
    //     // setSearchQuery(user.city ? user.city : '');
    // }, [interest]);

    const {
        // values,
        // errors,
        // touched,
        // handleChange,
        // handleBlur,
        handleSubmit,
        setValues
    } = useFormik({
        initialValues: {
            interests: selectedInterests||[],
        },
        validationSchema: UserFormSchema,
        onSubmit: (values) => {
            onSubmit(values as any);
            setSelectedInterests([])
        },
    });

    useEffect(() => {
        user && setValues(({...user, interests:selectedInterests} as any));
        console.log('selected interests:',selectedInterests)
    }, [selectedInterests]);


    const handleInterestChange = (interestId: string) => {
        // let updatedInterests = [...selectedInterests].filter(interest => interest._id === interestId)[0];
        // let updatedInterest = interests.find(interest => interest._id === interestId);;
        let updatedUser = user;
        // if () {
        // Check if the user is already associated with the interest
        if (updatedUser && updatedUser.interests?.includes(interestId)) {
            // Remove the user if they are already associated
            updatedUser.interests = updatedUser.interests?.filter((interest:string) => interest !== interestId);

        } else {
            // Add the user if they are not associated
            updatedUser.interests?.push(interestId);
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
    };

    return (
        <div className="admin-form user-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="tags-wrapper">
                    {interests.map(interest => (
                        <div key={interest._id} className="switch-aside">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id={interest._id}
                                    name="tags"
                                    value={interest._id}
                                    checked={user.interests?.includes(interest._id as string)}
                                    onChange={() => handleInterestChange(interest._id as string)}
                                />
                                <span className="slider"></span>
                            </label>
                            <label htmlFor={interest._id}>{interest.name}</label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-button">{submitText}</button>
            </form>
        </div>
    );
};

export default AdminUserInterestsForm;
