import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import cartPage from './pom/cartPage.js';
import infoPage from './pom/informationPage.js';

Given('the user proceeds to Checkout', () => {
  cartPage.checkout().click();
  cy.get('[data-test="title"]').should('have.text', 'Checkout: Your Information');
});

// Helper: normalize DataTable into a { first, last, zip } object
function tableToKV(table) {
  // If it's a two-column mapping table:
  // | first | John |
  // | last  | Doe  |
  // | zip   | 12345|
  if (typeof table.rowsHash === 'function') {
    const h = table.rowsHash();
    if (Object.keys(h).length) return h;
  }

  // If it's a single row with headers:
  // | first | last | zip |
  // | John  | Doe  | 12345 |
  const raw = table.raw();
  if (raw.length >= 2 && raw[0].length >= 1) {
    const [headers, values] = raw;
    const kv = {};
    headers.forEach((key, i) => {
      kv[key.trim()] = (values?.[i] ?? '').toString().trim();
    });
    return kv;
  }

  // Fallback – treat as pairs
  return Object.fromEntries(raw.map(([k, v = '']) => [k, v]));
}

// Helper: clear and maybe type (skips typing empty strings)
function clearAndMaybeType(getter, val) {
  if (val === undefined || val === null) return;           // field not provided at all → leave as-is
  const v = String(val).trim();
  if (v.length === 0) {
    getter().clear();                                      // explicit empty → clear and leave blank
  } else {
    getter().clear().type(v);                              // non-empty → type it
  }
}

When('the user submits the Information form with:', (table) => {
  const kv = tableToKV(table);

  // Accept common aliases too (firstName/lastName/postalCode)
  clearAndMaybeType(() => infoPage.first(), kv.first ?? kv.firstName);
  clearAndMaybeType(() => infoPage.last(),  kv.last  ?? kv.lastName);
  clearAndMaybeType(() => infoPage.zip(),   kv.zip   ?? kv.postal ?? kv.postalCode);

  infoPage.continue().click();
});

Then('a validation error should contain {string}', (msg) => {
  infoPage.error().should('contain.text', msg);
});

Then('the Overview page should be displayed', () => {
  cy.get('[data-test="title"]').should('have.text', 'Checkout: Overview');
});

When('the user clicks Cancel on the Information page', () => {
  infoPage.cancel().click();
});

Then('the Cart page should be displayed', () => {
  cy.get('[data-test="title"]').should('have.text', 'Your Cart');
});
