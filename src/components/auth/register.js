import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function registerUser() {
        if (password !== passwordConf) {
            setErrorMessage('Passwords do not match');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            setErrorMessage('Email is already registered');
            return;
        }

        const user = {
            name,
            email,
            password,
        };

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        setErrorMessage('');
        navigate('/');
    }

    return (
        <div>
            
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Register</h1>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="form-group">
                            <label>Name:</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={name}
                                onInput={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input 
                                type="email"
                                className="form-control"
                                value={email}
                                onInput={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input 
                                type="password"
                                className="form-control"
                                value={password}
                                onInput={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input 
                                type="password"
                                className="form-control"
                                value={passwordConf}
                                onInput={(event) => setPasswordConf(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={registerUser}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;