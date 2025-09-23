class FinishPage {
  header() { return cy.get('[data-test="complete-header"]'); }
  text() { return cy.get('[data-test="complete-text"]'); }
  backHome() { return cy.get('[data-test="back-to-products"]'); }
}
export default new FinishPage();
