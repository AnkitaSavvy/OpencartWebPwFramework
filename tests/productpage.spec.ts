import {test, expect} from '../src/fixtures/pageFixtures';
import { BasePage } from '../src/pages/BasePage';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';


test.beforeEach(async({loginPage})=>{
    await loginPage.goTologinPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

//common tests for all the pages 
test('verify Logo exists on the productPage',async({basePage})=>{ //basePage fixture is available in the test because we have created it in the pageFixtures.ts file and extended it to the baseTest object
 expect(await basePage.isLogoVisible()).toBe(true);
});

test('verify footer exists on the productPage',async({basePage})=>{ //basePage fixture is available in the test because we have created it in the pageFixtures.ts file and extended it to the baseTest object
    console.log(await basePage.getPageFooters()); //get all the footer links text and print in the console
    expect(await basePage.getPageFooterLinksCount()).toBe(16);
});


 test('verify product images count',async({homePage ,searchResultsPage, productInfoPage})=>{
 await homePage.doSearch('macbook');
 await searchResultsPage.selectProduct('MacBook Pro');
 let imageCount=  await productInfoPage.getProductImagesCount();
 console.log('Total Images Count:' + imageCount);
 expect(imageCount).toBe(4);//actual vs expected(4) we can hardcode expected value only bcz in csv file also hardcoded 
 });

//single test with multiple assertions: thats why we are using soft assertions here. 
// If one assertion fails, the other assertions will still be executed.
test('verify product Information/Data',async({homePage ,searchResultsPage, productInfoPage})=>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualproductInfoMap=  await productInfoPage.getProductInfo();
    console.log('Actual product Details:' , actualproductInfoMap);
    expect.soft (actualproductInfoMap.get('productHeader')).toBe('MacBook Pro');
    expect.soft (actualproductInfoMap.get('productImages')).toBe(4);
    expect.soft (actualproductInfoMap.get('Brand')).toBe('Apple');
    expect.soft (actualproductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft (actualproductInfoMap.get('Reward Points')).toBe('800');
    expect.soft (actualproductInfoMap.get('Availability')).toBe('Out Of Stock');
    expect.soft (actualproductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft (actualproductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

});
/* Assignment: create a test case to verify the product information/data with csv data provider 
and data driven approach. search key ,product name ,and what actually u want to verify like product header, images count, brand, product code, reward points, 
availability, product price, ex tax price etc.
try to create 2-3 rows for different products and parametrize the test case by data driven approach*/

/*Assignment2  add a quantity field in the product info page and create a method to enter the quantity 
and click on add to cart button and verify the success message "Success: You have added MacBook Pro to your shopping cart!"
with the product name and Click on the cart button or shopping cart link and it will new page cart.ts and verify the quantity added in the cart.
 */

/*Assignment 3: create test cases for the cart page and so on for the checkout page and 
complete the end to end flow of the application with data driven approach and with csv data provider.*/
