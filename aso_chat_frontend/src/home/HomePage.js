import React, { useState } from 'react';
import validate from "../commons/validators/validators";
import '../commons/styles/style.css';
import {FormGroup, Col, Row} from 'reactstrap';
import * as API_USERS from "../api/user-api";
import { Navigate } from 'react-router';


function HomePage() {
    const [response, setResponse] = useState('');
    const [errorStatus, setErrorStatus] = useState(0);
    const [error, setError] = useState(null);
    const [formControls, setFormControls] = useState({
        usernameLOGIN:{
            value: '',
            placeholder: 'Enter username',
            valid: true,
            touched: false,
            validationRules:{
                minLength: 3,
                isRequired: true
            }
        },

        usernameREGISTER:{
            value: '',
            placeholder: 'Enter username',
            valid: true,
            touched: false,
            validationRules:{
                minLength: 3,
                isRequired: true
            }
        },

        passwordREGISTER:{
            value: '',
            placeholder: 'Enter password',
            valid: true,
            touched: false,
            validationRules:{
                minLength: 6,
                isRequired: true
            }
        },

        passwordLOGIN:{
            value: '',
            placeholder: 'Enter password',
            valid: true,
            touched: false,
            validationRules:{
                minLength: 6,
                isRequired: true
            }
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const handleChange =  event => {
        
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementname in updatedControls) {
            formIsValid = updatedControls[updatedFormElementname].valid && formIsValid;
        }

        setFormControls(updatedControls);
        setFormIsValid(formIsValid);

    };

    const registerUser = (user) => {
        return API_USERS.postUser(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                setResponse(result);
            } else {
                setErrorStatus(status);
                setError(error);
            }
        });
    }

    const handleSubmit = () => {
        let user = {
            username: formControls.usernameREGISTER.value,
            password: formControls.passwordREGISTER.value,
        };
        registerUser(user);
    }

    const logInUser = (user) => {
        return API_USERS.logInUser(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {

                if(result.response === 'success'){
                    localStorage.setItem("auth", "true");
                    localStorage.setItem("loggedInUser", result.username);
                }
            
                setResponse(result.response);
            } else {
                setErrorStatus(status);
                setError(error);
            }
        });
    }

    const handleLogIn = () => {
        let user = {
            username: formControls.usernameLOGIN.value,
            password: formControls.passwordLOGIN.value
        }

        logInUser(user)
    }

    return(
        <div className = 'formsWrapper'>
                <h1 className = 'registerLabelStyle'> REGISTER </h1>
                <div className='registerFormStyle'>
                    <FormGroup id='usernameREGISTER'>
                        <label className = 'label' for='usernameFieldREGISTER'> USERNAME </label>
                        <input 
                            className = 'input'
                            name='usernameREGISTER' 
                            id='usernameFieldREGISTER' 
                            placeholder={formControls.usernameREGISTER.placeholder}
                            onChange={handleChange}
                            defaultValue={formControls.usernameREGISTER.value}
                            touched={formControls.usernameREGISTER.touched? 1 : 0}
                            valid= {formControls.usernameREGISTER.valid}
                            required
                        />
                        {formControls.usernameREGISTER.touched && !formControls.usernameREGISTER.valid &&
                        <div className = 'validators'> * Username must have at least 3 characters </div>}
                    </FormGroup>

                    <FormGroup id='passwordREGISTER'>
                        <label className = 'label' for='passwordFieldREGISTER'> PASSWORD </label>
                        <input 
                            className = 'input'
                            name='passwordREGISTER'
                            id='passwordFieldREGISTER' 
                            type = "password"
                            placeholder={formControls.passwordREGISTER.placeholder}
                            onChange={handleChange}
                            defaultValue={formControls.passwordREGISTER.value}
                            touched={formControls.passwordREGISTER.touched? 1 : 0}
                            valid={formControls.passwordREGISTER.valid}
                            required
                        />
                        {formControls.passwordREGISTER.touched && !formControls.passwordREGISTER.valid &&
                        <div className = 'validators'> * Password must have at least 6 characters </div>}
                    </FormGroup>

                    <div className = 'buttonStyle'> 
                        <Row>
                            <Col sm={{size: '4', offset: 8}}>
                                <button className = 'button' type={"submit"} onClick={handleSubmit}> REGISTER </button>
                            </Col>
                        </Row>
                    </div>
                    
                    {   response === "success-register" &&
                        <div className = "success"> Your account has been created !</div>
                    }

                    {    response === 'user existent-register' &&
                        <div className = "alert"> The user already exists !</div>
                    }

                    {    response === 'Username must have at least 5 characters' &&
                        <div className = "alert"> Username must have at least 5 characters</div>
                    }

                    {    response === 'Password must have at least 6 characters' &&
                        <div className = "alert"> Password must have at least 6 characters</div>
                    }

                </div>

                <div className = 'verticalLine'/>
                <h1 className = 'loginLabelStyle'> LOG-IN </h1>
                <h1 className = 'logoStyle' />
                <div className='loginFormStyle'>
                    <FormGroup id='usernameLOGIN'>
                        <label className = 'label' for='usernameFieldLOGIN'> USERNAME </label>
                        <input 
                            className = 'input'
                            name='usernameLOGIN' 
                            id='usernameFieldLOGIN' 
                            placeholder={formControls.usernameLOGIN.placeholder}
                            onChange={handleChange}
                            defaultValue={formControls.usernameLOGIN.value}
                            touched={formControls.usernameLOGIN.touched? 1 : 0}
                            valid= {formControls.usernameLOGIN.valid}
                            required
                        />
                    </FormGroup>

                    <FormGroup id='passwordLOGIN'>
                        <label className = 'label' for='passwordFieldLOGIN'> PASSWORD </label>
                        <input 
                            className = 'input'
                            type = "password"
                            name='passwordLOGIN'
                            id='passwordFieldLOGIN' 
                            placeholder={formControls.passwordLOGIN.placeholder}
                            onChange={handleChange}
                            defaultValue={formControls.passwordLOGIN.value}
                            touched={formControls.passwordLOGIN.touched? 1 : 0}
                            valid= {formControls.passwordLOGIN.valid}
                            required
                        />
                    </FormGroup>
             
                    <div className = 'buttonStyle'> 
                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <button className = 'button' type={"submit"} onClick={handleLogIn}> LOG IN </button>
                        </Col>
                    </Row>
                    </div>

                    {   localStorage.getItem("auth") === "true" &&
                        <div> <Navigate to = '/chat'/> </div>
                    }

                    {    response === 'wrong password-login' &&
                        <div className = "alert"> The username and password combination is incorrect !</div>
                    }
                    
                    {    response === "Userul nu exista!" &&
                        <div className = 'alert'> Username doesn't exist ! </div>
                    }

                </div>
                
            </div>
    );
}

export default HomePage;