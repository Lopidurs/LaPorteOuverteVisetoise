import { useRef } from 'react'
import Form from './Form/FormUsers.js'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function DetailsUsers() {
    const submitRef = useRef()
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
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Form submitRef={submitRef} />
                </Grid>
            </Grid>
        </div>
    )
}

export default DetailsUsers
