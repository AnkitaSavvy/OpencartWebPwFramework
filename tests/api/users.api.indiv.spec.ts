import {test , expect} from '../../src/fixtures/apiFixtures'; //importing the test object from apiFixtures.ts file which is extended to baseTest object of playwright. So that we can use our custom fixtures in the test.

const TOKEN= process.env.API_TOKEN!; //getting the API token from the .env.qa file
const AUTH_HEADER= {Authorization:`Bearer ${TOKEN}`}; //creating the headers object with Authorization key and Bearer token value

//helper - generic function (create a user)
//Command to run the all test parallel npx playwright test tests/api/users.api.indiv.spec.ts 
//for check report : npm run allure
async function createUser(apiHelper:any) {
    
          let userData = {
             "name": "API Automation User",
             "email": `automation${Date.now()}@example.com`,
             "gender": "male",
             "status": "active"
          };
    
          let response= await apiHelper.post('/public/v2/users', userData , AUTH_HEADER);
          expect(response.status).toBe(201); //verifying the status code of the response
          return response.responseBody;
        
}

//Test1: Create a user test and verify: AAA( Arrange, Act, Assert)
//POST---> USERID--->GET/USERID ---> VERIFY

test('POST - Create a user test', async ({apiHelper})=>{

  //create a user:
  let userResponse = await createUser(apiHelper);

  //get the user:
  let response= await apiHelper.get(`/public/v2/users/${userResponse.id}` , AUTH_HEADER);
  expect(response.status).toBe(200);
  expect(response.responseBody.name).toBe('API Automation User');

})


//Test2: update a user test and verify: AAA( Arrange, Act, Assert)
//POST---> USERID--->PUT-->GET/USERID ---> VERIFY
test('PUT - Update a user test', async ({apiHelper})=>{

  //create a user:
  let userResponse = await createUser(apiHelper);

  let userUpdatedData = {
         "name": "API Automation User updated",
         "gender": "female",
      };

  //update the user:
  let response= await apiHelper.put(`/public/v2/users/${userResponse.id}` ,userUpdatedData ,AUTH_HEADER);
  expect(response.status).toBe(200);
  expect(response.responseBody.name).toBe(userUpdatedData.name);
  expect(response.responseBody.gender).toBe(userUpdatedData.gender);

  //get the user:
  let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}` , AUTH_HEADER);
  expect(getresponse.status).toBe(200);
  expect(getresponse.responseBody.name).toBe(userUpdatedData.name);
  expect(getresponse.responseBody.gender).toBe(userUpdatedData.gender);

})

//Test3: delete a user test and verify: AAA( Arrange, Act, Assert)
//POST---> USERID--->DELETE-->GET/USERID ---> VERIFY
test('Delete - a user test', async ({apiHelper})=>{

  //create a user:
  let userResponse = await createUser(apiHelper);

  //delete the user:
  let response= await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
  expect(response.status).toBe(204);

   //get the user:
  let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}` , AUTH_HEADER);
  expect(getresponse.status).toBe(404);
  expect(getresponse.responseBody.message).toBe('Resource not found');
})

//Test4: update a user test and verify: AAA( Arrange, Act, Assert)
//POST---> USERID--->PUT-->GET/USERID ---> VERIFY
test('Patch - Update a user test', async ({apiHelper})=>{

  //create a user:
  let userResponse = await createUser(apiHelper);

  let userUpdatedData = {
        
         "gender": "male", //only one data update
      };

  //update the user:
  let response= await apiHelper.patch(`/public/v2/users/${userResponse.id}` ,userUpdatedData ,AUTH_HEADER);
  expect(response.status).toBe(200);
  expect(response.responseBody.gender).toBe(userUpdatedData.gender);

  //get the user:
  let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}` , AUTH_HEADER);
  expect(getresponse.status).toBe(200);
  expect(getresponse.responseBody.gender).toBe(userUpdatedData.gender);

})    






