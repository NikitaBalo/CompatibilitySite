import React, {useContext} from "react"
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import {RouterProvider} from "react-router-dom";
import {useRoutes} from "./routes";
import {NavBar} from "./components/NavBar";


export const App = () => {
    const auth = useContext(AuthContext);
    const {token, userId, login, logout} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
            <ThemeProvider theme={theme}>
                <div>
                    <NavBar/>
                    <CssBaseline/>
                    <RouterProvider router={routes}/>
                </div>
            </ThemeProvider>
        </AuthContext.Provider>)
        ;
}
