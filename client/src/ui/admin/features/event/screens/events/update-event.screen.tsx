// src/ui/admin/features/event/screens/events/update-event.screen.tsx
import React, {useEffect, useState} from "react";
import api from "../../../../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {IAddEvent, showEventData} from "../../../../../../data/explore/events.data.ts";
import EventForm from "../../components/event-form/event-form.component.tsx";

const AdminUpdateEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<IAddEvent>({
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
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            showEventData(id).then(data => {
                setEvent(data.data);
                console.log('event:',data.data);
            })
        }
    }, [id]);
    const handleSubmit = async (values: any) => {

        if (values.city) {
            // console.log('Submitted values:', values);

            // Create a FormData object to handle file uploads
            const formData = new FormData();

            // Append file and other form data to FormData
            (values.defaultImage && formData.append('defaultImage', values.defaultImage)); // Assuming `values.smallImage` is a File object
            (values.smallImage && formData.append('smallImage', values.smallImage)); // Assuming `values.smallImage` is a File object
            (values.mediumImage && formData.append('mediumImage', values.mediumImage)); // Assuming `values.mediumImage` is a File object
            (values.largeImage && formData.append('largeImage', values.largeImage)); // Assuming `values.largeImage` is a File object
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('resume', values.resume);
            formData.append('city', values.city);
            formData.append('startDate', values.startDate);
            formData.append('endDate', values.endDate);
            // Send the FormData to the API
            try {
                const response = await api.put(`/events/${event._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Server response:', response.data);

                // Handle success, e.g., redirect to another page
                navigate(`/admin/events`)

            } catch (error) {
                console.error('Error uploading blog:', error);
            }
        } else {
            console.log("No city selected");
        }
    };


    return (
        <div className="update-blog">
            <EventForm event={{...event, smallImage:'', mediumImage:'', largeImage:''}}  title={"Update event"} submitText={"Update"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminUpdateEvent;
