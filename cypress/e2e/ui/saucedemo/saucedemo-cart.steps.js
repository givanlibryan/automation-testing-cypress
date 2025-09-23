import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as common from '../../common/commonAction.js';
import cartPage from './pom/cartPage.js';

Given('the user has the following products in the cart:', (table) => {
  const names = table
    .raw()
    .flat()
    .map(s => (s || '').trim())
    .filter(s => s && !/^data\s*table$/i.test(s) && s !== '|');

  cy.get('[data-test="title"]').should('contain', 'Products');
  names.forEach(name => common.addProductByName(name));
});

Given('the user opens the Cart page', () => common.openCart());

Then('the cart badge should equal the number of cart items', () => {
  cartPage.items().its('length').then(len => {
    cartPage.badge().should('have.text', String(len));
  });
});

When('the user removes {string} from the cart', (name) => {
  cartPage.removeByName(name);
});

Then('the cart should list exactly:', (table) => {
  const expected = table.raw().flat().map(s => s.trim()).filter(Boolean);
  cartPage.itemNames().should('have.length', expected.length);
  cartPage.itemNames().then($els => {
    const actual = [...$els].map(el => el.innerText.trim());
    expect(actual).to.deep.equal(expected);
  });
});

Then('the cart badge should show {string}', (n) => {
  cartPage.badge().should('have.text', String(n));
});

When('the user clicks Continue Shopping', () => cartPage.continueShopping());

Then('the Products page should be displayed', () => {
  cy.get('[data-test="title"]').should('have.text', 'Products');
});

Then('the Checkout button should be enabled', () => {
  cartPage.checkout().should('be.enabled');
});
