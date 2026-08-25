import { test, expect } from "@playwright/test";

test.beforeAll("Beforeall hook", () => {
    console.log(`👌>>beforeAll: file scope... run just once per worker`); // Should run just once per worker
});

test.beforeEach("BeforeEach", () => {
    console.log(`👍>>beforeEach: file scope... run before all the 6 tests in this file`); // ✅ 6x Should run before all the tests in this file
});

test.describe("Test suite 1", () => {
    // beforeAll
    test.beforeAll("Beforeall hook", () => {
        console.log(`😎>> Suite1: beforeAll describe scope...`); // ✅ 1x
    });

    //beforeEach

    test.beforeEach("BeforeEach", () => {
        console.log(`🕸️>> Suite 1: beforeEach at describe level...`); // ✅ 3x
    });

    test("test one", async ({ page }) => {
        console.log(`>> 🏃‍♂️‍➡️ Running test one in Suite 1...`);
        await page.goto("https://www.google.com");
    });

    test("test two", ({ page }) => {
        console.log(`>> 🏃‍♂️‍➡️ Running test two in Suite 1...`);
    });

    test("test three", ({ page }) => {
        console.log(`>> 🏃‍♂️‍➡️ Running test three in Suite 1...`);
    });
});

test.describe("Test suite 2", () => {
    test.beforeEach("BeforeEach", () => {
        console.log(`✌️>> Suite2: beforeEach at describe level...`);
    });

    test("test one", ({ page }) => {
        console.log(`>>👣 Running test one in Suite 2...`);
    });

    test("test two", ({ page }) => {
        console.log(`>>👣 Running test two in Suite 2...`);
    });

    test("test three", ({ page }) => {
        console.log(`>>👣 Running test three in Suite 2...`);
    });
});