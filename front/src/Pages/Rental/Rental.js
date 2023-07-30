import { Formik } from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { FieldArray } from 'formik'
import RentalFormRow from './RentalFormRow/RentalFormRow'
import AddIcon from '@mui/icons-material/Add'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ValidationModal from './ValidationModal/ValidationModal.js'

function Rental() {
    const [openValidation, setOpenValidation] = useState(false)
    const [rentals, setRentals] = useState([])

    const id = parseInt(useParams().id)

    const initialValues = {
        rentals: rentals
    }

    useEffect(() => {
        setRentals(initialValues.rentals)
    }, [])

    return (
        <div className={'container'}>
            <Formik enableReinitialize={true} initialValues={initialValues}>
                {({ handleChange, values, handleSubmit }) => (
                    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                        <FieldArray name="rentals">
                            {({ push, remove }) => (
                                <>
                                    {values.rentals.map((rental, index) => (
                                        <RentalFormRow
                                            key={index}
                                            index={index}
                                            values={values}
                                            handleChange={handleChange}
                                            remove={remove}
                                        />
                                    ))}
                                    <Grid container justifyContent="space-between">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() =>
                                                push({
                                                    id: '',
                                                    BeginRental: dayjs(),
                                                    EndRental: dayjs().add(14, 'day')
                                                })
                                            }
                                            startIcon={<AddIcon />}>
                                            Ajouter
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setOpenValidation(true)}>
                                            Enregistrer
                                        </Button>
                                    </Grid>
                                </>
                            )}
                        </FieldArray>
                        <ValidationModal
                            values={values.rentals}
                            open={openValidation}
                            setOpen={setOpenValidation}
                            id={id}
                        />
                    </Box>
                )}
            </Formik>
        </div>
    )
}

export default Rental
