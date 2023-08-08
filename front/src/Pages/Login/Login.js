import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TextField, Typography, Container, Box, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { getAccessToken } from '../../api'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = ({ setUser }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        Email: Yup.string().email("Mauvais format d'email").required('Email requis'),
        Password: Yup.string().required('Mot de passe requis')
    })

    const initialValues = {
        Password: '',
        Email: ''
    }

    async function handleLogin(values) {
        try {
            await getAccessToken(values).then((res) => {
                sessionStorage.setItem('user', JSON.stringify(res))
                setUser(res)
                navigate('/listUsers')
            })
        } catch (error) {
            setErrorMessage('Mauvais identifiants')
        }
    }

    return (
        <Container maxWidth="xs">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '5rem'
                }}>
                <AccountCircleIcon style={{ fontSize: 64 }} color="primary" />
                <Typography variant="h5" component="h1" color="primary" gutterBottom>
                    Connexion
                </Typography>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}>
                    {({ handleChange, values, touched, errors, handleSubmit }) => (
                        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField
                                required
                                fullWidth
                                name="Email"
                                label="Email"
                                value={values.Email}
                                onChange={handleChange}
                                error={touched.Email && Boolean(errors.Email)}
                                helperText={touched.Email && errors.Email}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Mot de passe"
                                type="password"
                                fullWidth
                                name="Password"
                                value={values.Password}
                                onChange={handleChange}
                                error={touched.Password && Boolean(errors.Password)}
                                helperText={touched.Password && errors.Password}
                                sx={{ mb: 2 }}
                            />
                            {errorMessage && (
                                <Typography align="center" style={{ color: 'red' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Se connecter
                            </Button>
                        </Box>
                    )}
                </Formik>
            </div>
        </Container>
    )
}

Login.propTypes = {
    setUser: PropTypes.func
}

export default Login
