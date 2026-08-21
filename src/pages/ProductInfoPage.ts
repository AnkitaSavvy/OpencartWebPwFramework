
import { Locator , Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { promises } from "node:dns";

export class ProductInfoPage extends BasePage { //export  =  we use outside of the class
    //private locators:
    private readonly productHeader: Locator; //private access modifier bcz of encapsulation and readonly bcz noone can change the locator
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map:Map<string,string|number>; //key,value



constructor(page:Page){ //constructor should be public so that we can use it 
   super(page) //call the parent class constructor
 this.productHeader = page.getByRole('heading', { level: 1});
 this.productImages= page.locator('div#content li img');
 this.productMetaData= page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
 this.productPricing= page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
 this.map = new Map<string,string|number>();
}

//public page actions(method)/behaviour
async getProductHeader():Promise<string>{
    return await this.productHeader.innerText();//text of header
}

async getProductImagesCount():Promise<number>{
//await this.page.waitForTimeout(4000); //wait for 4 sec
await this.productImages.first().waitFor({state:'visible'}); //wait for first image to be visible then count the images
 return await this.productImages.count();
}

// Brand: Apple
// Product Code: Product 16
// Reward Points: 600
// Availability: Out Of Stock 
private async getProductMetaData():Promise<void>{ //private , noone can access the method outside the class
  let metaData= await this.productMetaData.allInnerTexts();//return string[]
  for(let data of metaData){
        let meta= data.split(':');
        let metaKey= meta[0].trim();
        let metavalue= meta[1].trim(); //in objects we store key/value or Map in js (hashmap in java) 
        this.map.set(metaKey,metavalue);//use set method to set the value of key,value
  } 
}
// $602.00
// Ex Tax: $500.00
private async getProductPricingData():Promise<void>{
   let PriceData=  await this.productPricing.allInnerTexts();
   let productPrice = PriceData[0].trim();
   let exTaxPrice = PriceData[1].split(':')[1].trim();
   this.map.set('ProductPrice', productPrice);
   this.map.set('ExTaxPrice', exTaxPrice);
}

/**
     * 
     * @returns this method is returning the actual product data: header, images, metadata, pricing data
*/
async getProductInfo(): Promise<Map<string, string | number>> { //public, we call it outside the class
    this.map.set('productHeader', await this.getProductHeader());
    this.map.set('productImages', await this.getProductImagesCount());
    await this.getProductMetaData();
    await this.getProductPricingData();
    return this.map;

}
}
