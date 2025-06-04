import { test, expect } from "@playwright/test";

test.describe("Mina böcker", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");
    });

    const titles = ["Kaffekokaren som visste för mycket", "Hur man tappar bort sin TV-fjärr 10 gånger om dagen", "Min katt är min chef"]

    test("Lägger till och tar bort en bok från Mina böcker", async ({ page }) => {
        const title = titles[0]
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

    test("Lägger till och tar bort flera böcker", async ({ page }) => {

        await test.step("Lägger till böcker i favoriter", async () => {
            for (const title of titles) {
                const book = page.getByTestId(`star-${title}`);
                //Lägger till bok och kollar så den finns i favoriter
                await book.click();
                await expect(book).toHaveClass(/selected/);
                await page.getByTestId("favorites").click();
                await expect(page.getByTestId(`fav-${title}`)).toBeVisible();
                // går sedan tillbaka för att lägga till nästa bok
                await page.getByTestId("catalog").click();
            }
        });

        await test.step("Tar bort böcker från favoriter", async () => {
            for (const title of titles) {
                const book = page.getByTestId(`star-${title}`);
                //Tar bort boken och kollar så den är borta
                await book.click();
                await expect(book).not.toHaveClass(/selected/);
                await page.getByTestId("favorites").click();
                await expect(page.getByTestId(`fav-${title}`)).not.toBeVisible();
                //Går tillbaka
                await page.getByTestId("catalog").click();
            }
        });
    });

})