import { Locator, Page } from "@playwright/test";

export class BasePage{
    protected readonly page:Page; //within this class or child class can access
    //common locators across all the pages
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly myAccountLink: Locator;
    protected readonly loginLink: Locator;
    protected readonly registerLink: Locator;
    protected readonly shoppingCartLink: Locator;
    protected readonly wishListLink: Locator;
    protected readonly footerLinks: Locator;
    protected readonly menuBarLinks: Locator;
    protected readonly currencyDropdown: Locator;
    protected readonly currencyOptions: Locator;
    protected readonly cartButton: Locator;
    protected readonly cartItemsCount: Locator;
    protected readonly cartTotalPrice: Locator;
    protected readonly checkoutButton: Locator;
    


    constructor (page:Page){
      this.page= page;   // readonly page =  constructor (page)
      this.logo= page.getByAltText('naveenopencart');
      this.searchBox= page.getByPlaceholder('Search');
      this.searchIcon= page.locator('div#search button');
      this.myAccountLink= page.getByRole('link', { name: 'My Account' });
      this.loginLink= page.getByRole('link', { name: 'Login' });
      this.registerLink= page.getByRole('link', { name: 'Register' });
      this.shoppingCartLink= page.getByRole('link', { name: 'Shopping Cart' });
      this.wishListLink= page.getByRole('link', { name: 'Wish List' });
      this.footerLinks= page.locator('footer a');
      this.menuBarLinks= page.locator('nav#menu ul.nav.navbar-nav li a');
      this.currencyDropdown= page.locator('form#form-currency button.dropdown-toggle');
      this.currencyOptions= page.locator('form#form-currency ul.dropdown-menu li button');
      this.cartButton= page.locator('div#cart button.dropdown-toggle');
      this.cartItemsCount= page.locator('div#cart span#cart-total');
      this.cartTotalPrice= page.locator('div#cart div.dropdown-menu div.table-responsive table.table tbody tr td.text-right strong');
      this.checkoutButton= page.locator('div#cart div.dropdown-menu div.text-right a.btn.btn-primary');   
    }


    //common  functionalities/actions

    async isLogoVisible():Promise<boolean> {
        return await this.logo.isVisible();
    }   

    async isSearchBoxVisible():Promise<boolean> {
        return await this.searchBox.isVisible();
    }

    async isSearchIconVisible():Promise<boolean> {
        return await this.searchIcon.isVisible();
    } 

    async isMyAccountLinkVisible():Promise<boolean> {
        return await this.myAccountLink.isVisible();
    }

    async isLoginLinkVisible():Promise<boolean> {
        return await this.loginLink.isVisible();
    }

    async isRegisterLinkVisible():Promise<boolean> {
        return await this.registerLink.isVisible();
    } 

    async isShoppingCartLinkVisible():Promise<boolean> {
        return await this.shoppingCartLink.isVisible();

    }

    async isWishListLinkVisible():Promise<boolean> {
        return await this.wishListLink.isVisible(); 

    }

    async getPageFooterLinksCount():Promise<number> {
        return await this.footerLinks.count();
    }

    async getPageFooters():Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }

    async getPageMenuBarLinksCount():Promise<number> {
        return await this.menuBarLinks.count();
    }

    async getPageMenuBarLinks():Promise<string[]> {
        return await this.menuBarLinks.allInnerTexts();
    }

    async isCurrencyBoxVisible(currency:string):Promise<boolean> {
        return await this.currencyDropdown.isVisible();
    }    
    async isCartButtonVisible():Promise<boolean> {
        return await this.cartButton.isVisible();
    }


//page level generic methods which can be used in all the pages
    async getPageTitle(): Promise<string>{
        return await this.page.title();
    }

    getCurrentPageUrl(): string{
        return this.page.url();
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('load');  
    }

    async takeScreenshot(name:string){
        await this.page.screenshot({
          path:`reports/screenshot/${name}.png`,
          fullPage:true});  
        
    }

}





/*common locators and functionalities/actions which can be used in all the pages we can create in the base page class 
 and we can extend this base page class in all the page classes.
 like header,logo, footer, menu bar, search bar, login link, register link, shopping cart link etc.
 */

/*
//generic 
async clickOnElement(locator: Locator){
await this.page.locator.click();
}

for these we don't create generic methods for these below methods because these are already available in the playwright api we can directly use them in the page classes.
//clickonelement - click()
//entertext - fill()
//gettext - innerText()
//elementvisible - isVisible()
//elementenabled - isEnabled()
//elementcount - count()
//getallinnertext - allInnerTexts()
//getattribute - getAttribute()
*/
