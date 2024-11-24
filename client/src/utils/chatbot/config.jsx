// src/utils/chatbot/config.jsx
import React from "react";
import { createChatBotMessage } from 'react-chatbot-kit';
import CustomInput from './user-chat-message/custom-input.component';
import MyCustomUserChatMessage from './user-chat-message/user-chat-message.component';
import HotelLinks from "./widgets/hotel-links/hotel-links.widget.tsx";
import {getCurrentUserInterests} from "../../data/traveler/interests.data.ts";
import InterestLinks from "./widgets/interest-links/interest-links.widget.tsx";
import CustomButtonWidget from "./widgets/button/custom-button-widget.wdg.tsx";

const botName = 'Jasmin';

const config = {
    initialMessages: [createChatBotMessage(`Hi!`)],
    botName: botName,
    customComponents: {
        // Use the custom input box component
        inputBox: (props) => <CustomInput {...props} />,
        // Use the custom user chat message component
        userChatMessage: (props) => <MyCustomUserChatMessage {...props} />,
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: '#011936',
        },
        chatButton: {
            backgroundColor: '#4a3aff',
        },
    },
    widgets: [
        {
            widgetName: 'customButton',
            widgetFunc: (props) => <CustomButtonWidget {...props} />,
            mapStateToProps: ['hotels'],  // Map any needed state here
        },
        {
            widgetName: 'hotelLinks',
            widgetFunc: (props) => <HotelLinks {...props} />,
            mapStateToProps: ['hotels'],  // Map 'hotels' data to this widget
        },
        {
            widgetName: 'interestLinks',
            widgetFunc: (props) => <InterestLinks {...props} />,  // This passes props correctly
            mapStateToProps: ['interests'],
        }
    ],
};

export default config;
