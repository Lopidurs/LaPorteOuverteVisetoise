import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import ListGames from './ListGames'

describe('ListGames', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve([
                        {
                            id: 1,
                            Name: 'Jeu 1',
                            Brand: 'Marque 1',
                            Types: [{ Name: 'Type 1' }, { Name: 'Type 2' }],
                            Age: 5,
                            MinPlayer: 1,
                            MaxPlayer: 4,
                            KeyWords: [{ Name: 'Mot clé 1' }, { Name: 'Mot clé 2' }],
                            Release: 2021,
                            Awards: [],
                            Status: 'Disponible'
                        }
                    ])
            })
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render ListGames tab', async () => {
        await act(async () => {
            render(<ListGames />)
        })

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('Jeu 1')).toBeInTheDocument()
        expect(screen.getByText('Marque 1')).toBeInTheDocument()
    })
})
