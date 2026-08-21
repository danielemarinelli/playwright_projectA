import { test, expect } from '@playwright/test';

test.describe('Login Authentication', () => {
  test('Successful login with valid demo credentials', async ({ page }) => {
    // 1. Start from a fresh logged-out browser context and navigate to the landing page.
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.getByRole('heading', { name: 'CURA Healthcare Service', level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Make Appointment' })).toBeVisible();

    // 2. Open the login form through Make Appointment.
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login', level: 2 })).toBeVisible();
    await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    await expect(page.locator('#txt-username')).toBeVisible();
    await expect(page.locator('#txt-password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 3. Fill the actual Username and Password fields with valid demo credentials.
    await page.locator('#txt-username').fill('John Doe');
    await page.locator('#txt-password').fill('ThisIsNotAPassword');
    await expect(page.locator('#txt-username')).toHaveValue('John Doe');
    await expect(page.locator('#txt-password')).toHaveValue('ThisIsNotAPassword');

    // 4. Submit the valid credentials.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/#appointment/);
    await expect(page.getByRole('heading', { name: 'Make Appointment', level: 2 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Book Appointment' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });
});
