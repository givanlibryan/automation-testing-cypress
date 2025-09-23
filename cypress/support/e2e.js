import './commands';
import '@shelex/cypress-allure-plugin'; 

// Global setup (runs before every test)
beforeEach(() => {
  cy.log('Running global beforeEach');
  cy.allure().tag('saucedemo', 'ui'); 
});
