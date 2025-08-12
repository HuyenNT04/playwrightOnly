import path from 'path';
import { test } from '../../fixture/tricentis-fixture';
import { loginType } from '../../model/loginType';
import { Assertion } from '../../utils/assertion';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigateTo('/login');
});

test.describe(
  'Login function',
  {
    tag: ['@ui', '@login'],
  },

  () => {
    test('TC001 - Verify UI', async ({ loginPage }) => {
      Assertion.assertTrue(await loginPage.isEmailTitleDisplayed());
      Assertion.assertTrue(await loginPage.isPassTitleDisplayed());
      //Assertion.assertTrue(await loginPage.isTitleDisplayed());
      //Compare ảnh
    });
    
    test('TC002 - Validation', async ({ loginPage }) => {

    });

    test('TC003 - Login successfully', async ({ loginPage, homePage }) => {
      const loginCredential: loginType = {
        email: 'dhjdh@gmail.com',
        password: '123456',
      };
      await loginPage.inputEmail(loginCredential.email);
      await loginPage.inputPassword(loginCredential.password);
      await loginPage.clickToLoginButton();
      Assertion.assertEqual(await homePage.getCurrentUrl(), "https://demowebshop.tricentis.com/")
      Assertion.assertContainsText(await homePage.getWelcomeTitle(), "Welcome to our store");
    });
  }
);

test.afterEach(async ({ page }) => {
  await page.close();
});
