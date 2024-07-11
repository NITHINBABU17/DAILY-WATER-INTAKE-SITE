import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar";
import AuthContext from "../../context/AuthContext";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    function attemptLogin() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            setErrorMessage('');
            login(user.email);  
            navigate('/dashboard');
        } else {
            setErrorMessage('Invalid email or password');
        }
    }

    return (
        <div>
            
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Login</h1>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <div className="form-group">
                            <label>Email:</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input 
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;