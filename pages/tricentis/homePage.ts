import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import { HOMEPAGE } from "../../utils/constant";

export class HomePage extends BasePage{
    private readonly welcomeTitle: Locator;
    private readonly accountName: Locator;

    constructor (page:Page){
        super(page);
        this.welcomeTitle = page.locator("h2[class*='header']");
        this.accountName = page.locator("div.header-links a[href='/customer/info']")
    }

    //Methods
    async getWelcomeTitle(): Promise<string>{
        return this.getElementTextContent(this.welcomeTitle);
    }
    async getCurrentUrl(): Promise<string>{
        return this.getUrl();
    }
    async closePage(): Promise<void>{
        await this.page.close();
    }
    async openHomePage(): Promise<void>{
        await this.page.goto(HOMEPAGE)
    }
    async getAccountName(): Promise<string>{
        await this.waitForPageLoaded();
        return await this.getElementTextContent(this.accountName);
    }
}