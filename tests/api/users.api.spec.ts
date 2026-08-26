import {test,expect} from '@playwright/test';

//header for authorization token (global variable) we can use this in all the api tests for authorization token
let AUTH_TOKEN = {'Authorization': 'Bearer 2bd9ee68aeeaa107b90e7fe0d549df929c04196d6ee696603a301f072f3cc6d6'};

//test('', async ({ page, request }) => {}// when we use web and api testing in the same test then we have to use page and request both in the test method. if we are using only api testing then we can use only request in the test method.
test('Get User Details test', async ({request }) => {
    
    //To test get method we have to pass the url https://gorest.co.in/public/v2/users/8577684 and authorization token in the request.get() method. we can also pass query params in the request.get() method. 
    let response = await request.get('https://gorest.co.in/public/v2/users/', { 
    headers: AUTH_TOKEN 
    });
    
    //console.log(response);
    let responseBody = await response.json();
    console.log('Response Body:', responseBody);//{id: 8577684, name: ''Mr. Suresh raina', email: 'abc@gmail.com so on....   
   
    console.log('Response Status Code:', response.status());//200
    console.log('Response Status Text:', response.statusText());//OK
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');

})


test('create user test', async({request}) => {

    let userData = {
        "name": "John Doe",
        "email": `automation${Date.now()}@example.com`,
        "gender": "male",
        "status": "active",
        "age": 30,
        "address": "123 Main St, Anytown, USA"
    };

    let response= await request.post('https://gorest.co.in/public/v2/users/',{
        headers:AUTH_TOKEN,
        data: userData
    });

    let responseBody= await response.json();
    console.log('Response Body:', responseBody);//body
    console.log('Response Status Code:', response.status());//201
    console.log('Response Status Text:', response.statusText());//Created
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe('Created');
})

//it will fail bcz of not existing userid
test('update user test', async({request}) => {
    //js object
    let userData = {
        "name": "John Doe",
        "email": `automation${Date.now()}@example.com`,
        "gender": "male",
        "status": "inactive",
        "age": 30,
        "address": "123 Main St, Anytown, USA"
    };
    
    //js object to json object conversion :serialization
    //It is done automatically by playwright api request method. we don't need to convert it manually. we can directly pass the js object in the data parameter .  
    let response= await request.put('https://gorest.co.in/public/v2/users/8593724',{
        headers:AUTH_TOKEN,
        data: userData
    });

    let responseJsonBody= await response.json();
    console.log('Response Body:', responseJsonBody);//body
    console.log('Response Status Code:', response.status());//200
    console.log('Response Status Text:', response.statusText());//OK
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
})

//it will fail bcz of not existing userid
test.skip('delete user test', async({request}) => {
    
    let response= await request.delete('https://gorest.co.in/public/v2/users/8593720',{
        headers:AUTH_TOKEN
    });

    console.log('Response Status Code:', response.status());//204
    console.log('Response Status Text:', response.statusText());//No Content
    expect(response.status()).toBe(204);
    expect(response.statusText()).toBe('No Content');
})