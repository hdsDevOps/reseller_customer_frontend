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

    cy.get('a[cypress-name="Payment Method"]').click();

    cy.wait(5000);

    cy.get('input[type="checkbox"]').each(($el) => {
      if(!$el.is(':checked')) {
        cy.wrap($el).check();
        return false;
      }
    })
  })
})