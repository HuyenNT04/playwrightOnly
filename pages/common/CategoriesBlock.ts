import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
 
export class categoriesBlock extends BasePage {
    private blockTitles: (titleName: string, itemName: string) => Locator;
    private readonly newsletterEmail: Locator;
    constructor(page: Page) {
        super(page);
        this.blockTitles = (titleName: string, itemName: string): Locator => {
            return this.page.locator(`//div[@class='master-wrapper-main']//strong[text()='${titleName}']/parent::div/following-sibling::div//a[normalize-space() = '${itemName}' ]`)
        }
        this.newsletterEmail = page.locator("")
    }
    async clickToItem(titleName: string, itemName: string): Promise<void>{
        await this.clickElement(this.blockTitles(titleName, itemName));
    }
    async getCurrentUrl(): Promise<string>{
        return this.getUrl();
    }
}