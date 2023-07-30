import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { getGame } from '../../../api'

function RentalFormRow({ index, values, handleChange, remove }) {
    const [game, setGame] = useState({ Name: '', Status: '' })

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
    }, [values.rentals[index].id])

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
                        label="Date début rental"
                        value={dayjs(values.rentals[index].BeginRental)}
                        onChange={handleChange}
                        format="DD/MM/YYYY"
                        name={`rentals.${index}.BeginRental`}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <DatePicker
                        required
                        label="Date fin rental"
                        value={dayjs(values.rentals[index].EndRental)}
                        onChange={handleChange}
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
