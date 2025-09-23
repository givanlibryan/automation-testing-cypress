class InformationPage {
  first() { return cy.get('[data-test="firstName"]'); }
  last() { return cy.get('[data-test="lastName"]'); }
  zip() { return cy.get('[data-test="postalCode"]'); }
  continue() { return cy.get('[data-test="continue"]'); }
  cancel() { return cy.get('[data-test="cancel"]'); }
  error() { return cy.get('.error-message-container'); }
  title() { return cy.get('[data-test="title"]'); }
}
export default new InformationPage();
