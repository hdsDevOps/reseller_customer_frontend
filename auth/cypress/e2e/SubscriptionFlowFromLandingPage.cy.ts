describe('customer portal auth microservice', () => {
  const baseUrl = "http://localhost:3000";
  it('passes', () => {
    cy.viewport(1440, 900);

    // go to landing page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // find the first start trial button
    cy.get('button[cypress-name="start-trial-button"]').first().click();

    cy.url().should('include', 'subscribe'); // the url should include "subscribe"

    cy.wait(5000); // wait for 5 seconds

    cy.get('input[id="business_name"]').type('hesham.reza');
    cy.get('button[cypress-name="increase-license-usage"]').should('be.visible').then(($btn) => {
      Cypress._.times(5, () => {
        cy.wrap($btn).click();
      })
    }); // increase the user license amount to 6
    cy.get('button[cypress-name="decrease-license-usage"]').should('be.visible').click(); // decrease the user license amount to 5

    cy.get('button[cypress-name="go-to-step-2"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds
    cy.get('input[name="first_name"]').type("Hesham");
    cy.get('input[name="last_name"]').type("Reza");
    cy.get('input[name="email"]').type("mtreza1234yopmail10@yopmail.com");
    cy.get('input[name="phone_no"]').clear().type("917823235432");

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(3000); // wait for 3 seconds
    
    cy.url().should('include', 'subscribeotp'); // the url should include "subscribeotp"

    cy.wait(1000 * 60); // wait for 5 seconds

    cy.get('button[type="submit"]').should('be.visible').click();
    
    cy.get('button[cypress-name="subscribe-opt-success-modal-button"]').should('be.visible').click();

    cy.url().should('include', 'businessinfo'); // the url should include "businessinfo"

    cy.wait(3000); // wait for 3 seconds

    cy.get('input[name="business_name"]').clear().type('hesham.reza');
    cy.get('input[name="address"]').clear().type('Kolkata, West Bengal, India');

    cy.wait(5000); // wait for 5 seconds

    cy.get('[cypress-name="address-dropdown"] p').first().click();

    cy.wait(1000); // wait for 1 second

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', 'adddomain'); // the url should include "adddomain"

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="new-domain-input-field"]').clear().type('find-a-domain-name.com');
    cy.get('button[cypress-name="new-domain-search-button"]').should('be.visible').click();

    cy.url().should('include', 'domainlist'); // the url should include "domainlist"

    cy.wait(5000); // wait 5 seconds
    cy.get('tbody tr')
      .first() // select the first "tr"
      .find('svg[cypress-name="domain-selector-button"]') // find the edit button in the row
      .first() // select the first button
      .click(); // click to open the edit modal

    cy.url().should('include', 'selected-domain'); // the url should include "selected-domain"

    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="go-to-make-domain-user-pass"]').should('be.visible').click();

    cy.url().should('include', 'signin-domain'); // the url should include "signin-domain"

    cy.wait(2000); // wait 2 seconds

    cy.get('input[id="username"]').clear().type('hesham.reza');
    cy.get('input[id="password"]').clear().type('hesham.reza@123');

    cy.wait(1000 * 60);

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', 'free-trial'); // the url should include "free-trial"

    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="start-free-trial-button"]').should('be.visible').click();

    cy.url().should('include', 'gemini-add'); // the url should include "gemini-add"

    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="go-to-summary-button"]').should('be.visible').click();

    cy.url().should('include', 'summary'); // the url should include "summary"

    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="submit-purchase-button"]').should('be.visible').click();

    cy.url().should('include', 'Review'); // the url should include "Review"

    cy.wait(2000); // wait 2 seconds

    cy.get('input[name="business_state"]').clear().type('West Bengal'); // enter the business state name

    cy.wait(5000); // wait for 5 seconds

    cy.get('[cypress-name="business-state-dropdown"] p').should('be.visible').first().click(); // select the first option from the business state dropdown

    cy.get('input[name="business_city"]').clear().type('Kolkata'); // enter the business city name

    cy.wait(5000); // wait for 5 seconds

    cy.get('[cypress-name="business-city-dropdown"] p').should('be.visible').first().click(); // select the first option from the business city dropdown

    cy.wait(2000); // wait for 2 seconds

    cy.get('label').contains(/^stripe$/i).click();

    cy.wait(2000);

    cy.get('button[cypress-name="stripe-checkout-button"]').click();
  })
})