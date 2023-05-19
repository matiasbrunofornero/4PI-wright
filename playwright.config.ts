import { defineConfig, devices } from '@playwright/test';
import bearer from './src/utils/bearer.json'

export default defineConfig({
    /* Look for test files in the "tests" directory, relative to this configuration file. */
    testDir: './tests',

    /* Run tests in files in parallel. */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only. */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use. */
    outputDir: './reports/failures',

    /* globalSetup config to use diff envs. */
    globalSetup: "src/utils/globalSetup.ts",

    /* Shared settings for all the projects below. */
    use: {
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
            "Authorization": bearer.Bearer
        },
    },

    reporter: [
        ['list'],
        ['playwright-qase-reporter',
            {
                apiToken: '78da33c9c8cff5ea22c1f393e114a4ae9bf6a80bb149895656f803cdcaebd980',
                projectCode: 'CBE',
                runComplete: true,
                basePath: 'https://api.qase.io/v1',
                logging: true,
                uploadAttachments: true,
            }],
    ],

    /* Configure projects for major browsers. */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },

        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },

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
        //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
