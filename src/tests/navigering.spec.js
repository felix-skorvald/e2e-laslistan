import { test, expect } from "@playwright/test";

test.describe("Navigering", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });


    test("kan navigera och visar rätt innnehåll", async ({ page }) => {
        //Visa katalog
        await expect(
            page.getByTestId("catalog")
        ).toBeDisabled();

        //visa lägg till bok
        await page
            .getByTestId("add-book")
            .click();

        await expect(
            page.getByTestId("add-book")
        ).toBeDisabled();

        await expect(
            page.getByTestId("add-input-title")
        ).toBeVisible();

        //Visa Mina böcker
        await page
            .getByTestId("favorites")
            .click();

        await expect(
            page.getByTestId("favorites")
        ).toBeDisabled();
        //eftersom listan inte innehåller nåt så syns den inte men man kan kolla om den finns och är tom
        await expect(
            page.getByTestId("book-list")
        ).toBeEmpty();
    });
})