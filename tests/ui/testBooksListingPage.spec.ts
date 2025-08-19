import { Role } from '../../auth.config';
import { test } from '../../fixture/tricentis-fixture';


const roles: Role[] = ['admin', 'user']
test.describe(
    'Books Listing Page',
    {
        tag : ['@ui', '@bookslistingpage']
    }, () => {
    test.describe.configure({mode: 'parallel'}); //2 roles in parallel
    
    for(const role of roles){
        test.describe(`as ${role}`, () => {
            test.use({ role })
            test('TC001 - Check UI', async ({ page }) => {
                
            })
            
            
        })
        

    }
    
})
