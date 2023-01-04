import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as authApi from '../../components/authentification/auth-api';
import User from "../../components/model/Users/User";
import {RootState} from "../store";
import UserCreate from "../../components/model/Users/UserCreate";

export type AuthState = {
    user: User
}

const initialState: AuthState = {
    user: {
        email: "",
        image: "",
        token: "",
        username: "",
        bio: ""
    }
}

export const register = createAsyncThunk("/login", async (user: UserCreate) => {
    const response = await authApi.login(user);
    return (await response.json()) as User;
});
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload
        });
    }
});

export const currentUser = (state: RootState) => state.auth.user;

export const token = (state: RootState) => state.auth.user.token;


export default authSlice.reducer;