class LoginPage {
  usernameField() { return cy.get('#user-name'); }
  passwordField() { return cy.get('#password'); }
  loginButton()   { return cy.get('#login-button'); }
  errorBanner()   { return cy.get('[data-test="error"]'); }
}
export default new LoginPage();
