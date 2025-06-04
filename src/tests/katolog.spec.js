import { test, expect } from "@playwright/test";

test.describe("Katalog", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            "https://tap-ht24-testverktyg.github.io/exam-template/"
        );
    });

    test("renderar boklistan och lägger till en bok i MinaBöcker", async ({
        page,
    }) => {
        const bookList = page.locator(".catalog");
        const book = page.getByTestId(
            "star-Kaffekokaren som visste för mycket"
        );

        await expect(bookList).toBeVisible();

        await expect(book).not.toHaveClass(/selected/);
        // Lägger till en bok i Mina böcker
        await book.click();
        //Kollar så den har klassen den ska ha
        await expect(book).toHaveClass(/selected/);
        //Går till Mina böcker och kollar så boken finns där
        await page.getByTestId("favorites").click();

        await expect(
            page.getByTestId("fav-Kaffekokaren som visste för mycket")
        ).toBeVisible();
    });
});
