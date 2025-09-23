import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as common from '../../common/commonAction.js';

Given('user accesses SauceDemo on desktop', () => {
  cy.viewport('macbook-16');
  common.visitSauce();
});

When('user logs in as {string}', (type) => {
  common.loginOnly(type);  
});

Then('login should succeed', () => {
  common.assertLoggedIn();
});

Then('login should fail with message containing {string}', (msg) => {
  common.assertLoginErrorContains(msg);
});

Then('error banner should contain {string}', (text) => {
  cy.get('[data-test="error"], .error-message-container, [data-test="error-message-container"]')
    .should('be.visible')
    .invoke('text')
    .then(t => t.trim().toLowerCase())
    .should('contain', text.toLowerCase());
});
