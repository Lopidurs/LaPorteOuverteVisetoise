/* eslint-disable no-unused-vars */
import { Formik } from 'formik'
import * as yup from 'yup'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useNavigate } from 'react-router-dom'

import UpdateModal from '../../../Components/UpdateModal/UpdateModal'

import { postNewUser } from '../../../api'

function FormUsers({ submitRef, user }) {
    const [phone, setPhone] = useState('')
    let navigate = useNavigate()

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
        Association: yup.string(),
        City: yup.string().required('Requis'),
        ZipCode: yup.string().required('Requis'),
        Email: yup.string().email('Email invalide').required('Requis')
    })

    const initialValues = {
        id: user.id ?? '',
        FirstName: user.FirstName ?? '',
        LastName: user.LastName ?? '',
        Email: user.Email ?? '',
        PhoneNumber: user.PhoneNumber ?? '',
        Address: user.Address ?? '',
        City: user.City ?? '',
        Association: user.Association ?? '',
        ZipCode: user.ZipCode ?? '',
        AgreesImageRights: user.AgreesImageRights ?? false,
        createdAt: user.createdAt ?? ''
    }

    const [modalOpen, setModalOpen] = useState(false)

    function sendForm(newUser) {
        if (user.id) {
            setModalOpen(true)
        } else {
            postNewUser(newUser).then(() => {
                navigate(`/ListUsers`)
            })
        }
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendForm}>
            {({ handleChange, values, touched, errors, handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <TextField disabled fullWidth name="id" label="Id" value={values.id} />
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
                        <Grid item xs={12} sm={2}>
                            <TextField
                                disabled
                                fullWidth
                                name="CreatedAt"
                                label="Date d'enregistrement"
                                value={values.createdAt.slice(0, 10)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
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
                        <Grid item xs={12} sm={2}>
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
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <InputLabel id="select-label">Droit à l&apos;image</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="select-label"
                                    label="Droit à l'image"
                                    name="AgreesImageRights"
                                    onChange={handleChange}
                                    value={values.AgreesImageRights}>
                                    <MenuItem value={true}>Oui</MenuItem>
                                    <MenuItem value={false}>Non</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                            <TextField
                                fullWidth
                                name="Association"
                                label="Association"
                                value={values.Association}
                                onChange={handleChange}
                                error={touched.Association && Boolean(errors.Association)}
                                helperText={touched.Association && errors.Association}
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
                    <UpdateModal
                        open={modalOpen}
                        setOpen={setModalOpen}
                        data={values}
                        type={' user '}
                    />
                </Box>
            )}
        </Formik>
    )
}

FormUsers.propTypes = {
    submitRef: PropTypes.object,
    user: PropTypes.object
}

export default FormUsers
