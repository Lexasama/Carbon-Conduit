import React from "react";
import {NavLink} from "react-router-dom";
import useAuthHook from "../authetication/use-auth.hook";

function Navbar() {
    const {isConnected} = useAuthHook();

    const renderConnectedNavBar = () => {
        return (<>
            <li className="nav-item">
                <a className="nav-link" href=""> <i className="ion-compose"></i>&nbsp;New Article </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href=""> <i className="ion-gear-a"></i>&nbsp;Settings </a>
            </li>
        </>);
    }
    const renderNavBar = () => {
        return (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="">Sign in</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Sign up</a>
                </li>
            </>
        )
    }
    const part = isConnected ? renderConnectedNavBar() : renderNavBar();

    return (
        <>
            <nav className="navbar navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to={"/"}>conduit</NavLink>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/">Home</NavLink>
                        </li>
                        {part}

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;