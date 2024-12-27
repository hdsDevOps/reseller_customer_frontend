import SuccessPage from '../../src/pages/SuccessPassword';
import React from 'react';

describe('Test the complete functionality', () => {
  it('check everything is working', () => {
    cy.mount(<SuccessPage />)
  })
})