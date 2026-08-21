import {test , expect} from '../../src/fixtures/apiFixtures'; //importing the test object from apiFixtures.ts file which is extended to baseTest object of playwright. So that we can use our custom fixtures in the test.

const tokenResponse = await bookingApiHelper.post(
    "/auth",
    {
        username: "admin",
        password: "password123"
    },
    {
        "Content-Type": "application/json"
    }
);

const token = tokenResponse.responseBody.token;

console.log("TOKEN:", token);


const HEADER= {
  "Content-Type": "application/json",
  "Cookie": `token=${token}`
};

//const AUTH_HEADER= {Authorization:`Bearer ${TOKEN}`}; //creating the headers object with Authorization key and Bearer token value

//helper - generic function (create a user)
//Command to run the all test parallel npx playwright test tests/api/users.api.indiv.spec.ts 

async function createUser(bookingApiHelper:any) {
    
          let userData = {
              "firstname" : "Jima",
              "lastname" : "Browna",
              "totalprice" : 1140,
              "depositpaid" : true,
              "bookingdates" : {
                  "checkin" : "2026-09-09",
                  "checkout" : "2026-09-09"
              },
              "additionalneeds" : "Breakfast"
          };
    
          let response= await bookingApiHelper.post('/booking', userData , HEADER);
          expect(response.status).toBe(200); //verifying the status code of the response
          return response.responseBody;      
}
//Test1: Create a user test and verify: AAA( Arrange, Act, Assert)
//POST---> USERID--->GET/USERID ---> VERIFY

test('POST - Create a user test', async ({bookingApiHelper})=>{

  //create a user:
  let userResponse = await createUser(bookingApiHelper);

  //get the user:
  let response= await bookingApiHelper.get(`/booking/${userResponse.bookingid}` , HEADER);
  expect(response.status).toBe(200);
  expect(response.responseBody.firstname).toBe('Jim');  
  console.log(response.responseBody);

})

       //add a token in cookie 
//Test2: update a user test and verify: AAA( Arrange, Act, Assert)
//POST---> USERID--->PUT-->GET/USERID ---> VERIFY
test('PUT - Update a user test', async ({bookingApiHelper})=>{

  //create a user:
  let userResponse = await createUser(bookingApiHelper);
  
  let userUpdatedData = {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
  };

  //update the user:
  let response= await bookingApiHelper.put(`/booking/${userResponse.bookingid}` ,userUpdatedData , HEADER);
  expect(response.status).toBe(200);
  //expect(response.responseBody.totalprice).toBe(userUpdatedData.totalprice);
  //expect(response.responseBody.lastname).toBe(userUpdatedData.lastname);

  //get the user:
  let getresponse= await bookingApiHelper.get(`/booking/${userResponse.bookingid}` , HEADER);
  
  expect(getresponse.status).toBe(200);
  //expect(getresponse.responseBody.totalprice).toBe(userUpdatedData.totalprice);
  //expect(getresponse.responseBody.lastname).toBe(userUpdatedData.lastname);

})

//9c90a89760c8df5