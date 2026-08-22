import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
        // 1. Launch URL and assert title and header
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        // 2. Click on the Make Appointment
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();

        // Successful login
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        // Assert a text
        await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    /* DEBUG CAN BE DONE IN MULTIPLE WAYS:
    * 1. click on the testing icon on the left colunm, inserting a breakpoint in the test code, and then running the test in debug mode. The test will pause at the breakpoint, allowing you to inspect the state of the application and step through the code.
    * 2. Using the playwright test runner UI (npx playwright test --ui) and press PLAY in the new window. This will open a browser window where you can interact with the application and see the test results in real-time.
    * 3. Using the playwright inspector (PWDEBUG=1) . with "debug:cli" in the scripts section of package.json. This will open a browser window where you can interact with the application and see the test results in real-time.
    * 4. Using the playwright trace viewer --> with "npm run debug:trace" in the scripts section of package.json (npx playwright show-trace <trace.zip>)
    *  
    * 
    *     */


    test("Should make an appointment with non-default values", async ({ page }) => {
        // Dropdown
        await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

        // Checkbox
        await page.getByText("Apply for hospital readmission").click();
        //await page.pause()

        // Radio button
        await page.getByText("Medicaid").click();

        // Date input box
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("05/10/2027");
        // await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");  fails intentionally to show the pause and debug features of playwright

        // Multi-line comments input box
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page.getByRole("textbox", { name: "Comment" }).fill("This is a multi-line comments\ncaptured by Playwright codegen!");

        // Button
        await page.getByRole("button", { name: "Book Appointment" }).click();

        // Assertion
        await expect(page.locator("h2")).toContainText("Appointment Confirmation");
        await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
    });

    // More tests go here ...
});