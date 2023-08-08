import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'

function AddOptionPopup({ open, onClose, onAddOption }) {
    const [newOptionValue, setNewOptionValue] = useState('')

    const handleAddOption = () => {
        if (newOptionValue.trim() !== '') {
            onAddOption(newOptionValue)
            setNewOptionValue('')
            onClose()
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ajouter une nouvelle option</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Nouvelle option"
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="primary">
                    Annuler
                </Button>
                <Button onClick={handleAddOption} variant="contained" color="primary">
                    Ajouter
                </Button>
            </DialogActions>
        </Dialog>
    )
}

AddOptionPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired
}

export default AddOptionPopup
