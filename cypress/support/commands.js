Cypress.Commands.add('openSite', (key) => {
  const sites = Cypress.env('sites') || {};
  const url = sites[key];
  if (!url) {
    throw new Error(`Site key '${key}' not found. Add it to cypress.env.json or pass --config baseUrl=...`);
  }
  cy.visit(url);
});
