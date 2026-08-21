import { test, expect } from '@playwright/test';

test('Should Login Successful', async ({ page }) => {
    // launch URL and assert title and header
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service')
    // click on the make appoitment
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    // login
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
    //assert
  await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  await expect(page.locator('#btn-book-appointment')).toContainText('Book Appointment');
});


test('Login Should Fail', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    // launch URL and assert title and header
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service')
    // click on the make appoitment
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    // login
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('Danny');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Italy');
  await page.getByRole('button', { name: 'Login' }).click();
    //assert
  await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');

});