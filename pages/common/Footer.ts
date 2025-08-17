import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
 
export class Footer extends BasePage{
    private hyperLinks: (columnName: string, itemName: string) => Locator;
 
    constructor (page: Page){
        super(page);
        this.hyperLinks = (columnName: string, itemName: string) : Locator => {
            return this.page.locator(`//div[@class='footer']//h3[text()='${columnName}']/following-sibling::ul//a[text()='${itemName}']`);
        }
    }
    async clickToHyperLink(columnName: string, itemName: string): Promise<void>{
        this.clickElement(this.hyperLinks(columnName, itemName));
    }
}