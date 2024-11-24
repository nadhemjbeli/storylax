// CustomInput.tsx
import React, { useState } from 'react';

interface MessageProps {
    sendMessage: (message: string) => void;
}

const CustomInput: React.FC<MessageProps> = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setMessage(event.target.value);
    };

    const handleSendClick = () => {
        console.log(message)
        if (message.trim()) {
            sendMessage(message);
            setMessage(''); // Clear the input after sending
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type your message here..."
            />
            <button onClick={handleSendClick} disabled={!message.trim()}>
                Send
            </button>
        </div>
    );
};

export default CustomInput;
