import {test, expect} from '../src/fixtures/pageFixtures';

//without login we cant goto home page thats why we goto login page 1st.
test.beforeEach(async({loginPage})=>{
    await loginPage.goTologinPage();
    await loginPage.doLogin('pwtestbatch@open.com' , 'pw123');
});

test('homepage title test', async({homePage})=>{ 
const pageTitle= await homePage.getHomePageTitle();
console.log('home page title:',pageTitle); //home page title: My Account
expect(pageTitle).toBe('My Account');
})

test('homepage logout link exist test', async({homePage})=>{
expect(await homePage.islogoutLinkExist()).toBeTruthy();
})


test('homepage headers exist test', async({homePage})=>{
let  allheaders= await homePage.getHomePageHeaders(); //
console.log('Homepage headers', allheaders);
expect.soft(allheaders).toHaveLength(4); 
expect.soft(allheaders).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter'])

})

/* if we want to run june sprint

test('homepage headers exist test @junesprint', async({homePage})=>{

})

npx playwright test --grep @junesprint */