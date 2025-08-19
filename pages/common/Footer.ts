import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
 
export class Footer extends BasePage{
    private readonly footer: Locator;
    private hyperLinks: (columnName: string, itemName: string) => Locator;
 
    constructor (page: Page){
        super(page);
        this.hyperLinks = (columnName: string, itemName: string) : Locator => {
            return this.page.locator(`//div[@class='footer']//h3[text()='${columnName}']/following-sibling::ul//a[text()='${itemName}']`);
        }
        this.footer = page.locator('')
    }
    //Method
    async clickToHyperLink(columnName: string, itemName: string): Promise<void>{
        await this.clickElement(this.hyperLinks(columnName, itemName));
    }
    async isFooterCaptured(nameOfScreen: string): Promise<void>{
        await this.captureElement(this.footer, nameOfScreen);
    }
}