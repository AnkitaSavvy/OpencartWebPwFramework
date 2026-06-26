//Custom fixtures are created to avoid repetitive object creation, centralize setup logic, improve reusability, reduce code duplication, and make tests cleaner and maintainable.


import {test as baseTest} from '@playwright/test'; //we are not using inbuilt test runner we create replica as basetest bcz in inbuilt only 4 fixtures we have page, browser, request , expect
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import {RegisterPage} from '../pages/RegisterPage';
import { readFile } from 'fs';
import { CsvHelper } from '../utils/CsvHelper';
import { SearchResultsPage } from '../pages/SearchResultsPage';

// pagefixtures is custom type like string type or number , student 
//Ab hum apne fixtures create karna chahte hain: Isliye custom test bana rahe hain.
type pageFixtures={        //MyFixtures name could be anything
    loginPage: LoginPage,  //Mere custom fixtures me 2 objects honge:Aur unka type hoga:LoginPage class ,HomePage class
    homePage:HomePage,
    registerPage:RegisterPage,
    searchResultsPage:SearchResultsPage,
    testData:Record<string,string>[]
};


//Existing test me mere custom fixtures add karo.
export let test= baseTest.extend<pageFixtures>({    //MyFixtures //Playwright ke test object ke andar ek method hoti hai:test.extend() like page.click()
        loginPage: async({page}, use)=>{
        let loginPage =new LoginPage(page);
        await use(loginPage);
        },
      
        homePage: async({page}, use)=>{  //instead of use name could be anything like provideFixture  
        let homePage = new HomePage(page);
        await use(homePage);//here use is fnc used to provide the created homepage fixture object to the test. Without use(), the fixture will not be available inside the test.
    
        },
        
        registerPage: async({page}, use)=>{  //instead of use name could be anything like provideFixture  
        let registerPage = new RegisterPage(page);
        await use(registerPage);//here use is fnc used to provide the created registerPage fixture object to the test. Without use(), the fixture will not be available inside the test.
    
        },
        
        searchResultsPage: async({page}, use)=>{  //instead of use name could be anything like provideFixture  
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);//here use is fnc used to provide the created registerPage fixture object to the test. Without use(), the fixture will not be available inside the test.
    
        },

        testData: async({},use)=>{
        let testData = CsvHelper.readCsv('src/data/loginData.csv');//imported CsvHelper class 
        await use(testData);
        }
})


export {expect} from '@playwright/test';



/* Playwright ka original test:

test
Already fixtures rakhta hai: Bag(page,browser,context,request)
Ab tum bol rahi ho: Existing test me aur fixtures add kar do.
baseTest.extend({
   loginPage,
   homePage
})
Bag ban gaya:
 ├─ page
 ├─ browser
 ├─ context
 ├─ loginPage
 └─ homePage */


/* Kitchen (fixture)
    ↓
Food banaya (loginPage object)
    ↓
use() = customer ko serve karo
Without use:Food kitchen me hi reh gaya 😄 */


/* Same code repeat ho raha hai:
const loginPage = new LoginPage(page);
await loginPage.goToLoginPage();
await loginPage.doLogin(...); 
Again and again.

✅ Solution = Custom Fixture
Ek hi jagah likho:
loginPage: async ({ page }, use) => {
   const loginPage = new LoginPage(page);
   await use(loginPage);
} */

/* without fixture:
50 tests
↓
50 times object creation

with fixture:
1 fixture
↓
used everywhere */

/* Suppose login URL change ho gayi. Without fixture:50 files update */