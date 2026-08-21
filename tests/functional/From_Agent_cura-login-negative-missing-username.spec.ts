import { test, expect } from '@playwright/test';

test.describe('Login Authentication', () => {
  test('Login rejects a missing username', async ({ page }) => {
    // 1. Start from a fresh logged-out browser context and open the login screen.
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page.getByRole('heading', { name: 'Login', level: 2 })).toBeVisible();

    // 2. Leave Username empty, enter the valid password, and submit the form.
    await page.locator('#txt-password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
    await expect(page).not.toHaveURL(/#appointment/);
  });
});
