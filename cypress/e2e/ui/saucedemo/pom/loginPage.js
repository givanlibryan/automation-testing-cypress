class LoginPage {
  username() { return cy.get('[data-test="username"]'); }
  password() { return cy.get('[data-test="password"]'); }
  loginButton() { return cy.get('[data-test="login-button"]'); }
  error() { return cy.get('[data-test="error"], .error-message-container'); }

  login(user, pass) {
    this.username().clear().type(user);
    this.password().clear().type(pass, { log: false });
    this.loginButton().click();
  }
}
export default new LoginPage();
