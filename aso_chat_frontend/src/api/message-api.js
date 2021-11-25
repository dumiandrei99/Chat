import {HOST} from '../commons/hosts/hosts'
import RestApiClient from "../commons/rest-client";

const endpoint = {
    createMessage: '/createMessage',
    getMessages: '/getMessages',
}

function createMessage(sender_and_message, callback) {
    let request = new Request(HOST.backend_api + endpoint.createMessage , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sender_and_message)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


function getMessages(callback) {
    let request = new Request(HOST.backend_api + endpoint.getMessages, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export{
    createMessage,
    getMessages,
}