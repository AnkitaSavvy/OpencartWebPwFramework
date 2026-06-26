import { test , expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
//only 1 hard assert 

let loginPage:LoginPage; //type LoginPage

test.beforeEach(async({page})=>{ //common things we write in beforeeach which will run before every test
loginPage = new LoginPage(page);
await loginPage.goTologinPage();
})

test('login page title test', async()=>{
const pageTitle= await loginPage.getloginPageTitle();
console.log('Login page Title: ', pageTitle);
expect(pageTitle).toBe('Account Login');

})

test('forgot pwd link exist test', async()=>{
expect(await loginPage.isForgotPasswordLinkExist()).toBeTruthy();

})

test('user is able to login to app test', async()=>{
await loginPage.doLogin('pwtestbatch@open.com' , 'pw123');

})