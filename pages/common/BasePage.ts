import { expect, Locator, Page } from "@playwright/test";
import fs from "fs";
import path from "path";

//Contains all wrapper methods of Playwright
export class BasePage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Wait
  async waitForElement(selector: string): Promise<Locator> {
    //Chờ element rồi trả lại để dùng tiếp
    const element = this.page.locator(selector);
    await element.waitFor({ state: "visible" });
    return element;
  }
  async waitForElementVisible(element: Locator | string): Promise<void> {
    //Chỉ đơn thuần chờ cho nó visible
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "visible" });
    } else {
      await element.waitFor({ state: "visible" });
    }
  }
  async waitForElementHidden(
    element: Locator,
    timeout: number = 30
  ): Promise<void> {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, {
        state: "hidden",
        timeout: timeout * 1000,
      });
    } else {
      await element.waitFor({ state: "hidden", timeout: timeout * 1000 });
    }
  }
  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForLoadState();
  }

  //Function
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async clickElement(element: Locator): Promise<void> {
    await element.click();
  }
  async forceClickElement(element: Locator): Promise<void> {
    await element.click({ force: true });
  }
  async rightClickElement(element: Locator): Promise<void> {
    await element.click({ button: "right" });
  }
  async doubleClickElement(element: Locator): Promise<void> {
    await element.dblclick();
  }
  async fillElement(element: Locator, value: string): Promise<void> {
    await element.fill(value);
  }
  async getElementInnerText(element: Locator): Promise<string> {
    //get only visible text
    return element.innerText();
  }
  async getElementTextContent(element: Locator): Promise<string> {
    //get both visible and invisible text
    const textContent = await element.textContent();
    return textContent !== null ? textContent : "";
  }
  async getUrl(): Promise<string> {
    return this.page.url();
  }
  async isElementVisible(element: Locator): Promise<boolean> {
    const isVisible = await element.isVisible();
    if(!isVisible){
      console.log('Element is not visible!');
    }
    return isVisible;
  }
  async mouseHoverOnElement(element: Locator): Promise<void> {
    await element.hover();
  }
  async waitForElementAttached(locator: string): Promise<void> {
    await this.page.waitForSelector(locator);
  }
  async dragAndDrop(
    dragElementLocator: string,
    dropElementLocator: string
  ): Promise<void> {
    await this.waitForElementAttached(dragElementLocator);
    await this.waitForElementAttached(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }
  async downloadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(locator),
    ]);
    await download.saveAs(
      path.join(__dirname, "../Downloads", download.suggestedFilename())
    );
    return download.suggestedFilename();
  }
  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, "utf-8");
  }
  async writeDataIntoTextFile(
    filePath: number | fs.PathLike,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    fs.writeFile(filePath, data, (error) => {
      if (error) throw error;
    });
  }
  async verifyUrl(url: any): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }
  async focusElement(locator: string): Promise<void> {
    await this.page.locator(locator).focus();
  }
  //Keyboard
  async keyPress(locator: string, key: string): Promise<void> {
    await this.page.press(locator, key);
  }
  //Gõ lần lượt từng ký tự của chuỗi key vào một ô input hoặc element xác định bởi locator.
  async keyPressSequently(locator: string, key: string): Promise<void> {
    await this.page.locator(locator).pressSequentially(key);
  }
  async selectDropdownOption(locator: string, option: string): Promise<void> {
    await this.page.locator(locator).selectOption(option);
  }
  async checkCheckbox(locator: string): Promise<void> {
    await this.page.locator(locator).check();
    await expect(this.page.locator(locator)).toBeChecked();
  }

  async isCheckboxChecked(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).toBeChecked();
  }

  async uncheckCheckbox(locator: string): Promise<void> {
    await this.page.locator(locator).uncheck();
    await expect(this.page.locator(locator)).not.toBeChecked();
  }

  async isCheckboxUnchecked(locator: string): Promise<void> {
    await expect(this.page.locator(locator)).not.toBeChecked();
  }
  //Cookie
  async getCookie(URL: string, cookieName: string): Promise<string> {
    const cookie = await this.page.context().cookies(URL);
    //console.log("cookie text: " + JSON.stringify(cookie));

    const lengthCookie = cookie.length;
    let valueOfCookie;

    for (let step = 0; step < lengthCookie; step++) {
      if (cookie[step]["name"] === cookieName) {
        valueOfCookie = cookie[step]["value"];
        console.log(`Cookie: ${cookieName}=${valueOfCookie}`);
      }
    }

    return `${cookieName}=${valueOfCookie}`;
  }

  async setCookie(cookieName: string, cookieValue: string): Promise<void> {
    // Set the cookie
    await this.page.evaluate(
      ({ name, value }) => {
        document.cookie = `${name}=${value}`;
      },
      { name: cookieName, value: cookieValue }
    );

    // Check if the cookie was set
    const cookieSet = await this.page.evaluate((name) => {
      const cookies = document.cookie;
      return cookies.includes(name);
    }, cookieName);

    // Throw an error if the cookie wasn't set
    if (!cookieSet) {
      throw new Error(`Cookie "${cookieName}" was not set.`);
    }
  }

  //Screenshot
  async takeScreenshot(fileName: string): Promise<void> {
    //Chụp ảnh màn hình (screenshot) của khu vực hiển thị hiện tại của trang web
    await this.page.screenshot({ path: fileName });
  }
  async captureScreenshot(
    //chụp ảnh nâng cao, thêm timestamp, có thể chụp toàn trang.
    screenshotName: string,
    fullPage: boolean = false //default = false, nếu muốn chụp toàn trang --> true
  ): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await this.page.screenshot({
      path: `screenshots/${screenshotName}-${timestamp}.png`,
      fullPage,
    });
  }
}
