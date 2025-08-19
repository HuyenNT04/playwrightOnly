import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
 
export class Header extends BasePage{
    private readonly headerLoggedIn: Locator;
    private readonly logo: Locator;
    private readonly accountArea: Locator;
    private headerLinksWrapper: (linkName: string) => Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    private readonly headerMenu: Locator;
    private headerTopMenu: (topMenuName: string) => Locator;
   
    constructor(page: Page){
        super(page);
        this.headerLoggedIn = page.locator("div.header");
        this.logo = page.locator("div.header-logo");
        this.accountArea = page.locator("div.header-links a.account");
        //Dynamic locator
        this.headerLinksWrapper = (linkName: string): Locator => {
            if(["Shopping cart", "Wishlist"].includes(linkName)) {
                return this.page.locator(`//div[@class="header-links"]//a/span[text()="${linkName}"]`);
            }else{
                return this.page.locator(`//div[@class="header-links"]//a[text()="${linkName}"]`);
            }
        }
        this.searchBox = page.locator("input#small-searchterms");
        this.searchButton = page.locator("input[type='submit'][value='Search']")
        this.headerMenu = page.locator("div.header-menu")
        this.headerTopMenu = (topMenuName: string): Locator => {
            return this.page.locator(`//div[@class='header-menu']/ul[@class='top-menu']//a[contains(text(), "${topMenuName}")]`);
        }
    }
 
    //Method
    async getCurrentUrl(): Promise<string>{
       return await this.getUrl();
    }
    //for logged in cases
    async isHeaderUICaptured(nameOfScreen: string): Promise<void>{
        await this.captureElement(this.headerLoggedIn, nameOfScreen, {
            mask: [this.accountArea]
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
    async clickToTopMenu(topMenuName: string): Promise<void>{
        await this.clickElement(this.headerTopMenu(topMenuName));
    }
}