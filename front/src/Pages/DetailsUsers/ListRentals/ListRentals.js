import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import ReturnGameModal from '../ReturnGameModal/ReturnGameModal'
import { getRentals } from '../../../api'

function ListRentals({ idUser }) {
    const [rentals, setRentals] = useState([])
    const [selectedRental, setSelectedRental] = useState(null)

    const handleCloseModal = () => {
        setSelectedRental(null)
    }

    const handleReturnClick = (rental) => {
        setSelectedRental(rental)
    }

    useEffect(() => {
        if (!idUser) {
            return
        }
        getRentals(idUser).then((data) => {
            if (data) {
                setRentals(data)
            }
        })
    }, [idUser, selectedRental])

    const columns = [
        {
            field: 'BeginRental',
            headerName: 'Date de début',
            width: 150,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY')
        },
        {
            field: 'EndRental',
            headerName: 'Date de fin',
            width: 150,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY')
        },
        {
            field: 'Return',
            headerName: 'Date de rendu',
            width: 150,
            valueFormatter: (params) =>
                params.value === null ? 'Non Retourné' : dayjs(params.value).format('DD/MM/YY')
        },
        {
            field: 'Name',
            headerName: 'Nom du jeu',
            width: 200,
            valueGetter: (params) => params.row.Game.Name
        },
        { field: 'Comment', headerName: 'Commentaire', width: 250 },
        {
            field: 'ReturnButton',
            headerName: 'Retour',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant={params.row.Return === null ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => handleReturnClick(params.row)}>
                    {params.row.Return === null ? 'Retour' : 'Modifier retour'}
                </Button>
            )
        }
    ]

    return (
        <div style={{ height: 400, width: '100%' }}>
            {rentals.length > 0 ? (
                <>
                    <DataGrid
                        rows={rentals}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                    />
                    <ReturnGameModal rental={selectedRental} onClose={handleCloseModal} />
                </>
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
