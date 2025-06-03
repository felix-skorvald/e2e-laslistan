import { test, expect } from "@playwright/test";

test.describe("Agile helper", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://lejonmanen.github.io/agile-helper/");
    });

    test("has title agilehelpelpr", async ({ page }) => {
        await expect(page).toHaveTitle("Agile helper");
    });

    test("go to sprint planning", async ({ page }) => {
        await page.getByRole("button", { name: "Första" }).click();
        await page
            .getByRole("button", {
                name: "Sprint planning ",
            })
            .click();
        const expected = "Sprint planning";
        const heading = await page.getByRole("heading", {
            name: "Sprint planning",
        });

        await expect(heading).toHaveText(expected);
    });

    //     1c Gör ett test för scenariot:
    // Klicka på knappen med texten "Sista"
    // Klicka på knappen "Sprint review"
    // Kontrollera att en rubrik med texten "Sprint review" är synlig på webbsidan.
    // Klicka på knappen "Dags för retrospective"
    // Klicka på knappen "Sprint retrospective"
    // Kontrollera att rubriken "Sprint retrospective" visas.

    test("go to sprint review sen retrospective", async ({ page }) => {
        await page.getByRole("button", { name: "Sista" }).click();

        await page
            .getByRole("button", {
                name: "Sprint review",
            })
            .click();

        let heading = page.getByRole("heading", {
            name: "Sprint review",
        });

        await expect(heading).toBeVisible();

        await page
            .getByRole("button", {
                name: "Dags för retrospective!",
            })
            .click();

        await page
            .getByRole("button", {
                name: "Sprint retrospective",
            })
            .click();

        heading = page.getByRole("heading", {
            name: "Sprint retrospective",
        });

        await expect(heading).toBeVisible();
    });
});

// 1d Gör ett test för ett scenario, som testar att det går att öppna dialogen för "Daily scrum" från alla olika dagar under sprinten. (första, någonstans mitt i, sista)

test.describe("Daily standup in agilehelper", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://lejonmanen.github.io/agile-helper/");
    });

    async function doTest(page, buttonText) {
        await page
            .getByRole("button", {
                name: buttonText,
            })
            .click();

        await page
            .getByRole("button", {
                name: "Daily standup",
            })
            .click();

        await expect(
            page.getByRole("heading", {
                name: "Daily standup",
            })
        ).toBeVisible();
    }

    test("show daily from första", async ({ page }) => {
        await doTest(page, "första");
    });

    test("show daily from mitt i", async ({ page }) => {
        await doTest(page, "mitt i");
    });

    test("show daily from sista", async ({ page }) => {
        await doTest(page, "sista");
    });
});
