import React from "react";

import {createBrowserRouter} from "react-router-dom";
import {SearchPage} from "./pages/SearchPage";
import {ProfilePage} from "./pages/ProfilePage";
import {RegisterForm} from "./pages/elements/RegisterForm";
import {LoginForm} from "./pages/elements/LoginForm";
import {HomePage} from "./pages/HomePage";
import {ComparisonPage} from "./pages/ComparisonPage";
import {HumanComparisonPage} from "./pages/HumanComparisonPage";



export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return createBrowserRouter(
            [
                {
                    path: "*",
                    element: <HomePage />,
                },
                {
                    path: "/profile",
                    element: <ProfilePage />,
                },
                {
                    path: "/search",
                    element: <SearchPage/>,
                },
                {
                    path: "/home/comparison",
                    element: <ComparisonPage/>,
                },
                {
                    path: "home/comparison/human",
                    element: <HumanComparisonPage/>,
                },
                {
                    path: "home/comparison/cities",
                    element: <ComparisonPage/>, // to implement
                }
            ]
        )
    } else {
        return createBrowserRouter(
            [
                {
                    path: "*",
                    element: <LoginForm />,
                },
                {
                    path: "/register",
                    element: <RegisterForm />,
                },
            ]
        )
    }
}