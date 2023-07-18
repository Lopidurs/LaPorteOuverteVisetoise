import './ListUsers.css'
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { StyledEngineProvider } from '@mui/material/styles'

import { getUsers } from '../../api.js'

const columns = [
    { field: 'id', headerName: 'ID', width: 69 },
    { field: 'LastName', headerName: 'Nom', width: 200 },
    { field: 'FirstName', headerName: 'Prénom', width: 200 },
    { field: 'Email', headerName: 'Email', width: 200 },
    { field: 'PhoneNumber', headerName: 'Téléphone', width: 200 },
    { field: 'ZipCode', headerName: 'Code postal', width: 200 },
    { field: 'City', headerName: 'Ville', width: 200 },
    { field: 'Street', headerName: 'Rue', width: 200 }
]

function ListUsers() {
    const [ListUsers, setListUsers] = useState([])

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
            Street: user.Street
        }
    })

    return (
        <div className="container">
            <StyledEngineProvider injectFirst>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={1} rowsPerPageOptions={[5]} />
                </div>
            </StyledEngineProvider>
        </div>
    )
}

export default ListUsers
