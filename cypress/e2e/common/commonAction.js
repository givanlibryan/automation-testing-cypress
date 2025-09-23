import loginPage from '../ui/saucedemo/pom/loginPage';

export function visitSauce() {
  const sd = Cypress.env('saucedemo');
  cy.visit(sd.baseUrl);
}

export function login(userType) {
  const sd = Cypress.env('saucedemo');
  let username;

  switch (userType.toUpperCase()) {
    case 'STANDARD':
      username = sd.userSTANDARD;
      break;
    case 'LOCKED':
      username = sd.userLOCKED;
      break;
    case 'PROBLEM':
      username = sd.userPROBLEM;
      break;
    case 'PERF':
      username = sd.userPERF;
      break;
    case 'ERROR':
      username = sd.userERROR;
      break;
    case 'VISUAL':
      username = sd.userVISUAL;
      break;
    default:
      throw new Error(`Unknown user type: ${userType}`);
  }

  loginPage.usernameField().clear().type(username);
  loginPage.passwordField().clear().type(sd.password);
  loginPage.loginButton().click();
}
