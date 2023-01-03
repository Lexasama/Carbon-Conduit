import UserCreate from "../model/Users/UserCreate";
import {useState} from "react";
import User from "../model/Users/User";
import {useNavigate} from "react-router-dom";
import UserLogin from "../model/Users/UserLogin";
import userLogin from "../model/Users/UserLogin";

const useAuthHook = () => {

    const navigate = useNavigate();
    const URL: string = process.env.REACT_APP_BACKEND + "/users";
    const [accessToken, setToken] = useState("");
    const [user, setUser] = useState<User>();
    const [errors, setErrors] = useState<string[]>([]);
    const [disableSubmitBtn, setDisDisableSubmitBtn] = useState(false);

    type ErrorType = {
        errors: {
            email?: string[],
            username?: string[]
        }
    }

    const buildErrorMsg = (errors: ErrorType) => {
        const errorMsg: string[] = [];
        const x: any = Object.entries(errors.errors)
        x.map((obj: string[]) => errorMsg.push("That " + obj[0] + ' ' + obj[1]))
        return errorMsg
    }

    const sendRegisterOrLogin = async (user: UserCreate | userLogin, isLogin: boolean) => {
        setDisDisableSubmitBtn(true);
        const url = isLogin ? URL + '/login' : URL;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({user: user})
        });

        if (response.ok) {
            const result = await response.json()
            setToken(result.token);
            localStorage.setItem("jwtToken", result.user.token)
            setUser(result);
            navigate("/")
            return;
        }
        if (response.status === 422) {
            setErrors(buildErrorMsg(await response.json()));
        }
        setDisDisableSubmitBtn(false);
    }

    const login = async (user: UserLogin) => {
        await sendRegisterOrLogin(user, true);
    }

    async function signUp(user: UserCreate) {
        await sendRegisterOrLogin(user, false)
    }

    const isConnected = user?.token !== "";
    const hasErrors = errors.length > 0;

    return {
        accessToken,
        disableSubmitBtn,
        errors,
        isConnected,
        hasErrors,
        login,
        signUp
    }
};

export default useAuthHook;