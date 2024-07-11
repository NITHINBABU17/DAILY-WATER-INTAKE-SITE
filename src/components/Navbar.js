import { NavLink } from "react-router-dom";
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Navbar() {
    const { auth, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>AQUA</h4>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/aboutus" className="nav-link">
                            About Us
                        </NavLink>
                    </li>
                    {auth ? (
                        <>
                            <li className="nav-item">
                                <NavLink 
                                    to="/water-intake" 
                                    className={status => 'nav-link ' + (status.isActive ? 'active' : '')}
                                >
                                    Water Intake
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/listwater" 
                                    className={status => 'nav-link ' + (status.isActive ? 'active' : '')}
                                >
                                    Water List
                                </NavLink>
                            </li>




                            <li className="nav-item">
                                <button className="nav-link btn" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink 
                                    to="/register" 
                                    className={status => 'nav-link ' + (status.isActive ? 'active' : '')}
                                >
                                    Register
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/login" 
                                    className={status => 'nav-link ' + (status.isActive ? 'active' : '')}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;








