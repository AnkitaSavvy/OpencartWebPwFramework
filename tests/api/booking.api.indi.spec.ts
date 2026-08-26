import { test, expect } from '../../src/fixtures/apiFixtures';

let HEADER: any;

test.beforeEach(async ({ bookingApiHelper }) => {

  const tokenResponse = await bookingApiHelper.post(
    '/auth',
    {
      username: 'admin',
      password: 'password123'
    },
    {
      'Content-Type': 'application/json'
    }
  );

  const token = tokenResponse.responseBody.token;

  console.log('TOKEN:', token);

  HEADER = {
    'Content-Type': 'application/json',
    'Cookie': `token=${token}`
  };
});


// Helper function
async function createUser(bookingApiHelper: any) {

  const userData = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 1140,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-09-09',
      checkout: '2026-09-10'
    },
    additionalneeds: 'Breakfast'
  };

  const response = await bookingApiHelper.post(
    '/booking',
    userData,
    HEADER
  );

  expect(response.status).toBe(200);

  return response.responseBody;
}


// Test 1
test('POST - Create a user test', async ({ bookingApiHelper }) => {

  const userResponse = await createUser(bookingApiHelper);

  const response = await bookingApiHelper.get(
    `/booking/${userResponse.bookingid}`,
    HEADER
  );

  expect(response.status).toBe(200);
  expect(response.responseBody.firstname).toBe('Jim');

  console.log(response.responseBody);
});


// Test 2
test('PUT - Update a user test', async ({ bookingApiHelper }) => {

  const userResponse = await createUser(bookingApiHelper);

  const userUpdatedData = {
    firstname: 'Jimaa',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01'
    },
    additionalneeds: 'Breakfast'
  };

  // Update
  const response = await bookingApiHelper.put(
    `/booking/${userResponse.bookingid}`,
    userUpdatedData,
    HEADER
  );

  expect(response.status).toBe(200);

  // Get updated user
  const getResponse = await bookingApiHelper.get(
    `/booking/${userResponse.bookingid}`,
    HEADER
  );

  expect(getResponse.status).toBe(200);
  expect(getResponse.responseBody.firstname)
    .toBe(userUpdatedData.firstname);

  expect(getResponse.responseBody.totalprice)
    .toBe(userUpdatedData.totalprice);
});