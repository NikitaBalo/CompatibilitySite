import {createContext} from "react"

function not() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: not(),
    logout: not(),
    isAuthenticated: false,
});