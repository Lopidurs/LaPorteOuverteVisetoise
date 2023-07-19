/* eslint-disable no-undef */
import React from 'react'
import DetailsGames from './DetailsGames'

describe('<DetailsGames />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('GET', '/API/*')

        cy.intercept('POST', '/API/*', {
            statusCode: 200
        })
    })

    it('renders', () => {
        cy.mount(<DetailsGames />)
    })

    it('should call submit function if the form is correctly filled out', () => {
        // Render the component

        cy.mount(<DetailsGames />)

        // Fill out the form
        cy.get('input[name=Age]').type('8')
        cy.get('input[name=MinPlayer]').type('2')
        cy.get('input[name=Name]').type('Monopoly')
        cy.get('input[name=MaxPlayer]').type('8')
        cy.get('input[name=Release]').type('1935')
        cy.get('input[name=Brand]').type('Hasbro')

        cy.get('.MuiStack-root > .MuiButtonBase-root').click()
        cy.get('body').should('not.contain', 'Requis')
    })

    it('should display an error message if the form is not correctly filled out', () => {
        // Render the component
        cy.mount(<DetailsGames />)

        // Fill out the form
        cy.get('input[name=Age]').type('8')
        cy.get('input[name=MinPlayer]').type('2')
        cy.get('input[name=MaxPlayer]').type('8')
        cy.get('input[name=Release]').type('1935')
        cy.get('input[name=Brand]').type('Hasbro')

        cy.get('.MuiStack-root > .MuiButtonBase-root').click()
        cy.get('body').should('contain', 'Requis')
    })
})
