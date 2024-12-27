import RegisterPage from '../../src/pages/NewRegister';
import React from 'react';

describe('Test the complete functionality', () => {
  it('check everything is working', () => {
    cy.mount(<RegisterPage />)
  })
})