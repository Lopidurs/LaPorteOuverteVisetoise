/* eslint-disable no-unused-vars */
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { getGame, getReservationsForGame } from '../../../api'

function RentalFormRow({ index, values, handleChange, remove }) {
    const [game, setGame] = useState({ Name: '', Status: '' })
    const [reservations, setReservations] = useState([])
    const [beginRentalDate, setBeginRentalDate] = useState(dayjs(values.rentals[index].BeginRental))
    const [endRentalDate, setEndRentalDate] = useState(dayjs(values.rentals[index].EndRental))

    useEffect(() => {
        getGame(values.rentals[index].id).then((data) => {
            if (data) {
                setGame(data)
                values.rentals[index].Name = data.Name
                values.rentals[index].Status = data.Status
            } else {
                setGame({ Name: '', Status: '' })
                values.rentals[index].Name = ''
                values.rentals[index].Status = ''
            }
        })

        getReservationsForGame(values.rentals[index].id).then((reservationsData) => {
            setReservations(reservationsData)
        })
    }, [values.rentals[index].id])

    function updateStatus() {
        const isMissing = reservations.some((reservation) => {
            return dayjs(reservation.EndRental).isBefore(dayjs())
        })

        const isAvailable = reservations.some((reservation) => {
            return (
                endRentalDate.isBefore(reservation.BeginRental) ||
                beginRentalDate.isAfter(reservation.EndRental)
            )
        })

        if (isMissing) return 'Manquant'
        if (isAvailable) return 'Disponible'
        return 'Non disponible'
    }

    useEffect(() => {
        if (
            game.Status === 'Disponible' ||
            game.Status === 'Manquant' ||
            game.Status === 'Non disponible'
        ) {
            const newStatus = updateStatus()

            setGame((game) => ({ ...game, Status: newStatus }))
            values.rentals[index].Status = newStatus
        }
    }, [beginRentalDate, endRentalDate, reservations])

    return (
        <Box my={2}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={2}>
                    <TextField
                        required
                        fullWidth
                        name={`rentals.${index}.id`}
                        label="id"
                        type="number"
                        value={values.rentals[index].id}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <DatePicker
                        required
                        label="Date début location"
                        value={dayjs(values.rentals[index].BeginRental)}
                        onChange={(date) => {
                            values.rentals[index].EndRental = dayjs(date)
                            setBeginRentalDate(dayjs(date))
                        }}
                        format="DD/MM/YYYY"
                        name={`rentals.${index}.BeginRental`}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <DatePicker
                        required
                        label="Date fin location"
                        value={dayjs(values.rentals[index].EndRental)}
                        onChange={(date) => {
                            values.rentals[index].EndRental = dayjs(date)
                            setEndRentalDate(dayjs(date))
                        }}
                        format="DD/MM/YYYY"
                        name={`rentals.${index}.EndRental`}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        disabled
                        label="Nom"
                        name={`rentals.${index}.Name`}
                        value={game.Name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        fullWidth
                        focused
                        disabled
                        sx={
                            game.Status === 'Disponible'
                                ? {}
                                : {
                                      '& .Mui-disabled': {
                                          color: 'red'
                                      },
                                      '& .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline':
                                          {
                                              borderColor: 'red'
                                          }
                                  }
                        }
                        label="Statuts"
                        name={`rentals.${index}.Statuts`}
                        value={game.Status}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => remove(index)}>
                        <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

RentalFormRow.propTypes = {
    index: PropTypes.number.isRequired,
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default RentalFormRow
