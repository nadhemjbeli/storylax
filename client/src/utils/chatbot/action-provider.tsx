import React, {FC, useEffect} from 'react';
import {getHotelsByService} from "../../data/hotel/hotel.data.ts";
import {getCurrentUserInterests, IUserInterestData} from "../../data/traveler/interests.data.ts";

interface ActionProviderProps {
    createChatBotMessage: any;
    setState: any;
    children: any;
}

const ActionProvider: FC<ActionProviderProps> = ({ createChatBotMessage, setState, children }) => {

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const { data: interests } = await getCurrentUserInterests();
                console.log('interests',interests)
                if (interests && interests.length > 0) {
                    const interestLinks = interests.map((interest:IUserInterestData) => interest.name).join(', ');
                    const interestMessage = createChatBotMessage(`What are your interests? Select one:`, {
                        widget: 'interestLinks',
                    });
                    setState((prev:any) => ({
                        ...prev,
                        messages: [...prev.messages, interestMessage],
                        interests:interests,
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch interests:', error);
            }
        };

        fetchInterests();
    }, [setState, createChatBotMessage]);
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.',
            {widget:'overview'}
        );
        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleFAQ = (question: string) => {
        let response = '';
        switch (question.toLowerCase()) {
            case 'what are your working hours?':
                response = 'Our working hours are from 9 AM to 5 PM, Monday to Friday.';
                break;
            case 'how can i book a hotel?':
                response = 'You can book a hotel through our website by selecting your desired dates and location.';
                break;
            // Add more cases as needed
            default:
                response = 'I am not sure about that. Can you ask something else?';
        }
        const botMessage = createChatBotMessage(response);
        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleUserPreferences = (preference: string) => {
        const botMessage = createChatBotMessage(`Got it! I will remember that you prefer ${preference}.`);
        setState((prev: any) => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                userPreference: preference,
            },
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleHotelRecommendation = async (service: string) => {
        const query = `?service=${service}`;
        try {
            const { data } = await getHotelsByService(query);
            if (data.length === 0) {
                const noResultsMessage = createChatBotMessage(`No hotels found for the service: ${service}`);
                setState((prev: any) => ({
                    ...prev,
                    messages: [...prev.messages, noResultsMessage],
                }));
            } else {
                const resultsMessage = createChatBotMessage(
                    `Found ${data.length} hotels offering the service: ${service}.`,
                    { widget: 'hotelLinks' }
                );
                setState((prev: any) => ({
                    ...prev,
                    messages: [...prev.messages, resultsMessage],
                    hotels: data,  // Store the hotel data in the state
                }));
            }
        } catch (error) {
            const errorMessage = createChatBotMessage("An error occurred while fetching hotels.");
            setState((prev: any) => ({
                ...prev,
                messages: [...prev.messages, errorMessage],
            }));
        }
    };
    const handleInterestClick = (interest: string) => {
        const botMessage = createChatBotMessage(`Looking for hotels with ${interest}...`);
        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
            disabled: true, // Disable interest links after click
        }));
        handleHotelRecommendation(interest);
    };




    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHotelRecommendation,
                        handleInterestClick,  // Ensure this is included
                        handleHello,
                        handleFAQ,
                        handleUserPreferences,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;
