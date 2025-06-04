import { test, expect } from "@playwright/test";

test.describe("Lägg till bok", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            "https://tap-ht24-testverktyg.github.io/exam-template/"
        );
        await page.getByTestId("add-book").click();
    });

    test("Lägger till EN bok och kollar sedan och den finns i katalogen", async ({
        page,
    }) => {
        const book = { title: "Morgonstjärnan", author: "Karl Ove Knausgård" };
        const titleInput = page.getByTestId("add-input-title");
        const authInput = page.getByTestId("add-input-author");

        await titleInput.fill(book.title);
        await authInput.fill(book.author);

        await page.getByTestId("add-submit").click();

        await page.getByTestId("catalog").click();

        await expect(page.getByText(/Morgonstjärnan/)).toBeVisible();
    });

    test("Lägger till flera böcker och kollar sedan och de finns i katalogen", async ({
        page,
    }) => {
        const books = [
            { title: "Morgonstjärnan", author: "Karl Ove Knausgård" },
            {
                title: "Vargarna från evighetens skog",
                author: "Karl Ove Knausgård",
            },
            { title: "Nattens skola", author: "Karl Ove Knausgård" },
        ];
        const titleInput = page.getByTestId("add-input-title");
        const authInput = page.getByTestId("add-input-author");

        //Lägg till alla böcker
        for (const book of books) {
            await titleInput.fill(book.title);
            await authInput.fill(book.author);
            await page.getByTestId("add-submit").click();
        }
        //Kolla katalogen om böcker finns
        await page.getByTestId("catalog").click();

        await expect(page.getByText(/Morgonstjärnan/)).toBeVisible();
        await expect(page.getByText(/Vargarna från evighetens/)).toBeVisible();
        await expect(page.getByText(/Nattens skola/)).toBeVisible();
    });

    test("Lägger inte till med tomma fält och kan lägga till när båda är i fyllda", async ({
        page,
    }) => {
        const titleInput = page.getByTestId("add-input-title");
        const authInput = page.getByTestId("add-input-author");
        const submit = page.getByTestId("add-submit");

        //Kollar så det inte gå att klicka när fälten är tomma
        await expect(submit).toBeDisabled();

        // fylller i ett fält och testar igen
        await titleInput.fill("Morgonstjärnan");
        await expect(submit).toBeDisabled();

        //tömmer titel och fyller bara i författare
        await titleInput.fill("");
        await authInput.fill("Karl Ove Kanusgård");
        await expect(submit).toBeDisabled();

        // Fyller i båda, borde funka att klicka
        await titleInput.fill("Morgonstjärnan");
        await expect(submit).toBeEnabled();

        // Lägger till och kollar så den finns i katalog
        await submit.click();
        await page.getByTestId("catalog").click();
        await expect(page.getByText(/Morgonstjärnan/)).toBeVisible();
    });
});
