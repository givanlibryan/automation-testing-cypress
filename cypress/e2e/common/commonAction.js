import loginPage from '../ui/saucedemo/pom/loginPage.js';
import inventoryPage from '../ui/saucedemo/pom/inventoryPage.js';

const SAUCE = Cypress.env('saucedemo');

export function visitSauce() {
  cy.visit(SAUCE.baseUrl);
}

function usernameFor(type = 'STANDARD') {
  const t = String(type).trim().toUpperCase();
  if (t.includes('LOCK')) return SAUCE.userLOCKED;
  if (t.includes('PROBLEM')) return SAUCE.userPROBLEM;
  if (t.includes('PERF')) return SAUCE.userPERF;
  if (t.includes('ERROR')) return SAUCE.userERROR;
  if (t.includes('VISUAL')) return SAUCE.userVISUAL;
  return SAUCE.userSTANDARD;
}

/** Performs login only (no assertions). */
export function loginOnly(type = 'STANDARD') {
  const user = usernameFor(type);
  loginPage.login(user, SAUCE.password);
}

/** Positive login helper (kept for convenience). */
export function login(type = 'STANDARD') {
  loginOnly(type);
  assertLoggedIn();
}

/** Positive post-condition */
export function assertLoggedIn() {
  cy.get('[data-test="title"]').should('contain', 'Products');
}

/** Negative post-condition */
export function assertLoginErrorContains(text) {
  loginPage.error().should('be.visible').and('contain', text);
}

/** Product helpers (Products page) */
export function addProductByName(name) {
  inventoryPage.addByName(name);
}

export function openCart() {
  inventoryPage.openCart();
  cy.get('[data-test="title"]').should('contain', 'Your Cart');
}
