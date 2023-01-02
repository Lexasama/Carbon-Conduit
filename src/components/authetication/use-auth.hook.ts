import UserCreate from "../model/Users/UserCreate";
import {useState} from "react";
import User from "../model/Users/User";
import {useNavigate} from "react-router-dom";

const useAuthHook = () => {

    const navigate = useNavigate();
    const URL: string = process.env.REACT_APP_BACKEND + "/users";
    const [accessToken, setToken] = useState("");
    const [user, setUser] = useState<User>();
    const [errors, setErrors] = useState<string[]>([]);
    const [disableSignUp, setDisDisableSignUp] = useState(false);

    type errorType = {
        errors: {
            email?: string[],
            username?: string[]
        }
    }

    async function signUp(user: UserCreate) {
        setDisDisableSignUp(true)
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({user: user})
        }
        const response = await fetch(URL, options);

        if (response.ok) {
            const result = await response.json()
            setToken(result.token);
            setUser(result);
            navigate("/")
            return;
        }
        if (response.status === 422) {
            const errorMsg: string[] = [];
            const json: errorType = await response.json();
            const x: any = Object.entries(json.errors)
            x.map((obj: string[]) => errorMsg.push("That " + obj[0] + ' ' + obj[1]))
            setErrors(errorMsg);
            console.log(errors)
        }
        setDisDisableSignUp(false);
    }


    const isConnected = user?.token !== "";
    const hasErrors = errors.length > 0;

    return {
        accessToken,
        disableSignUp,
        errors,
        isConnected,
        hasErrors,
        signUp
    }
};

export default useAuthHook;