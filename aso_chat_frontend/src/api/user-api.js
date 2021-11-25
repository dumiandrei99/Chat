import {HOST} from '../commons/hosts/hosts'
import RestApiClient from "../commons/rest-client";

const endpoint = {
    register: '/createUser',
    login: '/logIn'
}


function postUser(user, callback) {
    let request = new Request(HOST.backend_api + endpoint.register , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function logInUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.login , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export{
    postUser,
    logInUser
}
