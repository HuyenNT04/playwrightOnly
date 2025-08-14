import { test as baseTest, Browser, BrowserContext, Page} from "@playwright/test";
import { LoginPage } from "../pages/tricentis/loginPage"
import { HomePage } from "../pages/tricentis/homePage";
import { RegisterPage } from "../pages/tricentis/registerPage";
 
type MyFixtures = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    registerPage: RegisterPage;
};
 
//Giúp bạn không phải new pageObject(page) lặp đi lặp lại
//Sử dụng chính page được Playwright mặc định khởi tạo cho mỗi test
export const test = baseTest.extend<MyFixtures>({
    // Override hoặc tạo custom fixture cho context nếu cần tùy chỉnh
    context: async ({browser}, use) => {
        const context = await browser.newContext();
        // Ví dụ: set timezone, permissions, record video, ...
        await use(context);
    },
    //page mặc định mà Playwright cung cấp cho mỗi test.
    page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await use(page);
    },
 
    loginPage: async ({page}, use) => {
        const login = new LoginPage(page);
        await use(login);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    registerPage: async ({page}, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    }
});
// Export expect từ test đã mở rộng
export const expect = test.expect;