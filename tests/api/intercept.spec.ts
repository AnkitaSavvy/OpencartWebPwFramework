import {test, expect} from '@playwright/test';

//intercept the Network calls and log them for check error or any details

/* Mock API responses — test UI without calling the real backend.
Block resources — images, fonts, or ads to make tests faster.
Test error scenarios — simulate 401, 404, or 500 responses.
Modify requests — change headers, URL, method, or post data.
Avoid external dependencies — make tests more stable and predictable.*/

//** = Wildcard matched all the URLs. 

//Here we destructure the page because we are using a web application. 
test('@regression intercept and log Requests', async({page})=>{
    
    //It is capturing all the data because we are using a wildcard here. If we use png or jpg, then it will fetch that data. 
    //Activate the routing. 
    await page.route('**/*', async(route)=>{ //only for **/*.png , **/*.{png,jpg,jpeg}
      console.log(route.request().method(), route.request().url());//method & URL
    await route.continue();//URL1: capture and continue------  URL2: capture and continue---
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

})

//intercept with mocking
//Mocking: fake data/response 
//Suppose we are using any web application and using ICICI bank payment so So the bank server will not give any data. How will we test integration testing? 
//We have to replicate the banks Server Through my Automation //Bank server detail it will provide on production, but we have to test on a stage or queue environment, so then what do we have to do? 
//So we create a mock server. 

/* Why use mocking?
Test without a real backend.
Test error responses like 401, 404, or 500.
Make tests faster.
Make tests more stable and predictable.
Test edge cases that are difficult to reproduce with real data.  */ 

test('@smoke mock search data api', async({page})=>{

  let fakeProducts = [{name:'Fake mackbook pro', price:'$5034'},
                      {name:'Fake iphone 20', price:'$4044'}];

  await page.route('**/index.php?route=product/search&search=macbook', (route)=>{ //Route is an arrow anonymous function that works like a callback function. 
   route.fulfill({
    status: 200,        //Dummy Behaviour 
    contentType: 'application/json ',
    body: JSON.stringify(fakeProducts)}//`JSON.stringify` method is used to convert the data into the JSON form. 
    )
  })
 await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
 //Capture of fake data 
 let fakeJson= await page.evaluate(async()=>{
    let fakeRes= await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');//node js method
    return await fakeRes.json();
 })
 console.log('Fake JSON response:',fakeJson); //Printing fake responses 
 
 await page.pause();
})



//with html data
test.skip('mock search page with fake HTML', async ({ page }) => {

    await page.route('**/index.php?route=product/search&search=macbook', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: `
                <html>
                <body>
                    <h1>Search Results</h1>
                    <div class="product-layout">
                        <h4><a href="#">Fake MacBook Pro</a></h4>
                        <p class="price">$599</p>
                    </div>
                    <div class="product-layout">
                        <h4><a href="#">Fake iPhone 20</a></h4>
                        <p class="price">$999</p>
                    </div>
                </body>
                </html>
            `,
        });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');

    // now assert on the fake HTML
    const heading = await page.textContent('h1');
    expect(heading).toBe('Search Results');

    const products = await page.locator('.product-layout h4').allTextContents();
    expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);

    const prices = await page.locator('.price').allTextContents();
    expect(prices).toEqual(["$599", "$999"]);
});


//for practice API testing
//https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth 
//https://thinking-tester-contact-list.herokuapp.com/