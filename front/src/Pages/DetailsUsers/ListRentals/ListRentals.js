import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { getRentals } from '../../../api'

function ListRentals({ idUser }) {
    const [rentals, setRentals] = useState([])

    useEffect(() => {
        if (!idUser) {
            return
        }
        getRentals(idUser).then((data) => {
            if (data) {
                data.forEach((rental) => {
                    rental.Name = rental.Game.Name

                    rental.Return === null
                        ? (rental.Return = 'Non Retourné')
                        : (rental.Return = dayjs(rental.Return).format('DD/MM/YY'))
                    rental.BeginRental = dayjs(rental.BeginRental).format('DD/MM/YY')
                    rental.EndRental = dayjs(rental.EndRental).format('DD/MM/YY')
                })
                setRentals(data)
            }
        })
    }, [idUser])

    const columns = [
        { field: 'BeginRental', headerName: 'Date de début', width: 150 },
        { field: 'EndRental', headerName: 'Date de fin', width: 150 },
        { field: 'Return', headerName: 'Date de rendu', width: 150 },
        { field: 'Name', headerName: 'Nom du jeu', width: 200 },
        { field: 'Comment', headerName: 'Commentaire', width: 250 }
    ]

    return (
        <div style={{ height: 400, width: '100%' }}>
            {rentals.length > 0 ? (
                <DataGrid
                    rows={rentals}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                />
            ) : (
                <Typography variant="body1">Aucune location disponible pour ce client.</Typography>
            )}
        </div>
    )
}

ListRentals.propTypes = {
    idUser: PropTypes.string.isRequired
}

export default ListRentals
