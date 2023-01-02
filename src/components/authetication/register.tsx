import UserCreate from "../model/Users/UserCreate";
import {useState} from "react";
import useAuthHook from "./use-auth.hook";
import {NavLink} from "react-router-dom";

function Register() {
    const defaultUser: UserCreate = {
        email: "",
        password: "",
        username: ""
    }

    const [user, setUser] = useState<UserCreate>(defaultUser);
    const {disableSignUp, errors, hasErrors, signUp} = useAuthHook();

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <NavLink to="/login">Have an account?</NavLink>
                        </p>
                        {hasErrors &&
                            <ul className="error-messages">{
                                errors.map((msg, index) => {
                                    return (
                                        <li key={index}>{msg}</li>);
                                })}
                            </ul>
                        }
                        <form onSubmit={e => e.preventDefault()}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) => {
                                        setUser((user) => ({...user, username: e.target.value}))
                                    }}/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Email"
                                       onChange={(e) => {
                                           setUser((user) => ({...user, email: e.target.value}))
                                       }}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" placeholder="Password"
                                       onChange={(e) => setUser({...user, password: e.target.value})}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right"
                                    disabled={disableSignUp}
                                    onClick={() => signUp(user)}>Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;