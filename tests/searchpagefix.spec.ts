import {test, expect} from '../src/fixtures/pageFixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginPage})=>{
    await loginPage.goTologinPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

const productData= CsvHelper.readCsv('src/data/product.csv');

for(let row of productData){
test(`verify search results count -${row.searchkey}- ${row.productname}`,async({homePage ,searchResultsPage})=>{
 await homePage.doSearch(row.searchkey);
 expect (await searchResultsPage.getProductSearchResultCount()).toBe(Number(row.resultcount));//convert string to number
})
};

for(let row of productData){
test(`verify user is able to land on the product page ${row.productname}`,async({homePage ,searchResultsPage, page})=>{
 await homePage.doSearch(row.searchkey);
 await searchResultsPage.selectProduct(row.productname);
 expect(await page.title()).toBe(row.productname);
})
};

//manual data
/* test('verify search results count',async({homePage ,searchResultsPage})=>{
 await homePage.doSearch('macbook');
 expect (await searchResultsPage.getProductSearchResultCount()).toBe(3);
})

test('verify user is able to land on the product page',async({homePage ,searchResultsPage, page})=>{
 await homePage.doSearch('macbook');
 await searchResultsPage.selectProduct('MacBook Pro');
 expect(await page.title()).toBe('MacBook Pro');
 
}) */


 //Assignment - create register page with json, excel
 //we can create common.spec.ts file and call it whereever we need