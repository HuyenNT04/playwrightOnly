import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
 
export class LoginPage extends BasePage{

    private readonly emailLabel: Locator;
    private readonly passLabel: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly rememberCheckbox: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly loginButton: Locator;
    private readonly registerButton: Locator;
    private readonly welcomeTitle: Locator;
    private readonly newCusSubTitle: Locator;
    private readonly returnCusSubTitle: Locator;
    private readonly newCusDes: Locator;
    private readonly secondHeader: Locator;
    private readonly secondDes: Locator;
 
    constructor(page: Page){
        super(page);
        this.emailLabel = page.locator("");
        this.passLabel = page.locator("");
        this.emailInput = page.locator("#Email");
        this.passwordInput = page.locator("#Password");
        this.rememberCheckbox = page.locator("");
        this.forgotPasswordLink = page.locator("");
        this.loginButton = page.locator("div.buttons input[type='submit']");
        this.registerButton = page.locator("");
        this.welcomeTitle = page.locator("");
        this.newCusSubTitle = page.locator("");
        this.returnCusSubTitle = page.locator("");
        this.newCusDes = page.locator("");
        this.secondHeader = page.locator("");
        this.secondDes = page.locator("");
    }
 
    //Method
    async isMainTitleDisplayed(): Promise<boolean>{
        return this.isElementVisible(this.welcomeTitle);
    }
    async isEmailTitleDisplayed(): Promise<boolean>{
        return this.isElementVisible(this.emailLabel);
    }
    async isPassTitleDisplayed(): Promise<boolean>{
        return this.isElementVisible(this.passLabel);
    }
    async getPageUrl(): Promise<string> {
        return this.getUrl();
    }
    // async isLoginBtnChangedToLogout(): Promise<boolean>{
    //     return this.isElementVisible(this.loginButton);
    // }
    async inputEmail(email: string): Promise<void> {
        await this.fillElement(this.emailInput, email);
    }
    async inputPassword(pass: string): Promise<void> {
        await this.fillElement(this.passwordInput, pass);
    }
    async checkToCheckbox(): Promise<void> {
        await this.clickElement(this.rememberCheckbox)
    }
    async clickToForgetPass(): Promise<void> {
        await this.clickElement(this.forgotPasswordLink);
    }
    async clickToLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }
    async clickToRegisterButton(): Promise<void> {
        await this.clickElement(this.registerButton);
    }
    async getWelcomeTitle(): Promise<string> {
        return await this.getElementInnerText(this.welcomeTitle);
    }
    async getNewCusSubTitle(): Promise<string> {
        return await this.getElementInnerText(this.newCusSubTitle);
    }
    async getReturnCusSubTitle(): Promise<string> {
        return await this.getElementInnerText(this.returnCusSubTitle);
    }
    async getNewCusDes(): Promise<string> {
        return await this.getElementInnerText(this.newCusDes);
    }
    async getSecondHeader(): Promise<string> {
        return await this.getElementInnerText(this.secondHeader);
    }
    async getSecondDes(): Promise<string> {
        return await this.getElementInnerText(this.secondDes);
    }
}