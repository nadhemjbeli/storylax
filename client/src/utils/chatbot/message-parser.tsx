import React from 'react';

interface MessageParserProps {
    children: any;
    actions: any;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
    const parse = (message: string) => {
        if (!message.trim()) {
            return;
        }

        if (message.toLowerCase().includes('i prefer')) {
            const preference = message.split('i prefer')[1].trim();
            actions.handleUserPreferences(preference);
        } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi') || message.toLowerCase().includes('start')) {
            actions.handleHello();
        } else if (message.toLowerCase().includes('recommend hotel with') || message.toLowerCase().includes('find hotel with')) {
            const service = message.split('with')[1].trim();
            actions.handleHotelRecommendation(service);
        } else {
            actions.handleFAQ(message);
        }
    };

    return (
        <>{React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, {
                parse,
                actions,
            })
        )}</>
    );
};


export default MessageParser;
