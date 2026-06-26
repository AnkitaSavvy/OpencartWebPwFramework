//import {BasePage}  from "./BasePage";

import { Locator , Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { promises } from "node:dns";

export class HomePage extends BasePage { //export  =  Bahar use karna hai
    //private locators:
    private readonly LogoutLink: Locator; //private access modifier bcz of encapsulation and readonly bcz noone can change the locator
    private readonly headers: Locator;
    private readonly searchBox:Locator;
    private readonly searchIcon:Locator;


//const of the class:init the locators
constructor(page:Page){ //constructor should be public so that we can use it 
 super(page) //call the parent class constructor
 this.LogoutLink= page.getByRole('link', {name:'Logout'});
 this.headers= page.getByRole('heading', {level:2});
 this.searchBox= page.getByRole('textbox', {name:'Search'});
 this.searchIcon= page.locator('div#search button');
}

//public page actions(method)/behaviour
async getHomePageTitle():Promise<string>{
    return await this.page.title();
}

async islogoutLinkExist():Promise<boolean>{
    return await this.LogoutLink.isVisible();
}

async getHomePageHeaders():Promise<string[]>{
    return await this.headers.allInnerTexts();
}

async doSearch(searchKey:string):Promise<void>{
    console.log(`search Key: ${searchKey}`);
    await this.searchBox.fill(searchKey);
    await this.searchIcon.click();
    
}






}
