import { test } from '../../fixture/tricentis-fixture';
import { Assertion } from '../../utils/assertion';
import { invalidAccountCredentials, validAccountCredentials } from '../../data/login-test-data';
import { HomePage } from '../../pages/tricentis/homePage';
import { HOMEPAGE, REGISTER_PAGE } from '../../utils/constant';
import { headerLinksWhenNotLogin, headerTopMenu } from '../../data/header-data';
import { makeCounter } from '../../utils/helperFunctions';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigateTo('/login');
});
export const tc = makeCounter(1);
test.describe(
  'Login Page',
  {
    tag: ['@ui', '@login'],
  },
  () => {
    test.use({ role: 'guest' });

    test(tc('Verify UI'), async ({ loginPage }) => {
      await loginPage.isLoginPageUICaptured('Login-page.png');
    });

    test(tc('Verify behavior when clicked to Logo on Header'), async ({ header }) => {
      await header.clickToLogo();
      Assertion.assertToHaveUrl(header.page, HOMEPAGE);
    });

    for (const headerLink of headerLinksWhenNotLogin) {
      test(tc(`Verify behavior when clicked to ${headerLink.nameLink} on Header`), async ({
        header,
      }) => {
        await header.clickToHeaderLink(headerLink.nameLink);
        Assertion.assertToHaveUrl(header.page, headerLink.url);
      });
    }

    test(tc('Verify behavior when searching'), async ({ header }) => {
      let data = 'mobile';
      await header.inputIntoSearchbox(data);
      await header.clickToSearchButton();
      Assertion.assertContainsText(await header.getCurrentUrl(), data);
    });

    for (const itemInTopMenu of headerTopMenu) {
      test(tc(`Verify behavior when clicked to ${itemInTopMenu.itemName} on Top Menu`), async ({
        header,
      }) => {
        await header.clickToTopMenu(itemInTopMenu.itemName);
        Assertion.assertToHaveUrl(header.page, itemInTopMenu.url);
      });
    }

    test(tc('Login successfully'), async ({ loginPage, homePage }) => {
      await loginPage.inputEmail(validAccountCredentials.email);
      await loginPage.inputPassword(validAccountCredentials.password);
      await loginPage.clickToLoginButton();
      Assertion.assertEqual(await homePage.getCurrentUrl(), HOMEPAGE);
      Assertion.assertContainsText(await homePage.getWelcomeTitle(), 'Welcome to our store');
    });

    for (const invalidUser of invalidAccountCredentials) {
      test(tc(`Login unsuccessfully with ${invalidUser.nameCase}`), async ({ loginPage }) => {
        await test.step(`Testing with ${invalidUser.email} and ${invalidUser.password}`, async () => {
          await loginPage.inputEmail(invalidUser.email);
          await loginPage.inputPassword(invalidUser.password);
          await loginPage.clickToLoginButton();
          if (invalidUser.generalErrorMessage) {
            Assertion.assertEqual(
              await loginPage.getGenErrorMessage(),
              invalidUser.generalErrorMessage
            );
          }
          if (invalidUser.subErrorMessage) {
            Assertion.assertEqual(
              await loginPage.getSubErrorMessage(),
              invalidUser.subErrorMessage
            );
          }
          if (invalidUser.validatedErrorMessageForEmail) {
            Assertion.assertEqual(
              await loginPage.getErrorMessageForEmail(),
              invalidUser.validatedErrorMessageForEmail
            );
          }
        });
      });
    }

    test(tc('Verify go to Register page'), async ({ loginPage, registerPage }) => {
      await loginPage.clickToRegisterButton();
      Assertion.assertEqual(await registerPage.getPageUrl(), REGISTER_PAGE);
    });

    test(tc('Verify remember me function'), async ({ loginPage, homePage, context }) => {
      await loginPage.inputEmail(validAccountCredentials.email);
      await loginPage.inputPassword(validAccountCredentials.password);
      await loginPage.checkToCheckbox();
      await loginPage.clickToLoginButton();
      Assertion.assertContainsText(await homePage.getWelcomeTitle(), 'Welcome to our store');
      await homePage.closePage();
      //Assertion on new page - The account is remembered?
      const newPage = await context.newPage();
      const newHomePage = new HomePage(newPage);
      await newHomePage.openHomePage();
      Assertion.assertEqual(await newHomePage.getAccountName(), validAccountCredentials.email);
      await newPage.close();
    });

    test(tc('Verify when clicked on Forgot Password'), async ({ loginPage }) => {});
  }
);
test.afterEach(async ({ page }) => {
  await page.close();
});
