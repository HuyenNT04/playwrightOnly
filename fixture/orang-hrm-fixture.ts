import { test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/admin/LoginPage"

type pages = {
    loginPage: LoginPage;
};

//Giúp bạn không phải new LoginPage(page) lặp đi lặp lại
export const test = baseTest.extend<pages>({
    loginPage: async ({page}, use) => {
        const login = new LoginPage(page);
        await use(login);
    }
});

export const expect = test.expect;