import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './user-form.style.scss';
import { getCitiesData, ICitySchema } from '../../../../../../data/city.data.ts';
import { useOutsideClick } from '../../../../../../hooks/useOutsideClick.tsx';
import { IUserData } from '../../../../../../data/authenticate/user.data.ts';
import * as Yup from 'yup';

interface UserFormProps {
    onSubmit: (values: IUserData) => void;
    submitText: string;
    title: string;
    user: IUserData;
}

const UserFormSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // password: Yup.string().required('Password is required'),
    // city: Yup.string().required('City is required'),
    // address: Yup.string().required('Address is required'),
    // postalCode: Yup.string().required('Postal code is required'),
});

const AdminUserForm: React.FC<UserFormProps> = ({ user, title, submitText, onSubmit }) => {
    const [cities, setCities] = useState<ICitySchema[]>([]);
    const [filteredCities, setFilteredCities] = useState<ICitySchema[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(user.city ? user.city : '');
    const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests || []);

    const ref = useOutsideClick(() => {
        setFilteredCities([]);
        if (!values.city) {
            setFieldValue('city', '');
            setSearchQuery('');
        }
    });

    useEffect(() => {
        getCitiesData().then((data) => {
            setCities(data.data);
            setFilteredCities(data.data.filter((city: ICitySchema) => city.name === searchQuery));
        });
    }, []);

    useEffect(() => {
        setSearchQuery(user.city ? user.city : '');
    }, [user]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues
    } = useFormik({
        initialValues: {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            password: user.password || '',
            provider: user.provider || '',
            hostSpecificField: user.hostSpecificField || '',
            role: user.role || 'traveler',
            phoneNumber: user.phoneNumber || '',
            bio: user.bio || '',
            image: '',
            city: user.city || '',
            address: user.address || '',
            postalCode: user.postalCode || '',
            interests: user.interests || [],
        },
        validationSchema: UserFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...user, interests: selectedInterests } as any);
    }, [user]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = cities.filter(city => city.name.toLowerCase().includes(query));

        setSearchQuery(query);
        setFilteredCities(filtered);

        if (!filtered.some(city => city.name.toLowerCase() === query)) {
            setFieldValue('city', '');
        }
    };

    const handleCitySelect = (cityName: string) => {
        setSearchQuery(cityName);
        setFilteredCities([]);
        setFieldValue('city', cityName);
    };

    const handleInterestsChange = (interest: string) => {
        let updatedInterests = [...selectedInterests];
        if (updatedInterests.includes(interest)) {
            updatedInterests = updatedInterests.filter(i => i !== interest);
        } else {
            updatedInterests.push(interest);
        }
        setSelectedInterests(updatedInterests);
        setFieldValue('interests', updatedInterests);
    };

    return (
        <div className="admin-form user-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                    <div className="error-message">{errors.firstName as string}</div>
                )}

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                    <div className="error-message">{errors.lastName as string}</div>
                )}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(content) => setFieldValue('email', content)}
                />
                {errors.email && touched.email && (
                    <div className="error-message">{errors.email as string}</div>
                )}

                {/*<label htmlFor="password">Password</label>*/}
                {/*<input*/}
                {/*    id="password"*/}
                {/*    name="password"*/}
                {/*    type="password"*/}
                {/*    placeholder="Password"*/}
                {/*    value={values.password}*/}
                {/*    onChange={handleChange}*/}
                {/*    onBlur={handleBlur}*/}
                {/*/>*/}
                {/*{errors.password && touched.password && (*/}
                {/*    <div className="error-message">{errors.password}</div>*/}
                {/*)}*/}

                <label htmlFor="city">City</label>
                <div className="city-search-wrapper">
                    <input
                        id="citySearch"
                        name="citySearch"
                        type="text"
                        placeholder="Search City"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div className="citiesList" ref={ref}>
                        {filteredCities.length > 0 && (
                            <ul className="city-dropdown">
                                {filteredCities.map((city) => (
                                    <li
                                        key={city._id}
                                        onClick={() => handleCitySelect(city.name)}
                                    >
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {errors.city && touched.city && (
                    <div className="error-message">{errors.city as string}</div>
                )}

                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={(content) => setFieldValue('address', content)}
                />
                {errors.address && touched.address && (
                    <div className="error-message">{errors.address as string}</div>
                )}

                <label htmlFor="postalCode">Postal Code</label>
                <input
                    id="postalCode"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={values.postalCode}
                    onChange={(content) => setFieldValue('postalCode', content)}
                />
                {errors.postalCode && touched.postalCode && (
                    <div className="error-message">{errors.postalCode as string}</div>
                )}

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={(content) => setFieldValue('phoneNumber', content)}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                    <div className="error-message">{errors.phoneNumber as string}</div>
                )}

                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    placeholder="User Bio"
                    value={values.bio}
                    onChange={(content) => setFieldValue('bio', content)}
                />
                {errors.bio && touched.bio && (
                    <div className="error-message">{errors.bio as string}</div>
                )}

                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('image', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.image && touched.image && (
                    <div className="error-message">{errors.image}</div>
                )}

                <label>Interests</label>
                <div className="interests-wrapper">
                    {["Interest1", "Interest2", "Interest3"].map((interest) => (
                        <div key={interest} className="switch-aside">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id={interest}
                                    name="interests"
                                    value={interest}
                                    checked={selectedInterests.includes(interest)}
                                    onChange={() => handleInterestsChange(interest)}
                                />
                                <span className="slider"></span>
                            </label>
                            <label htmlFor={interest}>{interest}</label>
                        </div>
                    ))}
                </div>
                {errors.interests && touched.interests && (
                    <div className="error-message">{errors.interests as string}</div>
                )}

                {/*<label htmlFor="provider">Provider</label>*/}
                {/*<input*/}
                {/*    id="provider"*/}
                {/*    name="provider"*/}
                {/*    placeholder="Provider"*/}
                {/*    value={values.provider}*/}
                {/*    onChange={handleChange}*/}
                {/*    onBlur={handleBlur}*/}
                {/*/>*/}
                {/*{errors.provider && touched.provider && (*/}
                {/*    <div className="error-message">{errors.provider as string}</div>*/}
                {/*)}*/}

                {values.role === 'host' &&
                    <>
                        <label htmlFor="hostSpecificField">Host Specific Field</label>
                        <input
                            id="hostSpecificField"
                            name="hostSpecificField"
                            placeholder="Host Specific Field"
                            value={values.hostSpecificField}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.hostSpecificField && touched.hostSpecificField && (
                            <div className="error-message">{errors.hostSpecificField as string}</div>
                        )}
                    </>
                }

                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="traveler">Traveler</option>
                    <option value="host">Host</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && touched.role && (
                    <div className="error-message">{errors.role as string}</div>
                )}

                <button type="submit" className="submit-button">{submitText}</button>
            </form>
        </div>
    );
};

export default AdminUserForm;
