# UI Tests — Cypress + Cucumber + Allure

End-to-end UI tests using **Cypress 13**, **Cucumber (Gherkin)**, and a simple **Page Object** model. Runs headless for CI, records screenshots/videos, and produces an **Allure** dashboard.

## Stack
- Cypress (E2E runner)
- @badeball/cypress-cucumber-preprocessor + esbuild (Gherkin)
- Page Objects under `cypress/e2e/**/pom`
- @shelex/cypress-allure-plugin (Allure results)

## Prerequisites
- Node.js ≥ 18  
- **Java JDK** (8/11/17) for Allure  
  - Windows: set `JAVA_HOME` to your JDK folder (e.g. `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`) and add `%JAVA_HOME%\bin` to **Path**, then restart your terminal.

## Install
```bash
npm install
```

## Project Structure
```
cypress/
  e2e/
    ui/<app>/
      pom/
        cartPage.js
        informationPage.js
        loginPage.js
        overviewPage.js
        finishPage.js
      *.feature
      *.steps.js
  support/
    e2e.js
cypress.config.js
```

## Base URL
Choose one of the following:

**A) In `cypress.config.js`:**
```js
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://<your-base-url>",
    // ...
  },
});
```

**B) From the CLI (per run):**
```bash
npx cypress run  --config baseUrl=https://<your-base-url>
npx cypress open --config baseUrl=https://<your-base-url>
```

## How to Run

### Interactive (headed)
```bash
npm run cy:open
```

### Headless (CI-style)
```bash
npm run cy:run
```

### Run a single feature
```bash
npx cypress run --headless   --spec "cypress/e2e/ui/**/your-file.feature"   --config baseUrl=https://<your-base-url>
```

## Allure Reporting

After a run, raw results are written to `allure-results/`.

**One-shot: run tests & open report**
```bash
npm run test:report
```

**Manual steps**
```bash
npm run cy:run
npm run allure:generate
npm run allure:open
```
The HTML report is generated to `allure-report/` (open `index.html`).

## NPM Scripts
```json
{
  "cy:open": "cypress open",
  "cy:run": "cypress run --spec '**/*.feature'",
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report",
  "test:report": "npm run cy:run && npm run allure:generate && npm run allure:open"
}
```

## What’s Covered (example)
- Login (happy/negative paths)
- Cart (add/remove, badge, listing)
- Checkout: Information (validation & navigation)
- Checkout: Overview (items, subtotal/tax/total, Finish/Cancel)
- Checkout: Finish (thank you, Back Home)
- End-to-End happy path

## Troubleshooting
- **Allure “JAVA_HOME is not set/invalid”**  
  Install a JDK, set `JAVA_HOME` to the JDK folder, add `%JAVA_HOME%\bin` to **Path**, restart the terminal.
- **“Step implementation missing”**  
  Ensure the step text in `.feature` matches a step definition in `.steps.js`.
- **Module/path errors**  
  Use correct relative imports and include `.js` in imports when required.

