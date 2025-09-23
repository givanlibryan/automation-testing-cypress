import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as common from '../../common/commonAction.js';
import infoPage from './pom/informationPage.js';
import overviewPage from './pom/overviewPage.js';
import finishPage from './pom/finishPage.js';

Given('the user completed checkout to the Finish page', () => {
  common.visitSauce();
  common.login('STANDARD');

  ['Sauce Labs Backpack', 'Sauce Labs Bike Light']
    .forEach(n => common.addProductByName(n));

  common.openCart();
  cy.get('[data-test="checkout"]').click();

  infoPage.first().clear().type('John');
  infoPage.last().clear().type('Doe');
  infoPage.zip().clear().type('90210');
  infoPage.continue().click();

  overviewPage.finish().click();
  cy.get('[data-test="title"]').should('have.text', 'Checkout: Complete!');
});

Then('a thank you message should be shown', () => {
  finishPage.header().should('contain.text','Thank you for your order!');
  finishPage.text().should('contain.text','Your order has been dispatched');
});

Then('a Back Home button should be visible', () => {
  finishPage.backHome().should('be.visible');
});

When('the user clicks Back Home', () => finishPage.backHome().click());

Then('the Thank You message should be visible', () => {
  cy.get('[data-test="complete-header"]')
    .should('have.text', 'Thank you for your order!');
});

When('the user returns to Products', () => {
  cy.get('[data-test="back-to-products"]').click();
});



