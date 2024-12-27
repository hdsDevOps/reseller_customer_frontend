import Login from '../../src/pages/Login';
import React from 'react';

describe('Test the complete functionality', () => {
  it('check everything is working', () => {
    cy.mount(<Login />)
  })
})