
import {test, expect} from '../src/fixtures/pageFixtures';
import { RegisterPage } from '../src/pages/RegisterPage';
import { CsvHelper } from '../src/utils/CsvHelper';




test.beforeEach(async({registerPage})=>{ //common things we write in beforeeach which will run before every test
await registerPage.goToRegisterPage(); //Option + Click ➜ direct method definition pe jump.
})

test('register page title test', async({registerPage})=>{
const pageTitle= await registerPage.getRegisterPageTitle();
console.log('Login page Title: ', pageTitle);
expect(pageTitle).toBe('Register Account');
})


let registerTestData = CsvHelper.readCsv('src/data/registrationData.csv');

    for(let row of registerTestData){
            test(`User is able to register test ${row.FirstName}`, async({registerPage})=>{ 
                // run in 3 browser parallel.  
            await registerPage.doRegister(row.FirstName, row.LastName,row.EMail, row.Telephone, row.Password,row.confirmPassword, row.Subscribe);
            
            });
        }
