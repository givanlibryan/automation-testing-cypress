class InventoryPage {
  title() { return cy.get('[data-test="title"]'); }
  sortSelect() { return cy.get('[data-test="product-sort-container"]'); }

  addByName(name) {
    // Find the card by product name then click its "Add to cart" button
    cy.contains('[data-test="inventory-item-name"]', name)
      .should('be.visible')
      .parents('[data-test="inventory-item"]')
      .within(() => {
        cy.contains('button', /^add to cart$/i).click({ force: true });
      });
  }

  openCart() {
    return cy.get('[data-test="shopping-cart-link"]').click();
  }
}

export default new InventoryPage();
