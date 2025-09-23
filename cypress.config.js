const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,

    env: {
      allure: true,
      allureResultsPath: 'allure-results',
      allureAttachRequests: true,
      allureAddVideoOnPass: false,
      allureOmitPreviousAttemptAttachments: true,
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      allureWriter(on, config); 
      return config;
    },
  },
});
