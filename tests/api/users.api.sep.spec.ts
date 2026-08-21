import {test , expect} from '../../src/fixtures/apiFixtures'; //importing the test object from apiFixtures.ts file which is extended to baseTest object of playwright. So that we can use our custom fixtures in the test.

const TOKEN= process.env.API_TOKEN!; //getting the API token from the .env.qa file
const AUTH_HEADER= {Authorization:`Bearer ${TOKEN}`}; //creating the headers object with Authorization key and Bearer token value

let userId: number; //declaring a variable to store the id of the created user. It is declared outside the test so that it can be used in other tests as well.

//describe block is used to group the related tests together. It is optional but it helps to organize the tests and make them more readable.
//describe.serial() is used to run the tests in sequential mode. It is used here because the post test is related to put test bcz we need to create a user first and then update the same user. So we are using the userId of the created user in the put test.
test.describe.serial('API Tests for User Management',()=>{ 



   test('Verify the GET API to fetch all users', async ({apiHelper})=>{ 

      let response= await apiHelper.get('/public/v2/users', AUTH_HEADER);
      expect(response.status).toBe(200); //verifying the status code of the response
      console.log('Response Status:', response.status); //printing the status code in the console

      expect(response.responseBody.length).toBeGreaterThan(0); //verifying the response body is not empty
      console.log('Response Body:', response.responseBody); //printing the response body in the console  

      expect(response.statusText).toBe('OK'); //verifying the status line of the response
      console.log('Response Status Text:', response.statusText); //printing the status line of the response in the console


   });

   test('Verify the POST API to create a new user', async ({apiHelper})=>{ 

      let userData = {
         "name": "API Automation User",
         "email": `automation${Date.now()}@example.com`,
         "gender": "male",
         "status": "active"
      };

      let response= await apiHelper.post('/public/v2/users', userData , AUTH_HEADER);
      expect(response.status).toBe(201); //verifying the status code of the response
      console.log('Response Status:', response.status); //printing the status code in the console
      
      userId= response.responseBody.id; //getting the id of the created user from the response body
      console.log('Created User ID:', userId); //printing the id of the created user in the console


      expect(response.responseBody.name).toBe(userData.name); //verifying the response body is same as the request body
      expect(response.responseBody.email).toBe(userData.email);
      expect(response.responseBody.gender).toBe(userData.gender);
      expect(response.responseBody.status).toBe(userData.status);
      expect(response.statusText).toBe('Created'); //verifying the status line of the response
      console.log('Response Status Text:', response.statusText);
   });

   test('Verify the PUT API to update a user', async ({apiHelper})=>{ 

      let userUpdatedData = {
         "name": "API Automation User",
         "gender": "female",
      };

      let response= await apiHelper.put(`/public/v2/users/${userId}`, userUpdatedData , AUTH_HEADER);
      expect(response.status).toBe(200); //verifying the status code of the response
      console.log('Response Status:', response.status); //printing the status code in the console
      
      expect(response.responseBody.name).toBe(userUpdatedData.name); //verifying the response body is same as the request body
      expect(response.responseBody.gender).toBe(userUpdatedData.gender);
      expect(response.statusText).toBe('OK'); //verifying the status line of the response
      console.log('Response Status Text:', response.statusText);
   
   });

   test('Verify the DELETE API to update a user', async ({apiHelper})=>{ 

      let response= await apiHelper.delete(`/public/v2/users/${userId}` , AUTH_HEADER);
      expect(response.status).toBe(204); //verifying the status code of the response
      console.log('Response Status:', response.status); //printing the status code in the console
      expect(response.statusText).toBe('No Content'); //verifying the status line of the response
      console.log('Response Status Text:', response.statusText);
   
   });

});