import React, {useEffect, useState} from "react";
import {Box, Button, ThemeProvider, Typography} from "@mui/material";
import {theme} from "../theme";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useForm} from "react-hook-form";
import {useHttp} from "../hooks/http.hook";
import dayjs from "dayjs";
require("dayjs/locale/ru")

export const HumanComparisonPage = () => {
    // const {
    //     register, handleSubmit, formState: {errors},
    // } = useForm()
    const {loading, error, request, clearError} = useHttp()
   dayjs.locale('ru')

    useEffect(() => {
        if (error) {
            console.error(error)
        }
        clearError()
    }, [error, clearError]);

    const [compatibility, setCompatibility] = useState(null)
    const [date1, setDate1] = useState(dayjs().format('YYYY'));
    const [date2, setDate2] = useState(dayjs().format('YYYY'))

    const RequestCompatibility = async (data) => {
        if (date1 !== null && date2 !== null) {
            try {
                const req = await request("http://localhost:5000/api/comparison/compatibility/human", 'POST', {"date1": dayjs(date1).format('YYYY'), "date2": dayjs(date2).format('YYYY')})
                setCompatibility(req.compatibility)
            } catch (error) {}
        }
    }

    const today = dayjs();
    const firstDay = dayjs("1-01-01T00:00:00.000")
    const lastDay = dayjs("2040-12-31T23:59:59.999")

    return (<ThemeProvider theme={theme}>
        <div className="background"
             style={{backgroundColor: theme.palette.secondary.light, width: '100%', overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className="container" style={{
                backgroundColor: theme.palette.background.paper, maxWidth: "1280px", width: "80vw", minHeight: "100vh", overflow: "hidden",
            }}>
                <Box width="100%" minHeight="100vh" sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}>
                    <Box width="100%" height="auto" style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}>
                        <Box width="400px" height="auto" sx={{
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"space-around",
                            alignItems: "center",
                        }}>
                            <Typography height="100px" variant="h5" textAlign="center" sx={{mt: 5}}>
                                Заполните вашу дату рождения
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={today}
                                    minDate={firstDay}
                                    maxDate={lastDay}
                                    type="date1"
                                    label="Дата рождения"
                                    format="DD.MM.YYYY"
                                    onChange={(value) => setDate1(value)}
                                    sx={{
                                        width: "300px", mt: 5
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box width="400px" height="auto" sx={{
                            display:"flex",
                            flexDirection:"column",
                            justifyContent:"space-around",
                            alignItems: "center",
                        }}>
                            <Typography height="100px"  variant="h5" textAlign="center" sx={{mt: 5}}>
                                Заполните дату рождения человека, совместимость с которым вы хотите узнать
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    defaultValue={today}
                                    minDate={firstDay}
                                    maxDate={lastDay}
                                    type="date2"
                                    label="Дата рождения"
                                    format="DD.MM.YYYY"
                                    onChange={(value) => setDate2(value)}
                                    sx={{
                                        width: "300px", mt: 5
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box visibility={compatibility ? "visible" : "hidden"}>
                        <Typography variant="h3">
                            {compatibility}
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" type="submit" color="success" size="large" onClick={() => {RequestCompatibility().then(r => {})}}>
                            Узнать
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    </ThemeProvider>)
}