import React, {useContext} from "react";
import {AuthContext} from "../context/auth.context";

export const ProfilePage = () => {
    const auth = useContext(AuthContext)


    return (
        <div>
            <h1>
                Profile Page <br/>
                For userId {auth.userId}
            </h1>
        </div>
    )
}