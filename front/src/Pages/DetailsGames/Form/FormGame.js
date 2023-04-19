import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'

import { getAwards, getKeywords, getTypes, postNewGame } from '../../../api'

function FormGame({ submitRef }) {
    const validationSchema = yup.object({
        Name: yup.string().required('Requis'),
        Age: yup.number().required('Requis').min(0),
        MinPlayer: yup.number().required('Requis').min(1),
        MaxPlayer: yup.number().required('Requis').min(yup.ref('MinPlayer'), 'max'),
        Release: yup.number().min(-9999).max(9999),
        Brand: yup.string().required('Requis')
    })

    const initialValues = {
        Name: '',
        Age: '',
        Status: 'Disponnible',
        Types: [],
        MinPlayer: '',
        MaxPlayer: '',
        Release: '',
        Brand: '',
        KeyWords: [],
        Awards: [],
        Description: ''
    }

    // const submit = (values) => {
    //     postNewGame(values)
    // }

    const [awards, setAwards] = useState([])
    const [keyWords, setKeywords] = useState([])
    const [types, setTypes] = useState([])
    function getAutocompleteData() {
        getAwards().then((data) => {
            setAwards(data.map((obj) => obj))
        })
        getKeywords().then((data) => {
            setKeywords(data.map((obj) => obj))
        })
        getTypes().then((data) => {
            setTypes(data.map((obj) => obj))
        })
    }
    useEffect(() => {
        try {
            getAutocompleteData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={postNewGame}>
            {({ handleChange, values, setFieldValue, touched, errors, handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={1}>
                            <TextField disabled fullWidth name="Id" label="Id" />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                fullWidth
                                name="Name"
                                label="Nom"
                                value={values.Name}
                                onChange={handleChange}
                                error={touched.Name && Boolean(errors.Name)}
                                helperText={touched.Name && errors.Name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <TextField
                                required
                                fullWidth
                                name="Age"
                                type="number"
                                label="Age minimum"
                                value={values.Age}
                                onChange={handleChange}
                                error={touched.Age && Boolean(errors.Age)}
                                helperText={touched.Age && errors.Age}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                disabled
                                name="Status"
                                label="Etat"
                                value={values.Status}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                multiple
                                name="Types"
                                options={types}
                                getOptionLabel={(option) => option.Name}
                                renderInput={(params) => <TextField {...params} label="Types" />}
                                value={values.Types}
                                onChange={(e, value) => {
                                    setFieldValue(
                                        'Types',
                                        value !== null ? value : initialValues.Types
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <TextField
                                required
                                fullWidth
                                name="MinPlayer"
                                type="number"
                                label="J min"
                                value={values.MinPlayer}
                                onChange={handleChange}
                                error={touched.MinPlayer && Boolean(errors.MinPlayer)}
                                helperText={touched.MinPlayer && errors.MinPlayer}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <TextField
                                required
                                fullWidth
                                name="MaxPlayer"
                                type="number"
                                label="J max"
                                value={values.MaxPlayer}
                                onChange={handleChange}
                                error={touched.MaxPlayer && Boolean(errors.MaxPlayer)}
                                helperText={touched.MaxPlayer && errors.MaxPlayer}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                name="Release"
                                type="Number"
                                label="Année de parution"
                                value={values.Release}
                                onChange={handleChange}
                                error={touched.Release && Boolean(errors.Release)}
                                helperText={touched.Release && errors.Release}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                required
                                fullWidth
                                name="Brand"
                                label="Marque"
                                value={values.Brand}
                                onChange={handleChange}
                                error={touched.Brand && Boolean(errors.Brand)}
                                helperText={touched.Brand && errors.Brand}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Autocomplete
                                multiple
                                name="KeyWords"
                                options={keyWords}
                                getOptionLabel={(option) => option.Name}
                                renderInput={(params) => (
                                    <TextField {...params} label="Mots clés" />
                                )}
                                value={values.KeyWords}
                                onChange={(e, value) => {
                                    setFieldValue(
                                        'KeyWords',
                                        value !== null ? value : initialValues.KeyWords
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Autocomplete
                                multiple
                                name="Awards"
                                options={awards}
                                getOptionLabel={(option) => option.Name}
                                renderInput={(params) => <TextField {...params} label="Prix" />}
                                value={values.Awards}
                                onChange={(e, value) => {
                                    setFieldValue(
                                        'Awards',
                                        value !== null ? value : initialValues.Awards
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                maxRows={4}
                                name="Description"
                                value={values.Description}
                                onChange={handleChange}
                                error={touched.Description && Boolean(errors.Description)}
                                helperText={touched.Description && errors.Description}
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
