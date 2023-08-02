import { useRef, useEffect, useState } from 'react'
import FormUsers from './Form/FormUsers.js'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { getUser } from '../../api.js'
import { useParams, useNavigate } from 'react-router-dom'
import ListRentals from './ListRentals/ListRentals.js'

function DetailsUsers() {
    const submitRef = useRef()
    const navigate = useNavigate()

    const id = useParams().id

    const [user, setUser] = useState({})

    if (id) {
        useEffect(() => {
            getUser(id).then((data) => {
                if (data) {
                    setUser(data)
                }
            })
        }, [])
    }

    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <Stack spacing={2}>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => submitRef.current.click()}>
                            Enregistrer
                        </Button>
                        {id && (
                            <Button variant="contained" onClick={() => navigate(`/rental/${id}`)}>
                                Nouvelle location
                            </Button>
                        )}
                        <Button variant="outlined" onClick={() => navigate(`/ListUsers`)}>
                            Retour
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Stack spacing={2}>
                        <FormUsers submitRef={submitRef} user={user} />
                        <ListRentals idUser={id} />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default DetailsUsers
