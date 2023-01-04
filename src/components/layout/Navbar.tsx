import React from "react";
import {NavLink} from "react-router-dom";
import useAuthHook from "../authentification/use-auth.hook";

function Navbar() {
    const {isConnected, user: currentUser} = useAuthHook();


    const renderConnectedNavBar = () => {
        return (<>
            <li className="nav-item">
                <NavLink className="nav-link" to="/editor"> <i className="ion-compose"></i>&nbsp;New Article </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to={`/profile/${currentUser.username}`}>
                    {currentUser.username}
                    <img className='user-pic' src={`${currentUser.image}`} alt=""/>
                </NavLink>
            </li>
        </>);
    }
    const renderNavBar = () => {
        return (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Sign in</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Sign up</NavLink>
                </li>
            </>
        )
    }
    const navbarPart = isConnected ? renderConnectedNavBar() : renderNavBar();

    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to={"/"}>conduit</NavLink>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/">Home</NavLink>
                        </li>
                        {navbarPart}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;