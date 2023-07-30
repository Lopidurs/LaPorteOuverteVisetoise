import './ListUsers.css'
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { StyledEngineProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

import { getUsers } from '../../api.js'

const columns = [
    { field: 'id', headerName: 'ID', width: 69 },
    { field: 'LastName', headerName: 'Nom', width: 200 },
    { field: 'FirstName', headerName: 'Prénom', width: 200 },
    { field: 'Email', headerName: 'Email', width: 200 },
    { field: 'PhoneNumber', headerName: 'Téléphone', width: 200 },
    { field: 'ZipCode', headerName: 'Code postal', width: 200 },
    { field: 'City', headerName: 'Ville', width: 200 },
    { field: 'Address', headerName: 'Adresse', width: 200 }
]

function ListUsers() {
    const [ListUsers, setListUsers] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getUsers().then((data) => {
            setListUsers(data)
        })
    }, [])

    const rows = ListUsers.map((user) => {
        return {
            id: user.id,
            LastName: user.LastName,
            FirstName: user.FirstName,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            ZipCode: user.ZipCode,
            City: user.City,
            Address: user.Address
        }
    })

    return (
        <div className="container">
            <Grid container justifyContent="right" my={2}>
                <Button variant="contained" onClick={() => navigate(`/DetailsUsers`)}>
                    Ajouter un utilisateur
                </Button>
            </Grid>
            <StyledEngineProvider injectFirst>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={1}
                        rowsPerPageOptions={[5]}
                        onRowDoubleClick={(event) => {
                            navigate(`/detailsUsers/${event.row.id}`)
                        }}
                    />
                </div>
            </StyledEngineProvider>
        </div>
    )
}

export default ListUsers
