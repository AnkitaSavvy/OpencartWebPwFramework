import {APIRequestContext} from '@playwright/test';


export class ApiHelper{


private readonly request:APIRequestContext; //APIRequestContext is a class provided by playwright to make API requests,It is provided by playwright test runner.
private readonly baseUrl:string;

constructor(request:APIRequestContext, baseUrl:string){
    this.request=request;
    this.baseUrl=baseUrl;
}

//GET
async get(endpoint:string, headers?:Record<string,string>){ //endpoint is APIendpoint, headers is optional parameter, Record<string,string> is a kind of type provided by typescript to define an object with string keys and values
 
    let response = await this.request.get(`${this.baseUrl}${endpoint}`,{
        headers:headers
    });
    return {
        status:response.status(), //returning an object with status and responseBody
        responseBody: await response.json(),
        statusText: response.statusText() //returning the status text of the response
    }; 
}


//POST
async post(endpoint:string, requestBody:object, requestHeaders?:Record<string,string>){ //endpoint= APIendpoint, data=body, headers is optional parameter, Record<string,string> is a kind of type provided by typescript to define an object with string keys and values
 
    let response = await this.request.post(`${this.baseUrl}${endpoint}`,{
        data:requestBody, //data is Playwright's expected property name
        headers:requestHeaders
        
    });
    return {
        status:response.status(), //returning an object with status and responseBody
        responseBody: await response.json(),
        statusText: response.statusText()
    }; 
}

//PUT
async put(endpoint:string ,requestBody:object, headers?:Record<string,string>){ //endpoint is APIendpoint, headers is optional parameter, Record<string,string> is a kind of type provided by typescript to define an object with string keys and values
 
    let response = await this.request.put(`${this.baseUrl}${endpoint}`,{
        data:requestBody,
        headers:headers
    });
    return {
        status:response.status(), //returning an object with status and responseBody
        responseBody: await response.json(),
        statusText: response.statusText()
    }; 
}


//PATCH
async patch(endpoint:string ,requestBody:object, headers?:Record<string,string>){ //endpoint is APIendpoint, headers is optional parameter, Record<string,string> is a kind of type provided by typescript to define an object with string keys and values
 
    let response = await this.request.put(`${this.baseUrl}${endpoint}`,{
        data:requestBody,
        headers:headers
    });
    return {
        status:response.status(), //returning an object with status and responseBody
        responseBody: await response.json(),
        statusText: response.statusText()
    }; 
}


//DELETE
async delete(endpoint:string, headers?:Record<string,string>){ //endpoint is APIendpoint, headers is optional parameter, Record<string,string> is a kind of type provided by typescript to define an object with string keys and values
 
    let response = await this.request.delete(`${this.baseUrl}${endpoint}`,{
        headers:headers
    });
    return {
        status:response.status(), //returning an object with status and responseBody
        statusText: response.statusText()
    }; 
}












}