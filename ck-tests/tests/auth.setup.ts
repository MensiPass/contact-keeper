import { test as setup, expect } from '@playwright/test';
import path from 'path';

const userAuthFile = path.join(__dirname, '../auth/user.json');

setup('create test user and save auth state', async ({ request, page }) => {
  // Step 1: Register via API — not via UI — so we don't depend on the register form
  // working before we can test the register form. Clean separation of concerns.
  const registerRes = await request.post('http://localhost:5000/api/users', {
    data: {
      name:     process.env.TEST_USER_NAME!,
      email:    process.env.TEST_USER_EMAIL!,
      password: process.env.TEST_USER_PASSWORD!,
    },
  });

  // 400 is fine — user might already exist from a previous run
  expect([200, 400]).toContain(registerRes.status());

  // Step 2: Login via UI so Playwright captures the localStorage state
  // (the JWT token is set in localStorage by the React app after login)
  await page.goto('/login');
  await page.getByLabel('Email Address').fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait until we are on the home/dashboard route
  await expect(page).toHaveURL('/');

  // Save cookies + localStorage (includes the JWT token) to file
  await page.context().storageState({ path: userAuthFile });

  console.log('✓ Auth state saved to', userAuthFile);
});