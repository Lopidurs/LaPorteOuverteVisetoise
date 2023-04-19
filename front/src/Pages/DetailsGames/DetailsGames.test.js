import React from 'react'
import { waitFor, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import DetailsGames from './DetailsGames'
import { getAwards, getTypes, getKeywords, postNewGame } from '../../api'

jest.mock('../../api', () => ({
    getAwards: jest.fn(),
    getKeywords: jest.fn(),
    getTypes: jest.fn(),
    postNewGame: jest.fn()
}))

describe('DetailsGames', () => {
    beforeEach(() => {
        // jest.clearAllMocks()
        getAwards.mockResolvedValue([
            { id: 1, Name: 'Award 1' },
            { id: 2, Name: 'Award 2' }
        ])
        getKeywords.mockResolvedValue([
            { id: 1, Name: 'Keyword 1' },
            { id: 2, Name: 'Keyword 2' }
        ])
        getTypes.mockResolvedValue([
            { id: 1, Name: 'Type 1' },
            { id: 2, Name: 'Type 2' }
        ])
    })

    it('should render the form', async () => {
        render(<DetailsGames />)

        await waitFor(() => {
            expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Age minimum/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/J min/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/J max/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Année de parution/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Marque/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Types/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Mots clés/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Prix/i)).toBeInTheDocument()
        })
    })

    it('should call submit function if the form is correctly filled out', async () => {
        render(<DetailsGames />)

        userEvent.type(screen.getByLabelText(/Nom/i), 'Monopoly')
        userEvent.type(screen.getByLabelText(/Age minimum/i), '8')
        userEvent.type(screen.getByLabelText(/J min/i), '2')
        userEvent.type(screen.getByLabelText(/J max/i), '8')
        userEvent.type(screen.getByLabelText(/Année de parution/i), '1935')
        userEvent.type(screen.getByLabelText(/Marque/i), 'Hasbro')

        userEvent.click(screen.getByRole('button', { name: /Enregistrer/i }))

        await waitFor(() => expect(postNewGame).toHaveBeenCalled())
    })

    it('should not call submit function if the form is empty', async () => {
        render(<DetailsGames />)

        userEvent.click(screen.getByRole('button', { name: /Enregistrer/i }))
        waitFor(() => {
            expect(postNewGame).not.toHaveBeenCalled()
        })
    })

    it('should not call submit function if the form is not correctly filled out', async () => {
        render(<DetailsGames />)

        userEvent.type(screen.getByLabelText(/Age minimum/i), '8')
        userEvent.type(screen.getByLabelText(/J min/i), '2')
        userEvent.type(screen.getByLabelText(/J max/i), '8')
        userEvent.type(screen.getByLabelText(/Année de parution/i), '1935')
        userEvent.type(screen.getByLabelText(/Marque/i), 'Hasbro')

        userEvent.click(screen.getByRole('button', { name: /Enregistrer/i }))

        await waitFor(() => {
            expect(postNewGame).not.toHaveBeenCalled()
            expect(screen.getByText(/Requis/i)).toBeInTheDocument()
        })
    })
})
