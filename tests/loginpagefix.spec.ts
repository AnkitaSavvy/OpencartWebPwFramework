import {test, expect} from '../src/fixtures/pageFixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

//only 1 hard assert 



test.beforeEach(async({loginPage})=>{ //common things we write in beforeeach which will run before every test
await loginPage.goTologinPage(); //Option + Click ➜ direct method definition pe jump.
})

test('login page title test', async({loginPage})=>{
const pageTitle= await loginPage.getloginPageTitle();
console.log('Login page Title: ', pageTitle);
expect(pageTitle).toBe('Account Login');
})

test('forgot pwd link exist test', async({loginPage})=>{
expect(await loginPage.isForgotPasswordLinkExist()).toBeTruthy();
})

test('user is able to login to app test', async({loginPage,homePage})=>{
//await loginPage.doLogin('pwtestbatch@open.com' , 'pw1234');
await loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!);//! null check if the username or password not available
expect.soft(await homePage.islogoutLinkExist()).toBeTruthy();
expect.soft(await homePage.getHomePageTitle()).toBe('My Account');

})


///DO 1 DRAWBACK :issue with testdata fixture 
// bcz sequence mode-- 1 test running with test data 1 by 1
//what if we have 10+ rows data we should run in parallel to save time
//lengthy report but we want seperate test method 
//1 browser with multiple user cred. then it will crash
test('login to app using wrong credentials with Data driven approach test', async({loginPage,testData})=>{
  for(let row of testData){
   await loginPage.doLogin(row.username, row.password);
   expect(await loginPage.IsinvalidLoginErrorDisplayed()).toBeTruthy();
  }

})

//DO 2 without fixture, parallel mode, read csv data directlyand loop the test method row wise
let testData = CsvHelper.readCsv('src/data/loginData.csv');

    for(let row of testData){
            test(`Invalid login test with ${row.username}- ${row.password}`, async({loginPage})=>{ //test name :Invalid login test with invalid@open.com- wrong123
                // run in 3 browser parallel
            await loginPage.doLogin(row.username, row.password);
            expect(await loginPage.IsinvalidLoginErrorDisplayed()).toBeTruthy();
            });
        }

//Assignment do the registration page without testdata fixtures

