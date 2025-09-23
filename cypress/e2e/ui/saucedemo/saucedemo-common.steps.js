import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as common from '../../common/commonAction.js';

Given('the user is logged into SauceDemo as {string}', (type) => {
  common.visitSauce();
  common.login(type);
});

Then('Products page should be visible', () => {
  cy.get('[data-test="title"]').should('have.text', 'Products');
  cy.location('pathname').should('match', /inventory/i);
});
