import { Locator, Page } from "@playwright/test";
import { BasePage } from '../common/BasePage';
export class LoginPage extends BasePage {

    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly invalidCreditialMessage: Locator;
    private requireFieldMessage: (fieldName: string) => Locator;

    constructor(page: Page) {
        super(page); //Gọi constructor của class cha (BasePage) để khởi tạo các giá trị chung
        this.userNameInput = page.locator("input[name='username']");
        this.passwordInput  = page.locator("input[name='password']");
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.invalidCreditialMessage = page.locator("");
        //Dynamic locator
        this.requireFieldMessage = (fieldName: string): Locator => {
            return this.page.locator(`//label[text()="${fieldName}"]//parent::div`);
        };
    }

    //Methods/ Function
    async inputUsername(userName: string): Promise<void> {
        await this.fillElement(this.userNameInput, userName);
    }
    async inputPassword(password: string): Promise<void> {
        await this.fillElement(this.passwordInput, password);
    }
    async clickLoginButton(): Promise<void> {
        await this.clickElement(this.loginButton);
    }
    async getInvalidCreditialMessage(): Promise<string>{
        const message = await this.getElementTextContent(this.invalidCreditialMessage);
        return message;
    }
    async getRequiredFieldsMessage(fieldName: string): Promise<string>{
        const requiredMessage = await this.getElementInnerText(this.requireFieldMessage(fieldName));
        return requiredMessage;
    }
}