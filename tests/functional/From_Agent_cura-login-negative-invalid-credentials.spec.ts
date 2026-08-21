import { test, expect } from '@playwright/test';

test.describe('Login Authentication', () => {
  test('Login rejects invalid username and password', async ({ page }) => {
    // 1. Start from a fresh logged-out browser context and navigate to the login screen.
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.locator('#txt-username')).toHaveValue('');
    await expect(page.locator('#txt-password')).toHaveValue('');

    // 2. Enter invalid credentials and submit the form.
    await page.locator('#txt-username').fill('Danny');
    await page.locator('#txt-password').fill('Italy');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
    await expect(page).not.toHaveURL(/#appointment/);
    await expect(page.getByRole('link', { name: 'Logout' })).not.toBeVisible();
  });
});
