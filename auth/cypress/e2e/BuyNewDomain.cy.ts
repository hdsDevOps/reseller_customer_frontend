describe('customer portal auth microservice', () => {
  const baseUrl = "http://localhost:3000/dashboard";
  it('passes', () => {
    cy.viewport(1440, 900);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImgzM1lnM3JMWWhhMzRBV25uRG5TRll2SmZpcjEiLCJlbWFpbCI6Im10cmV6YXlvcG1haWw0QHlvcG1haWwuY29tIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzM5MzYzMDEwLCJleHAiOjE3Mzk0NDk0MTB9.CuafQEX75073fBmFG-E4maBEViEUtkQ92AcWkFj5pSQ');
      win.localStorage.setItem('LS_KEY_USER_ID', 'h33Yg3rLYha34AWnnDnSFYvJfir1');
      win.localStorage.setItem('LS_KEY_STAFF_ID', '');
      win.localStorage.setItem('LS_KEY_STAFF_STATUS', 'false');
    });

    // go to dashboard page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    cy.get('a[cypress-name="Domain"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="buy-new-domain-button"]').should('be.visible').click();

    cy.url().should('include', 'buy-domain'); // the url should include "buy-domain"

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="domain"]').clear().type('find-another-new-domain-name.com');
    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', 'choose-domain'); // the url should include "choose-domain"

    cy.wait(2000); // wait for 2 seconds

    cy.get('tbody tr')
      .first() // select the first "tr"
      .find('td[cypress-name="domain-selector-button"]') // find the edit button in the row
      .first() // select the first button
      .click(); // click to open the edit modal

    cy.url().should('include', 'domain-details'); // the url should include "domain-details"

    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="go-to-make-domain-user-pass"]').should('be.visible').click();

    cy.url().should('include', 'add-cart'); // the url should include "add-cart"

    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="go-to-cart-button"]').click();
    cy.wait(5000); // wait 5 seconds

    cy.get('button[cypress-name="cart-submit-purchase"]').click();

    cy.url().should('include', 'review-and-check-out'); // check if url contains "review-and-check-out"
    cy.wait(5000);

    cy.get('label').contains(/^stripe$/i).click();

    cy.wait(2000);

    cy.get('button[cypress-name="stripe-checkout-button"]').click();
  })
})