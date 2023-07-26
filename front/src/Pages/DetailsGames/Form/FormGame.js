import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Select from '@mui/material/Select'
import Option from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'

import UpdateModal from '../../../Components/UpdateModal/UpdateModal'
import { getAwards, getKeywords, getTypes, postNewGame } from '../../../api'

function FormGame({ submitRef, game }) {
    const validationSchema = yup.object({
        Name: yup.string().required('Requis'),
        Age: yup.number().required('Requis').min(0),
        MinPlayer: yup.number().required('Requis').min(1),
        MaxPlayer: yup.number().required('Requis').min(yup.ref('MinPlayer'), 'max'),
        Release: yup.number().min(-9999).max(9999),
        Brand: yup.string().required('Requis')
    })

    let initialValues = {
        Id: game.id ?? '',
        Name: game.Name ?? '',
        Age: game.Age ?? '',
        Status: game.Status ?? 'Disponible',
        Types: game.Types ?? [],
        MinPlayer: game.MinPlayer ?? '',
        MaxPlayer: game.MaxPlayer ?? '',
        Release: game.Release ?? '',
        Brand: game.Brand ?? '',
        KeyWords: game.KeyWords ?? [],
        Awards: game.Awards ?? [],
        Description: game.Description ?? ''
    }

    const [awards, setAwards] = useState([])
    const [keyWords, setKeywords] = useState([])
    const [types, setTypes] = useState([])
    const [disableStatus, setDisableStatus] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        if (!game.Status || game.Status === 'Loué') {
            setDisableStatus(true)
        } else {
            setDisableStatus(false)
        }
    }, [game.Status])

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

    function sendForm(newGame) {
        if (game.id) {
            setModalOpen(true)
        } else {
            postNewGame(newGame)
        }
    }
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendForm}>
            {({ handleChange, values, setFieldValue, touched, errors, handleSubmit }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={1}>
                            <TextField disabled fullWidth name="Id" label="Id" value={values.Id} />
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
                            <Select
                                fullWidth
                                disabled={disableStatus}
                                label="Etat"
                                name="Status"
                                onChange={handleChange}
                                value={values.Status}>
                                <Option value="Disponible">Disponible</Option>
                                <Option value="En réparation">En réparation</Option>
                                <Option value="Déclassé">Déclassé</Option>
                                <Option disabled value="Loué">
                                    Loué
                                </Option>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                multiple
                                name="Types"
                                options={types}
                                isOptionEqualToValue={(option, value) => option.Name === value.Name}
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
                                isOptionEqualToValue={(option, value) => option.Name === value.Name}
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
                                isOptionEqualToValue={(option, value) => option.Name === value.Name}
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
                    <UpdateModal
                        open={modalOpen}
                        setOpen={setModalOpen}
                        data={values}
                        type={'game'}
                    />
                </Box>
            )}
        </Formik>
    )
}

FormGame.propTypes = {
    submitRef: PropTypes.object,
    game: PropTypes.object
}

export default FormGame
