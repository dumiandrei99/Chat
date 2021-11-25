import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react';
import './commons/styles/App.css';
import HomePage from './home/HomePage';
import ChatPage from './chat/ChatPage'
import styles from './commons/styles/project-style.css';
import ChatRoute from './commons/protected routes/ChatRoute'

function App (){
  return(
      <div className={styles.back}>
      <Router>
        <Routes>

            <Route exact path = '/' element = {<HomePage/>}/>

            <Route exact path = '/chat' element = { <ChatRoute> <ChatPage /> </ChatRoute> } />

        </Routes>
      </Router>
    </div>
  )
}
export default App;
