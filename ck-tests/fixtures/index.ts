import { test as base, expect,type Page } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  // An already-authenticated page context
  authPage: { page: Page; };
};

export const test = base.extend<Fixtures>({
  loginPage:    async ({ page }, use) => await use(new LoginPage(page)),
  registerPage: async ({ page }, use) => await use(new RegisterPage(page)),
  // Pre-authenticated: loads stored JWT state so login is skipped
  authPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: path.join(__dirname, '../auth/user.json'),
    });
    const page = await context.newPage();
    await use({ page });
    await context.close();
  },
});

export { expect } from '@playwright/test';