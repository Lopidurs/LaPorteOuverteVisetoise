/* eslint-disable no-undef */
import React from 'react'
import ListGames from './ListGames'

describe('<ListGames />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('GET', '/API/games', {
            body: [
                {
                    id: 1,
                    Name: 'Loup Garou',
                    Brand: 'Asmodee',
                    Age: 8,
                    MinPlayer: 8,
                    MaxPlayer: 18,
                    Release: null,
                    Status: 'Disponnible',
                    Description: null,
                    isActive: true,
                    createdAt: '2023-03-06T19:30:16.000Z',
                    updatedAt: '2023-03-06T19:30:16.000Z',
                    Types: [
                        {
                            Name: 'Ambiance'
                        },
                        {
                            Name: 'Ambiance'
                        }
                    ],
                    KeyWords: [],
                    Awards: []
                },
                {
                    id: 2,
                    Name: 'Loup Garou',
                    Brand: 'Asmodee',
                    Age: 8,
                    MinPlayer: 8,
                    MaxPlayer: 18,
                    Release: null,
                    Status: 'Disponnible',
                    Description: '',
                    isActive: true,
                    createdAt: '2023-03-06T19:47:14.000Z',
                    updatedAt: '2023-03-06T19:47:14.000Z',
                    Types: [],
                    KeyWords: [],
                    Awards: []
                },
                {
                    id: 3,
                    Name: 'Gemini',
                    Brand: 'Ludo',
                    Age: 3,
                    MinPlayer: 2,
                    MaxPlayer: 18,
                    Release: '2001-01-30T23:00:00.000Z',
                    Status: 'Disponnible',
                    Description: '',
                    isActive: true,
                    createdAt: '2023-03-06T22:29:44.000Z',
                    updatedAt: '2023-03-06T22:29:44.000Z',
                    Types: [],
                    KeyWords: [
                        {
                            Name: 'Action'
                        },
                        {
                            Name: 'Mystère'
                        }
                    ],
                    Awards: []
                }
            ]
        })

        cy.intercept('POST', '/API/*', {
            statusCode: 200
        }).as('submit')
    })

    it('renders', () => {
        cy.mount(<ListGames />)
    })

    it('should display the list of games', () => {
        cy.mount(<ListGames />)
        cy.get('body').should('contain', 'Loup Garou')
        cy.get('body').should('contain', 'Gemini')
    })
})
