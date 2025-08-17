import { test } from '../../fixture/tricentis-fixture';
import { Assertion } from '../../utils/assertion';
import { invalidAccountCredentials, validAccountCredentials } from '../../data/login-test-data';
import { HomePage } from '../../pages/tricentis/homePage';
import { HOMEPAGE, REGISTER_PAGE } from '../../utils/constant';
import { headerLinksWhenNotLogin, headerTopMenu } from '../../data/header-data';

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
      await loginPage.isLoginPageUICaptured('Login-page.png');
    });
    
    test('TC002 - Verify behavior when clicked to Logo on Header', async ({ header }) => {
      await header.clickToLogo();
      Assertion.assertToHaveUrl(header.page, HOMEPAGE);
    });

    for (const headerLink of headerLinksWhenNotLogin) {
      test(`TC002 - Verify behavior when clicked to ${headerLink.nameLink} on Header`, async ({
        header,
      }) => {
        await header.clickToHeaderLink(headerLink.nameLink);
        Assertion.assertToHaveUrl(header.page, headerLink.url);
      });
    }
    test('TC002 - Verify behavior when searching', async ({ header }) => {
      let data = 'mobile';
      await header.inputIntoSearchbox(data);
      await header.clickToSearchButton();
      Assertion.assertContainsText(await header.getCurrentUrl(), data);
    });

    for (const itemInTopMenu of headerTopMenu) {
      test(`TC002 - Verify behavior when clicked to ${itemInTopMenu.itemName} on Top Menu`, async ({
        header,
      }) => {
        await header.clickToTopMenu(itemInTopMenu.itemName);
        Assertion.assertToHaveUrl(header.page, itemInTopMenu.url);
      });
    }

    test('TC002 - Login successfully', async ({ loginPage, homePage }) => {
      await loginPage.inputEmail(validAccountCredentials.email);
      await loginPage.inputPassword(validAccountCredentials.password);
      await loginPage.clickToLoginButton();
      Assertion.assertEqual(await homePage.getCurrentUrl(), HOMEPAGE);
      Assertion.assertContainsText(await homePage.getWelcomeTitle(), 'Welcome to our store');
    });

    for (const invalidUser of invalidAccountCredentials) {
      test(`TC003 - Login unsuccessfully with ${invalidUser.nameCase}`, async ({ loginPage }) => {
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
    test('TC004 - Verify go to Register page', async ({ loginPage, registerPage }) => {
      await loginPage.clickToRegisterButton();
      Assertion.assertEqual(
        await registerPage.getPageUrl(),
        REGISTER_PAGE
      );
    });
    test('TC005 - Verify remember me function', async ({ loginPage, homePage, context }) => {
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
      console.log(await newHomePage.getAccountName() + "Huyen is checking")
      await newPage.close();
    });
    test('TC006 - Verify when clicked on Forgot Password', async ({ page }) => {});
  }
);
test.afterEach(async ({ page }) => {
  await page.close();
});
