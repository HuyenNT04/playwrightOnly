import path from 'path';
import { test } from '../../fixture/orang-hrm-fixture';
import { JSONHandling } from '../../utils/jsonHandle';
import { loginType } from '../../model/loginType';
import { Assertion } from '../../utils/assertion';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigateTo('/');
});

test.describe(
  'Login function',
  {
    tag: ['@ui', '@login'],
  },

  () => {
    test('TC001 - Login with valid username and password', async ({ loginPage }) => {
      const loginCredential: loginType = {
        username: 'dhjdh@gmail.com',
        password: '123456',
      };
      await loginPage.inputUsername(loginCredential.username);
      await loginPage.inputPassword(loginCredential.password);
      await loginPage.clickLoginButton();
      Assertion.assertEqual(await loginPage.getSuceessMessage(), "messsage");
    });
    test('TC002 - Validation', async ({ loginPage }) => {
      const data = JSONHandling.getTestDataFromJson(path.join(__dirname, '../../data/store.json'));
      console.log(data);
    });
  }
);

test.afterEach(async ({ page }) => {
  await page.close();
});
