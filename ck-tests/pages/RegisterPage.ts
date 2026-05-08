import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitBtn: Locator;
  readonly alertDanger: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput            = page.getByLabel('Name');
    this.emailInput           = page.getByLabel('Email Address');
    this.passwordInput        = page.getByLabel('Password');
    this.confirmPasswordInput = page.getByLabel('Confirm Password');
    this.submitBtn            = page.getByRole('button', { name: 'Register' });
    this.alertDanger          = page.locator('#email');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(name: string, email: string, password: string) {
    await this.goto();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.submitBtn.click();
  }
}