import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material'
import { updateRental } from '../../../api'

function ReturnGameModal({ rental, onClose }) {
    const [comment, setComment] = useState('')

    useEffect(() => {
        setComment(rental?.Comment ?? '')
    }, [rental])

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleConfirmReturn = () => {
        if (rental?.Return) {
            const updatedRental = {
                ...rental,
                Return: null,
                Comment: null
            }
            updateRental(updatedRental)
        } else {
            const updatedRental = {
                ...rental,
                Return: new Date(),
                Comment: comment
            }
            updateRental(updatedRental)
        }
        onClose()
    }

    const handleCancelReturn = () => {
        if (rental?.Return) {
            const updatedRental = {
                ...rental,
                Return: null,
                Comment: null
            }
            updateRental(updatedRental)
        }
        onClose()
    }

    return (
        <Dialog open={Boolean(rental)} onClose={onClose}>
            <DialogTitle>Détails du prêt</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Nom du jeu : {rental?.Game.Name}
                    <br />
                    Date de début : {rental?.BeginRental}
                    <br />
                    Date de fin prévue : {rental?.EndRental}
                </DialogContentText>
                <TextField
                    label="Commentaire (facultatif)"
                    multiline
                    rows={3}
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelReturn} variant="outlined" color="error">
                    {rental?.Return ? 'Annuler le retour' : 'Annuler'}
                </Button>
                <Button onClick={handleConfirmReturn} variant="contained" color="success">
                    {rental?.Return ? 'Modifier le retour' : 'Confirmer le Retour'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ReturnGameModal.propTypes = {
    rental: PropTypes.object,
    onClose: PropTypes.func.isRequired
}

export default ReturnGameModal
