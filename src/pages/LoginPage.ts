
import { Locator , Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { promises } from "node:dns";

export class LoginPage extends BasePage { //export  =  Bahar use karna hai
    //private locators:
    private readonly emailid: Locator; //private access modifier bcz of encapsulation and readonly bcz noone can change the locator
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordlink: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMsg: Locator;


constructor(page:Page){ //constructor should be public so that we can use it 
   super(page) //call the parent class constructor
 this.emailid = page.getByRole('textbox', {name:'E-Mail Address'});
 this.password= page.getByRole('textbox',{name:'Password'});
 this.loginBtn= page.getByRole('button', {name:'Login'});
 this.forgottenPasswordlink= page.getByRole('link', {name:'Forgotten Password'}).first();
 this.logo= page.getByAltText('naveenopencart');
 this.loginErrorMsg= page.locator('.alert.alert-danger.alert-dismissible');
}

//public page actions(method)/behaviour
async goTologinPage():Promise<void>{
    await this.page.goto('opencart/index.php?route=account/login');//partial part 
}

async getloginPageTitle():Promise<string>{
    return await this.page.title();
}

async isForgotPasswordLinkExist():Promise<boolean>{
    return await this.forgottenPasswordlink.isVisible();
}

async doLogin(username:string, password:string){
    console.log(`user cred is :${username}, ${password}`); //user cred:pwtestbatch@open.com, pw123
    await this.emailid.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
}

async IsinvalidLoginErrorDisplayed():Promise<boolean>{
    return await this.loginErrorMsg.isVisible();
}




}
