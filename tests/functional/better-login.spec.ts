import { test, expect } from '@playwright/test';
import { log } from "../helpers/logger.js";

test.describe("Login functionality",() => {

  // hooks - this runs before every test
  test.beforeEach("", async ({page}, testInfo) => {
  const envConfig = testInfo.project.use as any;
  await log("info", `Launching the web app in ${envConfig.envName}`)  // Custom logs
            // Get URL file from config file (test.playwright.config.ts)    best practice!
  await page.goto(envConfig.appURL);
      // launch URL and assert title and header
  //await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service')
    // click on the make appoitment
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await expect(page.locator('#login')).toContainText('Please login to make appointment.');
  })


test('Should Login Successful', async ({ page }) => {
  
    // login
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(process.env.TEST_USER_NAME);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
    //assert
  await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  await expect(page.locator('#btn-book-appointment')).toContainText('Book Appointment');
});


test('Login Should not be successful', async ({ page }) => {
  
    // login
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('Danny');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Italy');
  await page.getByRole('button', { name: 'Login' }).click();
    //assert
  await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');

});


})