class CartPage {
  // header badge
  badge() {
    return cy.get('[data-test="shopping-cart-badge"], .shopping_cart_badge');
  }

  // all cart rows
  items() {
    return cy.get('[data-test="cart-list"] .cart_item');
  }

  // the product names listed in cart
  itemNames() {
    return cy.get(
      '[data-test="cart-list"] [data-test="inventory-item-name"], .cart_item .inventory_item_name'
    );
  }

  // remove a specific product from cart
  removeByName(name) {
    cy.contains('[data-test="cart-list"] .cart_item [data-test="inventory-item-name"]', name)
      .parents('.cart_item')
      .within(() => {
        cy.contains('button', /^remove$/i).click({ force: true });
      });
  }

  continueShopping() {
    return cy.get('[data-test="continue-shopping"]').click();
  }

  checkout() {
    return cy.get('[data-test="checkout"]');
  }
}

export default new CartPage();
