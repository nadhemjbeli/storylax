// src/ui/components/chatbot/chatbot.component.tsx
import React, { useState, useEffect } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import config from '../../../utils/chatbot/config.jsx';
import ActionProvider from '../../../utils/chatbot/action-provider.tsx';
import MessageParser from '../../../utils/chatbot/message-parser.tsx';
import { ReactComponent as ChatIcon } from "../../../assets/svg/explore/chat.icon.svg";
import 'react-chatbot-kit/build/main.css';
import './chatbot.style.scss';
import { useLocation } from "react-router-dom";
import { strings } from "../../../i18n/strings.ts";

const ChatBotComponent: React.FC = () => {
    const pathname = useLocation().pathname;
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    useEffect(() => {
        const handleHeaderClick = () => {
            setShowChatbot(false);
        };

        const header = document.querySelector('.react-chatbot-kit-chat-header');
        if (header) {
            header.addEventListener('click', handleHeaderClick);
        }

        // Query selector for the send button
        const sendButton = document.querySelector<HTMLButtonElement>('.react-chatbot-kit-chat-btn-send');

        // Query selector for the input
        const input = document.querySelector<HTMLInputElement>('.react-chatbot-kit-chat-input');
        if (input && sendButton) {
            const handleInputChange = () => {
                const isInputEmpty = input.value.trim() === "";
                sendButton.disabled = isInputEmpty;
                sendButton.style.backgroundColor = isInputEmpty ? '#ccc' : '#4a3aff';
                sendButton.style.cursor = isInputEmpty ? 'not-allowed' : 'pointer';
            };

            const handleSendClick = () => {
                if (!sendButton.disabled) {
                    setTimeout(()=>{
                        sendButton.disabled = true;
                        sendButton.style.backgroundColor ='#ccc';
                        sendButton.style.cursor = 'not-allowed';
                    },200)
                }
            };

            input.addEventListener('input', handleInputChange);
            sendButton.addEventListener('click', handleSendClick);

            // Initial check to set the button state
            handleInputChange();
        }

        // Cleanup the event listener on component unmount
        return () => {
            if (header) {
                header.removeEventListener('click', handleHeaderClick);
            }
            if (input) {
                input.removeEventListener('input', () => {
                    const isInputEmpty = input.value.trim() === "";
                    sendButton!.disabled = isInputEmpty;
                    sendButton!.style.backgroundColor = isInputEmpty ? '#ccc' : '#4a3aff';
                    sendButton!.style.cursor = isInputEmpty ? 'not-allowed' : 'pointer';
                });
            }
            if (sendButton && input) {

                if (!sendButton.disabled) {
                    setTimeout(()=>{
                        sendButton.disabled = true;
                        sendButton.style.backgroundColor ='#ccc';
                        sendButton.style.cursor = 'not-allowed';
                    },200)
                }
            }
        };
    }, [showChatbot]);

    return (
        <>
            <div className={`chatbot-component ${showChatbot ? '' : 'hidden'} ${`.${pathname}` === "./" && 'home-chatbot-component'}`}>
                <Chatbot actionProvider={ActionProvider} config={config} messageParser={MessageParser} />
            </div>
            <button className={`toggle-button ${showChatbot && 'active'}} 
            ${`.${pathname}` === `./${strings.navbar.explore}` && 'explore-chatbot'}`} onClick={toggleChatbot}>
                <ChatIcon className="chatbot-icon" />
            </button>
        </>
    );
};

export default ChatBotComponent;
