import { test, expect } from "@playwright/test";

test.describe("Mina böcker", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });

    test("lägger till en bok i MinaBöcker", async ({ page }) => {
        const book = page.getByTestId("star-Kaffekokaren som visste för mycket")

        await book.click()
        await expect(book).toHaveClass(/selected/);

        //GÅr till Mina böcker och kollar så boken finns där
        await page.getByTestId("favorites").click();
        await expect(page.getByTestId("fav-Kaffekokaren som visste för mycket")).toBeVisible();
    });

    test("tar bort en bok från Mina böcker", async ({ page }) => {
        const title = "Kaffekokaren som visste för mycket";
        const book = page.getByTestId(`star-${title}`);

        // Lägger till boken och kolla så den finns i mina böcker
        await book.click();
        await expect(book).toHaveClass(/selected/);
        await page.getByTestId("favorites").click();
        await expect(page.getByTestId(`fav-${title}`)).toBeVisible();

        // Ta bort boken genom att klicka igen
        await page.getByTestId("catalog").click();
        await book.click();
        await expect(book).not.toHaveClass(/selected/);

        // Kolla så att bokan inte är kvar efter
        await page.getByTestId("favorites").click();
        await expect(page.getByTestId(`fav-${title}`)).not.toBeVisible();
    });

    // kolla flera böcker och lägg kanske till en lsita med titlarna som alla tester kan anävnda som jag gjorde i övantestet
})