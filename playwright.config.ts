import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Constant } from './utils/constant';

//Config for env
const env = process.env.ENV || 'qa'; //default is qa if don't set
dotenv.config({ 
    path: path.resolve(__dirname,'profiles', `.env.${env.toLowerCase()}`)
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /*Where save based screenshot foled*/
  snapshotDir: './tests/snapshots',
  timeout: Constant.TIMEOUT.TEST_TIMEOUT,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  //For auth store
  globalSetup: require.resolve('./global-setup'),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    //define ở đây sẽ được ghi đè lên ở phần use
    {
      name: 'Demo web shop - Huyen test',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
        viewport: {width: 1920, height: 1080},
        ignoreHTTPSErrors: true,
        browserName: 'chromium',
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
