import UserCreate from "../model/Users/UserCreate";
import {useState} from "react";
import User from "../model/Users/User";
import {useNavigate} from "react-router-dom";
import UserLogin from "../model/Users/UserLogin";

const useAuthHook = () => {

    const navigate = useNavigate();
    const URL: string = process.env.REACT_APP_BACKEND + "/users";
    const [user, setUser] = useState<User>({bio: "", email: "", token: "", username: "", image: ""});
    const [errors, setErrors] = useState<string[]>([]);
    const [disableSubmitBtn, setDisDisableSubmitBtn] = useState(false);

    const [token, setToken] = useState<string>(localStorage.getItem('jwtToken') ?? '')

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

    const sendRegisterOrLogin = async (user: UserCreate | UserLogin, isLogin: boolean) => {
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
            const {user}: { user: User } = await response.json();
            setUser(user);
            setToken(user.token);
            console.log(user.token)
            localStorage.setItem('jwtToken', user.token);
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

    const logout = async () => {
        setToken('');
        localStorage.setItem('jwtToken', '')
    }

    async function signUp(user: UserCreate) {
        await sendRegisterOrLogin(user, false)
    }

    const isConnected = user.token !== '';
    const hasErrors = errors.length > 0;

    return {
        token,
        disableSubmitBtn,
        errors,
        isConnected,
        hasErrors,
        login,
        signUp,
        user
    }
};

export default useAuthHook;