/* eslint-disable no-undef */
import React from 'react'
import DetailsUsers from './DetailsUsers'

describe('<DetailsUsers />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.intercept('GET', '/API/*')

        cy.intercept('POST', '/API/*', {
            statusCode: 200
        })
    })

    it('renders', () => {
        cy.mount(<DetailsUsers />)
    })

    it('should not throw an error if the form is correctly filled out', () => {
        cy.mount(<DetailsUsers />)

        cy.get('input[name=Email]').type('victor.hugot@hotmail.fr')
        cy.get('input[name=FirstName]').type('Victor')
        cy.get('input[name=LastName]').type('Hugo')
        cy.get('input[name=PhoneNumber]').type('+32 456 78 90 12')
        cy.get('input[name=Address]').type('Rue de la paix, 1')
        cy.get('input[name=City]').type('Bruxelles')
        cy.get('input[name=ZipCode]').type('1000')

        cy.get('.MuiStack-root > .MuiButtonBase-root').click()
        cy.get('body').should('not.contain', 'Requis')
    })

    it('should display an error message if the form is not correctly filled out', () => {
        cy.mount(<DetailsUsers />)

        cy.get('input[name=Email]').type('victor.hugot@hotmail.fr')
        cy.get('input[name=FirstName]').type('Victor')

        cy.get('.MuiStack-root > .MuiButtonBase-root').click()
        cy.get('body').should('contain', 'Requis')
    })

    it('should display an error message if the phone number is not correctly filled out', () => {
        cy.mount(<DetailsUsers />)

        cy.get('input[name=Email]').type('victor.hugot@hotmail.fr')
        cy.get('input[name=FirstName]').type('Victor')
        cy.get('input[name=LastName]').type('Hugo')
        cy.get('input[name=PhoneNumber]').type('+32 556 78 90 12 12 12')
        cy.get('input[name=Address]').type('Rue de la paix, 1')
        cy.get('input[name=City]').type('Bruxelles')
        cy.get('input[name=ZipCode]').type('1000')

        cy.get('.MuiStack-root > .MuiButtonBase-root').click()
        cy.get('body').should('contain', 'Numéro de téléphone invalide')
    })
})
