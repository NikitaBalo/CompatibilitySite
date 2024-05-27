import React, {useContext, useEffect} from "react"
import {
    Box, Button, Checkbox, Container, FormControlLabel, Link, Slide, TextField, ThemeProvider, Typography
} from "@mui/material"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom";
import {theme} from "../../theme";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/auth.context";


export const LoginForm = () => {
    const auth = useContext(AuthContext);
    const {
        register, handleSubmit, formState: {errors},
    } = useForm()

    const {loading, error, request, clearError} = useHttp()

    const navigate = useNavigate()

    useEffect(() => {
        if (error) {
            console.error(error)
        }
        clearError()
    }, [error, clearError]);

    const HandleAuthorization = async (data) => {
        try {
            const req = await request('http://localhost:5000/api/auth/login', 'POST', {...data})
            auth.login(req.token, req.userId)
            navigate(`/profile`)
        } catch (e) {
        }
    }

    return (<ThemeProvider theme={theme}>
        <Slide direction="up" in={true} mountOnEnter>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(HandleAuthorization)}
                    sx={{
                        maxWidth: '500px',
                        margin: 'auto',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px #ffffff50',
                        backgroundColor: 'gray',
                    }}>
                    <Typography variant="h5" component="div"
                                sx={{mb: 2, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px'}}>
                        Авторизация
                    </Typography>
                    <TextField
                        id="username_textfield_outlined"
                        variant="outlined"
                        type="email"
                        fullWidth
                        disabled={loading}
                        label="Почта"
                        {...register("email", {required: 'Почта обязательна',})}
                        error={Boolean(errors.username)}
                        helperText={errors.username?.message}
                        margin="normal"
                        autoComplete="email"
                    />
                    <TextField
                        id="password_textfield_outlined"
                        variant="outlined"
                        fullWidth
                        disabled={loading}
                        type="password"
                        label="Пароль"
                        {...register('password', {required: 'Пароль обязателен',})}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        margin="normal"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('rememberMe')} color="primary"/>}
                        label="Запомнить меня"
                        sx={{mt: 1, textAlign: 'left'}}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}} disabled={loading}>
                        Войти
                    </Button>
                    <Box sx={{mt: 2, textAlign: 'center'}}>
                        <Link href="#" variant="body2">
                            Забыли пароль?
                        </Link>
                        <Box mt={1}>
                            <Link href="" variant="body2" onClick={
                                () => {
                                    navigate("/register")
                                }
                            }>
                                Нет аккаунта? Зарегистрируйся.
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Slide>
    </ThemeProvider>)
}