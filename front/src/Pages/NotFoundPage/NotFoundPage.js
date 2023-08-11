import React from 'react'
import { Typography, Container } from '@mui/material'

const NotFoundPage = () => {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Typography variant="h1" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="textSecondary">
                Page not found
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{ marginTop: '1rem' }}>
                The page you are looking for might be unavailable or does not exist.
            </Typography>
        </Container>
    )
}

export default NotFoundPage
