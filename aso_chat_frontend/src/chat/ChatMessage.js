import React, { useEffect, useState } from 'react';
import * as API_MESSAGES from "../api/message-api";
import '../commons/styles/style.css'

function ChatMessage(){
    const [messages, setMessages] = useState([]);

    API_MESSAGES.getMessages((result, status, error) => {
        if (result !== null && (status === 200 || status === 201)) {
            setMessages(result)
        }
    });

    return(
        <ul>
            {messages.map(message => (
                message.username === localStorage.getItem('loggedInUser') ?
                    <div className = 'sent'>
                        <div className = 'senderAuthor'>{message.username}</div>
                        {message.message_content}
                    </div>
                :
                    <div className = 'recieved'>
                        <div className = 'senderRecieved'> {message.username}</div>
                        {message.message_content}
                    </div>
            ))}
        </ul>
    )
}

export default ChatMessage