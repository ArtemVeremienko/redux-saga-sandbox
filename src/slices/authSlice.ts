import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useAppSelector } from "../store";

interface AuthState {
    token: string | null
    error: null | unknown
}

const initialState: AuthState = {
    token: null,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.token = null
            state.error = null
        },
        reject: (state, action: PayloadAction<unknown>) => {
            state.error = action.payload
        }
    }
})

export const { setToken, reject, logout } = authSlice.actions
export const useAuthSelector = () => useAppSelector(state => state.auth)
export default authSlice.reducer