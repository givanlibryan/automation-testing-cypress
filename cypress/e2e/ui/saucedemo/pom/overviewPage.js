class OverviewPage {
  itemNames() { return cy.get('.cart_item .inventory_item_name,[data-test="inventory-item-name"]'); }
  subtotal() { return cy.get('[data-test="subtotal-label"]'); }
  tax() { return cy.get('[data-test="tax-label"]'); }
  total() { return cy.get('[data-test="total-label"]'); }
  finish() { return cy.get('[data-test="finish"]'); }
  cancel() { return cy.get('[data-test="cancel"]'); }
}
export default new OverviewPage();
