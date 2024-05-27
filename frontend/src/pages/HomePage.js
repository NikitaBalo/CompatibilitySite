import {Box, Button, ThemeProvider, Typography} from "@mui/material";
import {theme} from "../theme";
import React from "react";
import {useNavigate} from "react-router-dom";

export const HomePage = () => {

    const navigate = useNavigate()

    const StartComparison = () => {
        navigate(`/home/comparison`)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="background"
                 style={{backgroundColor: theme.palette.secondary.light, width: '100%', overflow: "hidden",}}>
                <div className="container" style={{
                    backgroundColor: theme.palette.background.paper,
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}>
                    <Box className="row" sx={{
                        flexGrow: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                    }}>
                        <Typography variant="h1" align="center" component="div" fontSize="lg" sx={{mt: 10}}>
                            Узнать совместимость
                        </Typography>
                        <Typography variant="h6" sx={{mt: 5,}} fontSize="sm">
                            На данной странице есть возможность ...
                        </Typography>
                        <Button variant="contained" color="primary" size="large" component="div" sx={{mt: 10}} onClick={
                           () => {
                            StartComparison()
                        }
                        }>
                            Проверить
                        </Button>
                    </Box>


                </div>
            </div>
        </ThemeProvider>

    )
}