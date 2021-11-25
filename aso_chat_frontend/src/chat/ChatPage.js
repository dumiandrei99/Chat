import React, { useState } from 'react';
import '../commons/styles/style.css';
import NavigationBar from '../commons/navigation-bar'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import * as API_MESSAGES from "../api/message-api";
import ChatMessage from "./ChatMessage"
function ChatPage(){
    const [messageContent,setMessageContent] = useState('');
    const [errorStatus, setErrorStatus] = useState(0);
    const [error,setError] = useState(null)

    const handleChange = event => {
        const newMessage = event.target.value;
        setMessageContent(newMessage);
        console.log(messageContent);
    }

    const submitMessage = (sender_and_message) => {
        return API_MESSAGES.createMessage(sender_and_message, (result, status, error) => {
            if (result === null || (status !== 200 || status !== 201)) {
                setErrorStatus(status);
                setError(error);
            }

            console.log(errorStatus)
            console.log(error)
        });
    }

    const handleSubmit = () => {
        let sender_and_message = {
            username: localStorage.getItem('loggedInUser'),
            message_content: messageContent
        } 

        setMessageContent('')
        submitMessage(sender_and_message);
    }

    return(
        <div className = 'formsWrapper'>
            <NavigationBar />
            <div className = 'chatContainer'>
                <ChatMessage />
            </div>
            <div className = 'inputContainer'>
                <input id = 'inputChat' className = 'inputChat' value = {messageContent} placeholder = "Type a message..." onChange = {handleChange}></input>
                <IconButton className = 'sendButton' onClick = {handleSubmit}>
                    <SendIcon style = {{color:'orange'}} fontSize = 'large'/>
                </IconButton>
            </div>
        </div>
    )
}

export default ChatPage