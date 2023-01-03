import {useState} from "react";
import useAuthHook from "./use-auth.hook";
import {NavLink} from "react-router-dom";

type RegisterProps = {
    isLogin: boolean
}

function RegisterOrLogin({isLogin}: RegisterProps) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {disableSubmitBtn, errors, hasErrors, signUp, login} = useAuthHook();


    const submit = () => {
        if (isLogin) {
            login({email: email, password: password});
            return;
        }
        signUp({email: email, password: password, username: username});
    }

    const txt = isLogin ? 'Sign in' : 'Sign up';
    const link = isLogin ? <NavLink to="/register">Need an account?</NavLink> :
        <NavLink to="/login">Have an account?</NavLink>
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{txt}</h1>
                        <p className="text-xs-center">
                            {link}
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
                                {!isLogin && (<input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) => setUsername(e.target.value)}/>)
                                }</fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Email"
                                       onChange={(e) => {
                                           setEmail(e.target.value)
                                       }}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" placeholder="Password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right"
                                    disabled={disableSubmitBtn}
                                    onClick={() => submit()}>{txt}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterOrLogin;