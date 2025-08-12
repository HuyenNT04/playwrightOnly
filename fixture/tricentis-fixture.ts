import { test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/tricentis/loginPage"
import { HomePage } from "../pages/tricentis/homePage";

type pages = {
    loginPage: LoginPage;
    homePage: HomePage;
};

//Giúp bạn không phải new LoginPage(page) lặp đi lặp lại
export const test = baseTest.extend<pages>({
    loginPage: async ({page}, use) => {
        const login = new LoginPage(page);
        await use(login);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
});

export const expect = test.expect;