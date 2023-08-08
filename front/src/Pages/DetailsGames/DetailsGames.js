import { useEffect, useRef, useState } from 'react'
import Form from './Form/FormGame.js'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { getGame } from '../../api.js'
import { useParams, useNavigate } from 'react-router-dom'

function DetailsGames() {
    const submitRef = useRef()
    const navigate = useNavigate()

    const id = useParams().id

    const [game, setGame] = useState({})

    if (id) {
        useEffect(() => {
            getGame(id).then((data) => {
                if (data) {
                    setGame(data)
                }
            })
        }, [])
    }

    function handleSave() {
        submitRef.current.click()
        navigate(`/ListGames`)
    }

    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <Stack spacing={2}>
                        <Button variant="contained" type="submit" onClick={() => handleSave}>
                            Enregistrer
                        </Button>
                        <Button variant="outlined" onClick={() => navigate(`/ListGames`)}>
                            Retour
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Form submitRef={submitRef} game={game} />
                </Grid>
            </Grid>
        </div>
    )
}

export default DetailsGames
