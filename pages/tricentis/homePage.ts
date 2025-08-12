import { Locator, Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export class HomePage extends BasePage{
    private readonly welcomeTitle: Locator;

    constructor (page:Page){
        super(page);
        this.welcomeTitle = page.locator("h2[class*='header']");
    }

    //Methods
    async getWelcomeTitle(): Promise<string>{
        return this.getElementTextContent(this.welcomeTitle);
    }
    async getCurrentUrl(): Promise<string>{
        return this.getUrl();
    }
}