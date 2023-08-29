import './ListGames.css'
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { StyledEngineProvider } from '@mui/material/styles'
import { getGames } from '../../api.js'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const columns = [
    { field: 'id', headerName: 'ID', width: 69 },
    { field: 'Name', headerName: 'Nom', width: 200 },
    { field: 'Brand', headerName: 'Marque', width: 130 },
    { field: 'Types', headerName: 'Types', width: 260 },
    { field: 'Age', headerName: 'Age', width: 68 },
    { field: 'MinPlayer', headerName: 'J min', width: 68 },
    { field: 'MaxPlayer', headerName: 'J max', width: 68 },
    { field: 'KeyWords', headerName: 'Mots clés', width: 260 },
    { field: 'Release', headerName: 'Année', width: 68 },
    { field: 'Awards', headerName: 'Prix', width: 210 },
    { field: 'Status', headerName: 'Status', width: 100 }
]

function ListGames() {
    const [ListGames, setListGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then((data) => {
            setListGames(data)
        })
    }, [])

    function formDate(date) {
        try {
            const dateArray = date.split('-')
            return dateArray[0]
        } catch {
            return ''
        }
    }
    const rows = ListGames.map((game) => {
        return {
            id: game.id,
            Name: game.Name,
            Brand: game.Brand,
            Types: game.Types.map((type) => {
                return type.Name
            }).join(', '),
            Age: game.Age + '+',
            MinPlayer: game.MinPlayer,
            MaxPlayer: game.MaxPlayer,
            KeyWords: game.KeyWords.map((keyWord) => {
                return keyWord.Name
            }).join(', '),
            Release: formDate(game.Release),
            Awards: game.Awards.map((award) => {
                return award.Name
            }).join(', '),
            Status: game.Status
        }
    })

    return (
        <div className="container">
            <Grid container justifyContent="right" my={2}>
                <Button variant="contained" onClick={() => navigate(`/DetailsGames`)}>
                    Ajouter un jeu
                </Button>
            </Grid>
            <StyledEngineProvider injectFirst>
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={1}
                        rowsPerPageOptions={[5]}
                        onRowDoubleClick={(event) => {
                            navigate(`/detailsGames/${event.row.id}`)
                        }}
                    />
                </div>
            </StyledEngineProvider>
        </div>
    )
}

export default ListGames
