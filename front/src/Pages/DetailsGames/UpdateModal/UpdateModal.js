/* eslint-disable react/prop-types */
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import { updateGame } from '../../../api'
export default function UpdateModal({ open, setOpen, game }) {
    function handleClose() {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <DialogTitle id="alert-dialog-title">
                Etes-vous sûr de vouloir enregistrer les modifications?
            </DialogTitle>
            <DialogActions>
                <Button variant="contained" color="success" mr={1} onClick={() => updateGame(game)}>
                    Oui
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                    Non
                </Button>
            </DialogActions>
        </Dialog>
    )
}
