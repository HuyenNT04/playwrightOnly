import { footerLinks } from '../../data/footer-data';
import { test } from '../../fixture/tricentis-fixture';
import { Assertion } from '../../utils/assertion';
import { makeCounter} from '../../utils/helperFunctions';


test.beforeEach(async ({ homePage }) => {
    await homePage.navigateTo('/');
})

export const tc = makeCounter(1);
test.describe(
    'Homepage',
    {
        tag : ['@ui', '@homepage']
    }, () => {
    test.use({ role: 'admin' })
    test(tc('Verify UI'), async ({ header, homePage, footer }) => {
        await header.isHeaderUICaptured('Homepage-Header.png')
        // await homePage.isCategoriesBlockCaptured('Home-page.png');
        // await homePage.isManifacturersBlockCaptured('Home-page.png');
        // await homePage.isPopularTagsCaptured('Home-page.png');
        await footer.isFooterCaptured('Homepage-Footer.png');
    })
    for(const footerLink of footerLinks){
        test(tc(`Verify behavior when clicked to ${footerLink.itemName} in Footer`), async ({ homePage, footer }) => {
            await footer.clickToHyperLink(footerLink.columnName, footerLink.itemName);
            Assertion.assertToHaveUrl(footer.page, footerLink.url);
        });
    }
    test(tc('Verify the banner changes every 3 seconds'), async ({ homePage }) => {
        
    })
    test(tc('Verify user can click on a product'), async ({ homePage }) => {
        
    })
    test(tc('Verify user can click on a Category in Categories leftmenu'), async ({ homePage }) => {
        
    })
    test(tc('Verify user can click on a Tag in Popular Tags leftmenu'), async ({ homePage }) => {
        
    })
    test(tc('Verify user can sign up for the newletters rightmenu'), async ({ homePage }) => {
        
    })
    test(tc('Verify user can vote on rightmenu'), async ({ homePage }) => {
        
    })
    test(tc('Verify that user can see and click on recent products'), async ({ homePage }) => {
        
    })
    test(tc('Verify that user can not see recent products block when user has not seen any products yet'), async ({ homePage }) => {
        //*Special flow case */
    })

    
    
    
})
