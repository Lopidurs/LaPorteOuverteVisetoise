import React, { useMemo } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material'
import { postNewRental } from '../../../api'
import PropTypes from 'prop-types'

const ValidationModal = ({ values, open, setOpen, id }) => {
    const falseValue = useMemo(() => values.filter((rental) => rental.Name === ''), [open])
    const notAvailable = useMemo(
        () => values.filter((rental) => rental.Name !== '' && rental.Status !== 'Disponible'),
        [open]
    )
    const hasCommonIds = useMemo(() => hasCommonId(values), [open])

    function hasCommonId(values) {
        const ids = new Set()
        for (const value of values) {
            if (ids.has(value.id)) {
                return true
            }
            ids.add(value.id)
        }
        return false
    }

    function handleClose() {
        setOpen(false)
    }

    const handleSave = () => {
        postNewRental(values, id)
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enregistrer les jeux</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Êtes-vous sûr de vouloir enregistrer ces {values.length} jeux ?
                </DialogContentText>
                {falseValue.length > 0 && (
                    <DialogContentText color="error">
                        {falseValue.length} jeux ont des id incorect
                    </DialogContentText>
                )}
                {notAvailable.length > 0 && (
                    <DialogContentText color="error">
                        Les jeux suivants ne sont pas disponible:{' '}
                        {notAvailable.map((game) => game.Name + ', ')}
                    </DialogContentText>
                )}
                {hasCommonIds && (
                    <DialogContentText color="error">Des jeux ont le même id</DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annuler
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    disabled={falseValue.length !== 0 || notAvailable.length !== 0 || hasCommonIds}>
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    )
}
ValidationModal.propTypes = {
    values: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}

export default ValidationModal
