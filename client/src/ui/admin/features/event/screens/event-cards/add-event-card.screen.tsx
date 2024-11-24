// src/ui/admin/features/event/screens/event-cards/add-event-card.screen.tsx

import React from "react";
import EventCardForm from "../../components/event-card-form/event-card-form.component.tsx"; // Assuming you have a form for EventCards
import { IAddEventCard } from "../../../../../../data/explore/events.data.ts";
import api from "../../../../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";

const AdminAddEventCard: React.FC = () => {
    const { eventId} = useParams()
    const eventCard: IAddEventCard = {
        name: "",
        image: "",
        event: eventId || '',  // The event this card belongs to
    };

    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        console.log('Submitted values:', values);

        // Create a FormData object to handle file uploads
        const formData = new FormData();

        // Append file and other form data to FormData
        formData.append('image', values.image); // Assuming you're uploading an image for the event card
        formData.append('name', values.name);
        formData.append('event', values.event); // The event ID that the card is related to

        // Send the FormData to the API
        try {
            const response = await api.post('/event-cards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server response:', response.data);

            // Handle success, e.g., redirect to another page
            navigate(`/admin/event-cards/${eventId}`);
        } catch (error) {
            console.error('Error uploading event card:', error);
        }
    };

    return (
        <div className="add-event-card">
            <EventCardForm
                eventCard={eventCard}
                title={"Add Event Card"}
                submitText={"Submit"}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AdminAddEventCard;
