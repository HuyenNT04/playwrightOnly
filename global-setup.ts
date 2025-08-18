import { chromium, FullConfig } from "@playwright/test";
import { authConfig, storageStatePath } from "./auth.config";
import fs from 'fs';
import { URL } from "url";

//đăng nhập & lưu state từ auConfig
export default async function globalSetup (config: FullConfig){
//Nếu chưa có thì tạo thư mục state
for (const role of Object.keys(authConfig) as Array<keyof typeof authConfig>){ 
    fs.mkdirSync(authConfig[role].storageDir, {recursive: true});
    //Login for each account and roles
    const {accounts} = authConfig[role];
    await Promise.all(accounts.map(async (acc, i) => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(new URL('/login', process.env.BASE_URL).toString());
      await page.locator("#Email").fill(acc.email);
      await page.locator("#Password").fill(acc.password);
      await page.locator("div.buttons input[type='submit']").click();

      await page.getByText(acc.email, {exact: false}).first().waitFor({timeout: 15000});

      await context.storageState({path: storageStatePath(role)});
      await browser.close();
    }));
}
}