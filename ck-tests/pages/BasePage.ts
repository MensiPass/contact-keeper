import {Page, Locator, expect} from '@playwright/test'
export class BasePage {
    readonly page:Page;

    constructor (page:Page){
        this.page=page;
    }
    //go to path relative to base url
    async goto(path:string ='/'){
        await this.page.goto(path);
    }
    //wait network idle
    async waitForNetIdle(){
        await this.page.waitForLoadState('networkidle');
    }

    //assert page title
    async expectTitle (title:string | RegExp){
        await expect (this.page).toHaveTitle(title);
    }
    async expectUrl(url: string | RegExp){
        await expect(this.page).toHaveURL(url);
    }
    async screenShot(name:string){
        await this.page.screenshot({path:'screenshots/debug/${name}.png'});
    }
}