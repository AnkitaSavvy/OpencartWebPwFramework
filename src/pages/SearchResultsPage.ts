import { Locator,Page } from "@playwright/test";
import {BasePage} from './BasePage';


export class SearchResultsPage extends BasePage{
//private locators:
private readonly searchResults:Locator;

constructor(page:Page){
    super(page);
    this.searchResults= page.locator('div.product-layout');
};

//all the actions we should create in the page:
async getProductSearchResultCount():Promise<number>{
     return await this.searchResults.count();
}

async selectProduct(productName:string):Promise<void>{
     await this.page.getByRole('link',{name:productName , exact:true}).first().click();
}


}