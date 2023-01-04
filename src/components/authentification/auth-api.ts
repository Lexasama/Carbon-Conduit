import UserCreate from "../model/Users/UserCreate";


const URL: string = process.env.REACT_APP_BACKEND + '/register';
export async function login(user: UserCreate){

    return  await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({user: user})
    })
}