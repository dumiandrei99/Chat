import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';


function ChatRoute( {children} ) {
    const auth = localStorage.getItem('auth');
    return auth === 'true' ? children : <Navigate to = '/'/>
}

export default ChatRoute