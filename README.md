# Playwright E2E-tester

Detta projekt innehåller end-to-end-tester med hjälp av Playwright. Fokus ligger på att testa navigering och funktionalitet i en applikation med tre olika vyer:

- **Katalog** – där användaren kan se tillgängliga böcker.
- **Lägg till bok** – där användaren kan lägga till en ny bok.
- **Mina böcker** – där användaren kan se sina sparade böcker.

## Det jag har gjort

- Skapat ett nytt Playwright-projekt.
- Skrivit [User Stories](stories.md)
- Implementerat en testfil per "feature".


## Köra testerna

För att köra testerna:

```bash
npm run test-e2e
```