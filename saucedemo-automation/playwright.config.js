const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});