import { test, expect } from "@playwright/test";

test.describe("Lägg till bok", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
        await page.getByTestId("add-book").click();
    });

})