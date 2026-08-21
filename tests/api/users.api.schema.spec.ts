
//schema : type of response data
//P ---> C

//playwright have not inbuild schema validation so we have to install ajv
//ajv --> node lib for the schema validation
//npm install ajv
import { test, expect } from '../../src/fixtures/apiFixtures';
import Ajv from 'ajv';
import { ApiHelper } from '../../src/api/ApiHelper';

let token = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${token}` };



//setup the Ajv
let ajv = new Ajv();

//we can also take this schema in any ts file and export here 
//define the schema
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

let userArraySchema= {
      "type": "array",
      "items": userSchema
}

//we can use apiHelper(fixture) or request
test('Get-- get a user', async ({ apiHelper }) => {

    let userData = {
        "name": "API Automation User",
        "email": `automation${Date.now()}@example.com`,
        "gender": "male",
        "status": "active"
    };

    //Post --create a user
    let createResponse = await apiHelper.post("/public/v2/users", userData, AUTH_HEADER);
    let userId = createResponse.responseBody.id;

    //Get---get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //Schema validation code:
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getUserResponse.responseBody);

    if (!isSchemaValid) {
        console.log("Schema validation failed:", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

})

test('Get--- get all the users', async({apiHelper})=>{

    //Get---get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //Schema validation code:
    let validate = ajv.compile(userArraySchema);
    let isArraySchemaValid = validate(getUserResponse.responseBody);

    if (!isArraySchemaValid) {
        console.log("Schema validation failed:", validate.errors);
    }

    expect(isArraySchemaValid).toBeTruthy();
})
