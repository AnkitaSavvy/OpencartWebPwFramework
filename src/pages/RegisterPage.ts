import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";


export class RegisterPage extends BasePage { //export  =  Bahar use karna hai
    //private locators:
    private readonly firstname: Locator; //private access modifier bcz of encapsulation and readonly bcz noone can change the locator
    private readonly lastname: Locator;
    private readonly emailid: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly telephone: Locator;
    private readonly subscribeYes: Locator;
    private readonly subscribeNo: Locator;
    private readonly checkbox:Locator;
    private readonly continue:Locator;
    

    constructor(page:Page){ //constructor should be public so that we can use it 
   super(page) //call the parent class constructor
        this.firstname= page.getByRole('textbox', {name:'First Name'});
        this.lastname= page.getByRole('textbox', {name:'Last Name'});
        this.emailid = page.getByRole('textbox', {name:'E-Mail'});
        this.telephone= page.getByRole('textbox', { name: 'Telephone' });
        this.password= page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPassword= page.getByRole('textbox', { name: 'Password Confirm' });
        this.subscribeYes= page.getByRole('radio', { name: 'Yes'});
        this.subscribeNo= page.getByRole('radio', { name: 'No'});
        this.checkbox=page.locator('[name="agree"]');
        this.continue=page.getByRole('button', { name: 'Continue' });
}


async goToRegisterPage():Promise<void>{
    await this.page.goto('/opencart/index.php?route=account/register');//partial part 
}

async getRegisterPageTitle():Promise<string>{
    return await this.page.title();
}

async doRegister(firstname:string,lastname:string,emailid:string,telephone:string,password:string,confirmPassword:string,subscribe:string){
    console.log(`user detail :${firstname}, ${lastname}`); //user 
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.emailid.fill(emailid);
    await this.telephone.fill(telephone);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    
    if(subscribe.toLowerCase() === 'yes'){
            await this.subscribeYes.check();
        } else {
            await this.subscribeNo.check();
        }
    
    await this.checkbox.click();
    await this.continue.click();
}

}
