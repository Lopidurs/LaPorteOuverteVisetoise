import React from 'react'
import ListUsers from './ListUsers'

describe('<ListUsers />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
    })
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<ListUsers />)
    })
})
