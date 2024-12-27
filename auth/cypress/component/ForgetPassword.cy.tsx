import ForgotPassword from '../../src/pages/ForgotPassword';
import React from 'react';

describe('Test the complete functionality', () => {
  it('check everything is working', () => {
    cy.mount(<ForgotPassword />)
  })
})