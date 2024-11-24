// src/ui/admin/features/event/screens/events/add-event.screen.tsx
import React from "react";
import EventForm from "../../components/event-form/event-form.component.tsx";
import { IAddEvent } from "../../../../../../data/explore/events.data.ts";
import api from "../../../../../../utils/api.ts";
import { useNavigate } from "react-router-dom";

const AdminAddEvent: React.FC = () => {
    const event: IAddEvent = {
        title: "",
        description: "",
        resume: "",
        city: "",
        defaultImage: "",
        smallImage: "",
        mediumImage: "",
        largeImage: "",
        startDate: "",
        endDate: ""
    }

    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        if (values.city) {
            console.log('Submitted values:', values);

            // Create a FormData object to handle file uploads
            const formData = new FormData();

            // Append file and other form data to FormData
            formData.append('defaultImage', values.defaultImage);
            formData.append('smallImage', values.smallImage);
            formData.append('mediumImage', values.mediumImage);
            formData.append('largeImage', values.largeImage);
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('resume', values.resume);
            formData.append('city', values.city);
            formData.append('startDate', values.startDate);
            formData.append('endDate', values.endDate);

            // Send the FormData to the API
            try {
                const response = await api.post('/events', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Server response:', response.data);

                // Handle success, e.g., redirect to another page
                navigate(`/admin/events`)
            } catch (error) {
                console.error('Error uploading event:', error);
            }
        } else {
            console.log("No city selected");
        }
    };

    return (
        <div className="add-event">
            <EventForm event={event} title={"Add Event"} submitText={"Submit"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddEvent;
