import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
 
export class Header extends BasePage{
    private readonly headerLoggedIn: Locator;
    private readonly logo: Locator;
    private headerLinksWrapper: (linkName: string) => Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
   
    constructor(page: Page){
        super(page);
        this.headerLoggedIn = page.locator("div.header");
        this.logo = page.locator("div.header-logo");
        //Dynamic locator
        this.headerLinksWrapper = (linkName: string): Locator => {
            if(linkName === "Wishlist"){
                return this.page.locator(`//div[@class="header-links"]//a/span[text()="${linkName}"]`)
            }else{
                return this.page.locator(`//div[@class="header-links"]//a[text()="${linkName}"]`);
            }
        }
        this.searchBox = page.locator("input#small-searchterms");
        this.searchButton = page.locator("input[type='submit'][value='Search']")
    }
 
    //Method
    async getCurrentUrl(): Promise<void>{
        await this.getUrl();
    }
    async isHeaderUICaptured(nameOfScreen: string, accountEmail: string): Promise<void>{
        await this.captureElement(this.headerLoggedIn, nameOfScreen, {
            mask: [this.headerLinksWrapper(accountEmail)]
        })
    }
    async clickToLogo(): Promise<void>{
        await this.clickElement(this.logo);
    }
    async clickToHeaderLink(linkName: string): Promise<void>{
        await this.clickElement(this.headerLinksWrapper(linkName));
    }
    async inputIntoSearchbox(textToFill: string): Promise<void>{
        await this.fillElement(this.searchBox, textToFill);
    }
    async clickToSearchButton(): Promise<void>{
        await this.clickElement(this.searchButton);
    }
}