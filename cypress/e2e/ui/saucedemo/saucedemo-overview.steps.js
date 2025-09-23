import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as common from '../../common/commonAction.js';
import infoPage from './pom/informationPage.js';
import overviewPage from './pom/overviewPage.js';

Given('the user is on the Overview page with items:', (table) => {
  const items = table.raw().flat();

  common.visitSauce();
  common.login('STANDARD');

  items.forEach(n => common.addProductByName(n));
  common.openCart();

  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="title"]').should('have.text', 'Checkout: Your Information');

  // Fill in info (clear first to avoid flakiness)
  infoPage.first().clear().type('John');
  infoPage.last().clear().type('Doe');
  infoPage.zip().clear().type('90210');
  infoPage.continue().click();

  cy.get('[data-test="title"]').should('have.text', 'Checkout: Overview');
});

Then('the Overview should list:', (table) => {
  const expected = table.raw().flat();
  overviewPage.itemNames().should('have.length', expected.length);
  overviewPage.itemNames().then($els => {
    const actual = [...$els].map(el => el.innerText.trim());
    expect(actual).to.deep.equal(expected);
  });
});

Then('the Subtotal, Tax and Total amounts should be visible', () => {
  overviewPage.subtotal().should('contain.text', 'Item total: $');
  overviewPage.tax().should('contain.text', 'Tax: $');
  overviewPage.total().should('contain.text', 'Total: $');
});

When('the user clicks Finish', () => overviewPage.finish().click());

When('the user clicks Cancel on the Overview page', () => overviewPage.cancel().click());

Then('the Finish page should be displayed', () => {
  cy.get('[data-test="title"]').should('have.text', 'Checkout: Complete!');
});
