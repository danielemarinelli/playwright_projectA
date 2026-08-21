import { test, expect } from '@playwright/test';

test.describe('Login Authentication', () => {
  test('Login rejects empty username and password', async ({ page }) => {
    // 1. Start from a fresh logged-out browser context and open the login screen.
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.locator('#txt-username')).toHaveValue('');
    await expect(page.locator('#txt-password')).toHaveValue('');

    // 2. Submit the form without entering either credential.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
    await expect(page.getByRole('heading', { name: 'Make Appointment', level: 2 })).not.toBeVisible();
  });
});
