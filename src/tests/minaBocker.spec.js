import { test, expect } from "@playwright/test";

test.describe("Mina böcker", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });
})