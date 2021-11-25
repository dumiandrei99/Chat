import React from 'react'
import {
    Navbar,
    Button,
} from 'reactstrap';
import './styles/style.css'

function logOut () {
    localStorage.setItem("loggedInUser","");
    localStorage.setItem("auth","false");
}

const NavigationBar = () => (
    <div>
        <Navbar color="transparent" light expand="md">
            <label className = 'navBarLabel'> CHAT </label>
            <Button href="/" onClick={logOut} style = {{background: 'transparent', border: '1px solid #ffd500', color: '#ffd500'}}> Log out </Button>
        </Navbar>
    </div>
);

export default NavigationBar
