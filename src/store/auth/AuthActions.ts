import User from "../../components/model/Users/User";

export type LoginAction = {
    type: string,
    payload: User
}