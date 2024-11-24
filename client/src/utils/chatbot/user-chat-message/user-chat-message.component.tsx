// MyCustomUserChatMessage.tsx

import React from 'react';
import './user-chat-message.style.scss'; // Import your styles here

interface MessageProps{
    message: any
}
const MyCustomUserChatMessage:React.FC<MessageProps> = ({ message }) => {
    return (
        <>
            <div className="custom-user-chat-message">
                <div className="message-bubble">{message}</div>
            </div>
        </>
    );
};

export default MyCustomUserChatMessage;
