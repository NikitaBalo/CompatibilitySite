import React, {useContext} from "react"
import {
    AppBar, Button, IconButton, Stack, Toolbar, Typography
} from "@mui/material";
import SpatialTrackingOutlined from "@mui/icons-material/SpatialTrackingOutlined"
import {AuthContext} from "../context/auth.context";
import {useAuth} from "../hooks/auth.hook";

export const NavBar = () => {
    const auth = useContext(AuthContext)
    const {logout} = useAuth()

    if (!auth.isAuthenticated) return null
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <SpatialTrackingOutlined/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Not added name
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button color="inherit" href="/profile">Profile</Button>
                    <Button color="inherit" href="/home" >Home</Button>
                    <Button color="inherit" href="/" onClick={() => {
                        logout()
                    }}>Logout</Button>
                </Stack>
            </Toolbar>
        </AppBar>)
}