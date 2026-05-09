const { test, expect } = require('@playwright/test');

const URL = 'https://www.saucedemo.com/';


// Q1 
// Login with locked_out_user and verify error message


test('Q1 - Locked out user login validation', async ({ page }) => {

    await page.goto(URL);

    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');

    await page.click('#login-button');

     
    await expect(page.locator('[data-test="error"]'))
        .toContainText('Sorry, this user has been locked out.');// error message
});




// Q2 
// Standard user complete purchase flow


test('Q2 - Standard user complete checkout flow', async ({ page }) => {

    await page.goto(URL);

    
    await page.fill('#user-name', 'standard_user');//login part start here
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    
    await page.click('#react-burger-menu-btn');// menu

    
    await page.click('#reset_sidebar_link');//reset

  
    await page.click('#react-burger-cross-btn');//close

    
    await page.click('#add-to-cart-sauce-labs-backpack');//products
    await page.click('#add-to-cart-sauce-labs-bike-light');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

   
    await page.click('.shopping_cart_link');  //cart

    // Verify product names
    await expect(page.locator('.inventory_item_name').nth(0)) //  product names
        .toHaveText('Sauce Labs Backpack');

    await expect(page.locator('.inventory_item_name').nth(1))
        .toHaveText('Sauce Labs Bike Light');

    await expect(page.locator('.inventory_item_name').nth(2))
        .toHaveText('Sauce Labs Bolt T-Shirt');

    
    await page.click('#checkout');//checkout

  
    await page.fill('#first-name', 'Saiful');// user information
    await page.fill('#last-name', 'Hoque');
    await page.fill('#postal-code', '4000');

    await page.click('#continue');

    
    const totalPrice = await page.locator('.summary_total_label').textContent();// total price

    console.log('Total Price:', totalPrice);

    await expect(page.locator('.summary_total_label')).toBeVisible();

    
    await page.click('#finish');

    
    await expect(page.locator('.complete-header'))
        .toHaveText('Thank you for your order!');

    
    await page.click('#back-to-products');

    
    await page.click('#react-burger-menu-btn');

    
    await page.click('#reset_sidebar_link');

    
    await page.click('#logout_sidebar_link');


    await expect(page).toHaveURL(URL);
});




// Q3 
// performance_glitch_user with filter and checkout


test('Q3 - Performance glitch user checkout flow', async ({ page }) => {

    await page.goto(URL);

  
    await page.fill('#user-name', 'performance_glitch_user');
    await page.fill('#password', 'secret_sauce');

    await page.click('#login-button');

    
    await page.click('#react-burger-menu-btn');

   
    await page.click('#reset_sidebar_link');

  
    await page.click('#react-burger-cross-btn');

  
    await page.selectOption('.product_sort_container', 'za');

   
    const firstProduct =
        await page.locator('.inventory_item_name').first().textContent();

    console.log('Selected Product:', firstProduct);

   
    await page.locator('button:has-text("Add to cart")').first().click();

   
    await page.click('.shopping_cart_link');

    
    await expect(page.locator('.inventory_item_name').first())
        .toContainText(firstProduct);

    
    await page.click('#checkout');

    
    await page.fill('#first-name', 'Saiful');
    await page.fill('#last-name', 'Hoque');
    await page.fill('#postal-code', '4000');

    await page.click('#continue');

   
    const checkoutProducts =
        await page.locator('.inventory_item_name').allTextContents();

    console.log('Checkout Products:', checkoutProducts);

   
    const finalTotal =
        await page.locator('.summary_total_label').textContent();

    console.log('Final Total:', finalTotal);

    await expect(page.locator('.summary_total_label')).toBeVisible();

 
    await page.click('#finish');

  
    await expect(page.locator('.complete-header'))
        .toHaveText('Thank you for your order!');

    
    await page.click('#back-to-products');

    
    await page.click('#react-burger-menu-btn');

   
    await page.click('#reset_sidebar_link');

  
    await page.click('#logout_sidebar_link');

   
    await expect(page).toHaveURL(URL);
});