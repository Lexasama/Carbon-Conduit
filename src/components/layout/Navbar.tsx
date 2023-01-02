import React from "react";
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to={"/"}>conduit</NavLink>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to=""> <i className="ion-compose"></i>&nbsp;New Article </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to=""> <i className="ion-gear-a"></i>&nbsp;Settings </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="">Sign in</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Sign up</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
export default Navbar;