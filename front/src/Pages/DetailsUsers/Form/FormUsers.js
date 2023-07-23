/* eslint-disable no-unused-vars */
import { Formik } from 'formik'
import * as yup from 'yup'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'

import { postNewUser } from '../../../api'

function FormGame({ submitRef }) {
    const [phone, setPhone] = useState('')

    const validationSchema = yup.object({
        FirstName: yup.string().required('Requis'),
        LastName: yup.string().required('Requis'),
        PhoneNumber: yup
            .string()
            .required('Requis')
            .test('valide-tel', 'Numéro de téléphone invalide', function (value) {
                return matchIsValidTel(value)
            }),
        Address: yup.string().required('Requis'),
        City: yup.string().required('Requis'),
        ZipCode: yup.string().required('Requis')
    })

    const initialValues = {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Address: '',
        City: '',
        ZipCode: '',
        CreatedAt: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={postNewUser}>
            {({ handleChange, values, touched, errors, handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={1}>
                            <TextField disabled fullWidth name="Id" label="Id" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                name="LastName"
                                label="Nom"
                                value={values.LastName}
                                onChange={handleChange}
                                error={touched.LastName && Boolean(errors.LastName)}
                                helperText={touched.LastName && errors.LastName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                name="FirstName"
                                label="Prénom"
                                value={values.FirstName}
                                onChange={handleChange}
                                error={touched.FirstName && Boolean(errors.FirstName)}
                                helperText={touched.FirstName && errors.FirstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                disabled
                                fullWidth
                                name="CreatedAt"
                                label="Date d'enregistrement"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="Email"
                                label="Email"
                                value={values.Email}
                                onChange={handleChange}
                                error={touched.Email && Boolean(errors.Email)}
                                helperText={touched.Email && errors.Email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                name="ZipCode"
                                label="Code postale"
                                value={values.ZipCode}
                                onChange={handleChange}
                                error={touched.ZipCode && Boolean(errors.ZipCode)}
                                helperText={touched.ZipCode && errors.ZipCode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                name="City"
                                label="Ville"
                                value={values.City}
                                onChange={handleChange}
                                error={touched.City && Boolean(errors.City)}
                                helperText={touched.City && errors.City}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                required
                                fullWidth
                                name="Address"
                                label="Adresse"
                                value={values.Address}
                                onChange={handleChange}
                                error={touched.Address && Boolean(errors.Address)}
                                helperText={touched.Address && errors.Address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <MuiTelInput
                                required
                                fullWidth
                                defaultCountry="BE"
                                name="PhoneNumber"
                                label="Téléphone"
                                value={values.PhoneNumber}
                                onChange={(e) => {
                                    values.PhoneNumber = e
                                    setPhone(e)
                                }}
                                error={touched.PhoneNumber && Boolean(errors.PhoneNumber)}
                                helperText={touched.PhoneNumber && errors.PhoneNumber}
                            />
                        </Grid>
                        <button ref={submitRef} type="submit" style={{ display: 'none' }} />
                    </Grid>
                </Box>
            )}
        </Formik>
    )
}

FormGame.propTypes = {
    submitRef: PropTypes.object
}

export default FormGame
