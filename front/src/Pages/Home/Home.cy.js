import React from 'react'
import Home from './Home'

describe('<Home />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
    })
    it('renders', () => {
        cy.mount(<Home />)
    })
})
