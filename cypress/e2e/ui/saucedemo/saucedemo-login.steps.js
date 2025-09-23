const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

import { visitSauce, login } from '../../common/commonAction';
import loginPage from './pom/loginPage';


Given('user accesses SauceDemo on desktop', () => {
  cy.viewport('macbook-16');
  visitSauce();
});

When('user logs in as {string}', (type) => {
  login(type); // STANDARD | LOCKED | PROBLEM | PERF | ERROR | VISUAL
});

Then('Products page should be visible', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.title').should('have.text', 'Products');
});

Then('error banner should contain {string}', (msg) => {
  loginPage.errorBanner().should('contain', msg);
});
