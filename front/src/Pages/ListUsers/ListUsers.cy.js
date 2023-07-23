/* eslint-disable no-undef */
import React from 'react'
import ListUsers from './ListUsers'

describe('<ListUsers />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
    })
    it('renders', () => {
        cy.mount(<ListUsers />)
    })
})
