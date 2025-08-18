import { test as baseTest, Browser, BrowserContext, Page} from "@playwright/test";
import { LoginPage } from "../pages/tricentis/loginPage"
import { HomePage } from "../pages/tricentis/homePage";
import { RegisterPage } from "../pages/tricentis/registerPage";
import { Header } from "../pages/common/Header";
import fs from "fs";
import { Role, storageStatePath } from "../auth.config";

const withRole = baseTest.extend<{ role: Role }>({
  role: ['guest', { option: true }],
});
 
type MyFixtures = {
    role: Role,
    browser: Browser;
    context: BrowserContext;
    page: Page;
    header: Header;
    loginPage: LoginPage;
    homePage: HomePage;
    registerPage: RegisterPage;
};
 
//Giúp bạn không phải new pageObject(page) lặp đi lặp lại
//Sử dụng chính page được Playwright mặc định khởi tạo cho mỗi test
export const test = withRole.extend<MyFixtures>({
    // Override hoặc tạo custom fixture cho context nếu cần tùy chỉnh
    context: async ({browser, role}, use) => {
        // 1) Guest: blank context (non-state)
        if(role === "guest"){
            const context = await browser.newContext();
            await use(context);
            await context.close();
            return;
        }
        // 2) Admin/User: get storageState in global-setup
        const stateFile = storageStatePath(role);
        if(!fs.existsSync(stateFile)){
            throw new Error(`Missing storageState for role "${role}"`)
        }
        const context = await browser.newContext({storageState: stateFile});
        await use(context);
        await context.close();
        // const context = await browser.newContext();
        // Ví dụ: set timezone, permissions, record video, ...
        // await use(context);
    },

    //page mặc định mà Playwright cung cấp cho mỗi test.
    page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    },
   
    header: async({page}, use) => {
        const header = new Header(page);
        await use(header);
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
    },
});
// Export expect từ test đã mở rộng
export const expect = test.expect;
export default test;