describe('customer portal auth microservice', () => {
  const baseUrl = "http://localhost:3000/login";
  it('passes', () => {
    cy.viewport(1440, 900);

    // go to landing page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000);
    // cy.get('input[name="first_name"]').clear().type("Hesham");
    // cy.get('input[name="last_name"]').clear().type("Reza");
    // cy.get('input[name="business_name"]').clear().type("hesham.reza");
    // cy.get('input[name="address"]').clear().type("Kolkata");

    // cy.wait(5000); // wait for 5 seconds
    // cy.get('[cypress-name="address-dropdown"] p').first().click();

    // cy.get('input[name="email"]').clear().type("mtreza1234yopmail9@yopmail.com");
    // cy.get('input[name="phone_no"]').clear().type("919323473595");
    // cy.get('input[name="password"]').clear().type("mtreza1234yopmail9@123");
    // cy.get('input[name="c_password"]').clear().type("mtreza1234yopmail9@123");

    // cy.get('input[type="checkbox"]').click();

    // cy.wait(2000);

    // cy.get('button[data-testid="log-in"]').click();

    // cy.wait(2000);

    // cy.url().should('include', 'otp?mode=signup');

    // cy.wait(1000 * 60); // wait for 60 seconds
    // cy.get('button[data-testid="submit"]').should('be.visible').click();

    // cy.wait(5000);

    // cy.url().should('include', 'dashboard');

    // cy.wait(5000);

    // // //go to login page
    // // cy.url().should('include', 'login'); // check if url contains "login"

    // // cy.get('input[name="email"]').type('mtreza591@yopmail.com'); // where input name is "email" type the value
    // // cy.get('input[name="password"]').type('mtreza591@123'); // where input name is "password" type the value
    // // cy.get('button[type="submit"]').click(); // click on button where button type is submit

    // // you are on dashboard

    // // go to settings
    // cy.wait(5000); // wait for 5 seconds
    // cy.get('a[cypress-name="Settings"]').click(); // click on a tag where cypress-name is "Settings" --- sidebar button, will take you to Settings page

    // // click on add user type button
    // cy.get('button[cypress-name="add-user-type"]').click(); // on settings page, button to open add new user type module

    // // enter data
    // cy.get('input[name="user_type"]').type('Admin'); // user type input
    // cy.get('label[cypress-name="Profile"').click();  // toggle to active "Profile"
    // cy.get('label[cypress-name="My Staff"').click();  // toggle to active "My Staff"
    // cy.get('label[cypress-name="Domain"').click();  // toggle to active "Settings"
    // cy.get('label[cypress-name="Payment Subscription"').click();  // toggle to active "Settings"
    // cy.get('label[cypress-name="Email"').click();  // toggle to active "Settings"
    // cy.get('label[cypress-name="Payment Method"').click();  // toggle to active "Settings"
    // cy.get('label[cypress-name="Vouhcers"').click();  // toggle to active "Settings"
    // cy.get('label[cypress-name="Billing History"').click();  // toggle to active "Settings"

    // // save data
    // cy.get('button[type="submit"]').click(); // button to click and save the new user type

    // // editing user type Admin
    // // cy.get('tr')
    // //   .contains('td', 'Admin') // find the row where user_type is "Admin"
    // //   .parent() // the row where user_type is "Admin"
    // //   .find('button[cypress-name="edit-button"]') // find the edit button in the row
    // //   .first() // select the first button
    // //   .click(); // click to open the edit modal

    // // cy.get('button[type="submit"]').click();

    // // wait for 2 seconds
    // cy.wait(2000);

    // // go to my staff page
    // cy.get('a[cypress-name="My Staff"]').click(); // click on a tag where cypress-name is "Settings" --- sidebar button, will take you to Settings page

    // // click on add staff button to open the form modal
    // cy.get('button[cypress-name="add-staff"]').click();
    // cy.get('input[name="first_name"]').type('First_name'); // enter the first name
    // cy.get('input[name="last_name"]').type('Last_name'); // enter the last name
    // cy.get('input[name="email"]').type('emailoftheuserstaff9@yopmail.com'); // enter the email
    // cy.get('input[name="phone_no"]').clear().type('919893478378'); // enter the phone number
    // cy.get('select[name="user_type_id"]').select('Admin'); // Select "Admin" by visible text

    // // save the staff
    // cy.get('button[type="submit"]').click();

    // cy.wait(5000);

    // // cy.get('tr')
    // //   .contains('td', 'Admin') // find the row where user_type is "Admin"
    // //   .parent() // the row where user_type is "Admin"
    // //   .find('button[cypress-name="edit-button"]') // find the edit button in the row
    // //   .first() // select the first button
    // //   .click(); // click to open the edit modal

    // // cy.get('input[name="first_name"]').clear().type('FirstName'); // enter the first name
    // // cy.get('input[name="last_name"]').clear().type('LastName'); // enter the last name

    // // // save the edited staff
    // // cy.get('button[type="submit"]').click();

    // // cy.wait(2000);

    // // log out from the protal
    // cy.get('button[cypress-name="log-out-button"]').click(); // open log out modal
    // cy.get('button[cypress-name="log-out-customer-portal"]').click(); // click on the log out button

    // // now to login as the staff
    // cy.get('button[cypress-name="login-button"]').last().click(); // click on the login button

    // //go to login page
    // cy.url().should('include', 'login'); // check if url contains "login"

    cy.get('input[name="email"]').type('emailoftheuserstaff9@yopmail.com'); // where input name is "email" type the value
    cy.get('input[name="password"]').type('emailoftheuserstaff9@123'); // where input name is "password" type the value
    cy.get('button[type="submit"]').click(); // click on button where button type is submit

    cy.wait(2000);
    
    cy.url().should('include', 'otp?mode=signin');

    cy.wait(1000 * 60); // wait for 60 seconds
    cy.get('button[data-testid="submit"]').should('be.visible').click();

    cy.wait(5000);

    cy.url().should('include', 'dashboard');

    // you are on dashboard
    cy.wait(5000);

    cy.get('button[cypress-name="add-subscription-button"]').click(); // click on the add subscription button -- will only show if there is no subscription taken, for the first time only
    cy.url().should('include', 'choose-your-plan'); // check if url contains "choose-your-plan"

    cy.wait(5000);
    cy.get('button').contains('Start Trial').first().click();

    cy.url().should('include', 'subscribe-plan'); // check if url contains "subscribe-plan"

    cy.wait(5000);
    cy.get('input[name="business_name"]').clear().type('first.last.business.name'); // enter the business name
    cy.get('button[cypress-name="increase-license-usage"]').should('be.visible').then(($btn) => {
      Cypress._.times(4, () => {
        cy.wrap($btn).click();
      })
    }); // increase the user license amount to 5

    cy.get('button[cypress-name="subscribe-step-1-button"]').click(); // go to step 2

    cy.wait(2000); // wait for 2 seconds
    cy.get('input[name="first_name"]').clear().type('Hesham'); // enter the first name
    cy.get('input[name="last_name"]').clear().type('Reza'); // enter the last name
    cy.get('input[name="phone_no"]').clear().type('919434386362'); // enter the phone number

    cy.get('button[type="submit"]').click(); // click to submit and update the details

    cy.url().should('include', 'business-information'); // check if url contains "business-information"

    cy.wait(5000); // wait for 5 seconds
    cy.get('input[name="business_name"]').clear().type('first.last.business.name'); // enter the business name
    cy.get('input[name="address"]').clear().type('Kolkata'); // enter the address name

    cy.wait(5000); // wait for 5 seconds

    cy.get('[cypress-name="address-dropdown"] p').first().click(); // select the first option from the address list

    cy.wait(1000);
    cy.get('button[type="submit"]').click(); 

    cy.url().should('include', 'choose-your-domain'); // check if url contains "choose-your-domain"
    cy.get('input[cypress-name="new-domain-name-field"]').type('finding-a-new-domain-dot-com.com');

    cy.wait(2000); // wait 2 seconds
    cy.get('button[cypress-name="finding-new-domain-button"]').click();

    cy.url().should('include', 'choose-from-list'); // check if url contains "choose-from-list"

    cy.wait(5000); // wait 5 seconds
    cy.get('tbody tr')
      .first() // select the first "tr"
      .find('svg[cypress-name="domain-selector-button"]') // find the edit button in the row
      .first() // select the first button
      .click(); // click to open the edit modal

    cy.url().should('include', 'selected-domain-details'); // check if url contains "selected-domain-details"
    cy.wait(2000); // wait 2 seconds

    cy.get('button[cypress-name="continue-with-selected-domain"]').click();

    cy.url().should('include', 'how-you-will-sign-in-to-domain'); // check if url contains "how-you-will-sign-in-to-domain"
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[id="username"]').clear().type("hesham.reza");
    cy.get('input[id="password"]').clear().type("hesham.reza@123");
    cy.wait(1000 * 60); // wait for 60 seconds

    cy.get('button[type="submit"]').click();

    cy.url().should('include', 'free-trial-page'); // check if url contains "free-trial-page"

    cy.wait(1000); // wait 1 second

    cy.get('button[cypress-name="trial-summary-button"]').click();

    cy.url().should('include', 'gemini-summary'); // check if url contains "gemini-summary"

    cy.wait(1000); // wait 1 second
    cy.get('button[cypress-name="gemini-skip-button"]').click();

    cy.url().should('include', 'add-cart'); // check if url contains "add-cart"

    cy.wait(5000); // wait for 5 seconds

    cy.get('button[cypress-name="go-to-cart-button"]').click();
    cy.wait(5000); // wait 5 seconds

    cy.get('button[cypress-name="cart-submit-purchase"]').click();

    cy.url().should('include', 'review-and-check-out'); // check if url contains "review-and-check-out"
    cy.wait(5000);

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