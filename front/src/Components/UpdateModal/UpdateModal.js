/* eslint-disable react/prop-types */
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import { updateGame, updateUser } from '../../api'
export default function UpdateModal({ open, setOpen, data, type }) {
    function handleClose() {
        setOpen(false)
    }

    function handleSave() {
        type === 'game' ? updateGame(data) : updateUser(data)
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
                <Button variant="contained" color="success" mr={1} onClick={handleSave}>
                    Oui
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                    Non
                </Button>
            </DialogActions>
        </Dialog>
    )
}
