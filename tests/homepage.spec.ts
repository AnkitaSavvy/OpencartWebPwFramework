import { test , expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { log } from "node:console";

let loginPage:LoginPage; //global
let homePage:HomePage;  //global

//without login we cant goto home page thats why we goto login page 1st.
test.beforeEach(async({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.goTologinPage();
    await loginPage.doLogin('pwtestbatch@open.com' , 'pw123');
    homePage= new HomePage(page);
});

test('homepage title test', async()=>{ //no need destructuring bcz already did in beforeeach ()
const pageTitle= await homePage.getHomePageTitle();
console.log('home page title:',pageTitle); //home page title: My Account
expect(pageTitle).toBe('My Account');
})

test('homepage logout link exist test', async()=>{
expect(await homePage.islogoutLinkExist()).toBeTruthy();
})


test('homepage headers test', async()=>{
let  allheaders= await homePage.getHomePageHeaders(); //
console.log('Homepage headers', allheaders);
expect.soft(allheaders).toHaveLength(4); 
expect.soft(allheaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter'])

})