import { Page } from "@playwright/test";

export class BasePage{
    protected readonly page:Page; //within this class or child class can access
    constructor (page:Page){
      this.page= page;   // readonly page =  constructor (page)
    }
}