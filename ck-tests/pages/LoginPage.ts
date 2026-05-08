import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage{
readonly emailInput: Locator;
readonly passwordInput: Locator;
readonly submitBtn: Locator;
readonly registerLink: Locator;
readonly alertD:  Locator;

constructor (page:Page){
    super(page);
    this.emailInput=page.getByLabel('Email Address');
    this.passwordInput=page.getByLabel('Password');
    this.submitBtn=page.getByRole('button', {name: 'Login'});
    this.registerLink=page.getByRole('link',{name:/register/i});
    this.alertD=page.locator('#email');
}
async goto(){
    await this.page.goto('/login');
    await expect(this.page).toHaveURL('/login');   
}
async login(email: string, password: string){
    await this.page.goto('/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
}
async expectAlert (text: string | RegExp){
    await expect (this.alertD).toBeVisible();
    await expect(this.alertD).toContainText(text);
    const isInvalid = this.alertD.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
}
}