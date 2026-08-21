import {test as baseTest} from '@playwright/test';
import {ApiHelper} from '../api/ApiHelper';

//define the types for my API fixtures

type ApiFixtures={

    apiHelper: ApiHelper, //apiHelper = name of the fixture object and APIHelper= type of the fixture object which is a class
    bookingApiHelper:ApiHelper,
}

export let test= baseTest.extend<ApiFixtures>({    
         // GoRest API
        apiHelper: async({request}, use)=>{ //destructuring request and use is a function provided by playwright to provide the fixture object to the test. Without use(), the fixture will not be available inside the test.
        let apiHelper =new ApiHelper(request, process.env.API_BASE_URL!); //pass request and baseurl 
        await use(apiHelper);
        },


        // Restful Booker API
        bookingApiHelper: async ({ request }, use) => {
        let bookingApiHelper = new ApiHelper(request,process.env.BOOKING_BASE_URL!);
        await use(bookingApiHelper);
    }
    })

export {expect} from '@playwright/test';// exporting expect from playwright/test so that we can use it in our tests without importing it again and again.