
import { test, expect } from '@playwright/test';
import { request } from 'http';
import { beforeEach } from 'node:test';


let OAUTH_CONFIG = {
    tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}

let accessToken: string;
//before each will run this test before every test
test.beforeEach('POST -- generate the access token', async ({ request }) => {
    //post always give promise and here we store data in the x-www-form-urlencoded of key value pair thats why we create object and pass in form
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    });

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    accessToken = jsonResponse.access_token;// we store access_token from response to accessToken variable
});


test('GET -- get location data', async ({ request }) => {

    //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
    let baseURL = 'https://test.api.amadeus.com';
    let endPoint = '/v1/reference-data/locations';

    //after ? we have key value pair that is called query params
    let queryParams = {
        subType: 'CITY,AIRPORT',
        keyword: 'MUC',
        countryCode: 'DE'
    }

    let locationResponse = await request.get(`$baseURL$endPoint`, {

        headers: {
            Authorization: `Bearer${accessToken}`
        },
        params: queryParams

    });
    expect(locationResponse.status()).toBe(200);
    console.log(await locationResponse.json());

    let locationJson = await locationResponse.json();
    console.log(locationJson.meta.count);//2

    let location1 = locationJson.data[0];
    console.log(location1);


    let locationId = locationJson.data[0].id;
    console.log(locationId);
})



//verify more data 
//we can use with csv helper also create for loop and pass data from csv file
