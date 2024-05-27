import React from 'react';
import {
    Box, Card, CardActionArea, CardContent, CardHeader, darken, lighten, ThemeProvider, Typography
} from "@mui/material";
import {theme} from "../theme";
import {useNavigate} from "react-router-dom";


const card = (header, text, action) => {

    return (<React.Fragment>
        <Card className="card" variant="outlined" onClick={() => {
            action()
        }} sx={{
            border: "1px solid lightgray",
            width: "400px",
            height: "50%",
            backgroundColor: lighten(theme.palette.background.paper, 0.1),
        }}>
            <CardActionArea sx={{
                height: "100%",
            }}>
                <CardContent>
                    <Typography variant="h5" component="div" textAlign="center" sx={{}}>
                        {header}
                    </Typography>
                    <Typography variant="body1" component="div" textAlign="justify" sx={{mt: 2}}>
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </React.Fragment>)
}

export const ComparisonPage = () => {
    const navigate = useNavigate()

    return (<ThemeProvider theme={theme}>
        <div className="background"
             style={{backgroundColor: theme.palette.secondary.light, width: '100%', overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div className="container" style={{
                backgroundColor: theme.palette.background.paper, width: "80%", height: "100vh", overflow: "hidden",
            }}>
                <Typography variant="h3" component="div" textAlign="center" sx={{mt: 15}}>
                    Выберите один из предложенных вариантов
                </Typography>

                <Box style={{
                    flexGrow: 1,
                    mt: 10,
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                    overflow: "hidden",
                }}>
                    {card("Совместимость человек - человек", "Данная совместимость показывает возможные отношения между людьми, примерно показывает как люди относятся друг к другу.", () => {
                        navigate("/home/comparison/human")
                    })}
                    {card("Совместимость с городом", "Данная совместимость показывает подходящие города на основе полученной даты.",
                        () => {
                        navigate("/home/comparison/cities")
                        })}
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                    overflow: "hidden",
                }}>
                    {card}
                    {card}
                </Box>
            </div>
        </div>
    </ThemeProvider>)
}