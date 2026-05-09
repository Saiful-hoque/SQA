# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\saucedemo.spec.js >> Q3 - Performance glitch user checkout flow
- Location: tests\saucedemo.spec.js:114:1

# Error details

```
Error: locator.textContent: Target page, context or browser has been closed
Call log:
  - waiting for locator('.inventory_item_name').first()

```

# Test source

```ts
  38  |     await page.click('#login-button');
  39  | 
  40  |     // Open menu
  41  |     await page.click('#react-burger-menu-btn');
  42  | 
  43  |     // Reset app state
  44  |     await page.click('#reset_sidebar_link');
  45  | 
  46  |     // Close menu
  47  |     await page.click('#react-burger-cross-btn');
  48  | 
  49  |     // Add 3 products
  50  |     await page.click('#add-to-cart-sauce-labs-backpack');
  51  |     await page.click('#add-to-cart-sauce-labs-bike-light');
  52  |     await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
  53  | 
  54  |     // Go to cart
  55  |     await page.click('.shopping_cart_link');
  56  | 
  57  |     // Verify product names
  58  |     await expect(page.locator('.inventory_item_name').nth(0))
  59  |         .toHaveText('Sauce Labs Backpack');
  60  | 
  61  |     await expect(page.locator('.inventory_item_name').nth(1))
  62  |         .toHaveText('Sauce Labs Bike Light');
  63  | 
  64  |     await expect(page.locator('.inventory_item_name').nth(2))
  65  |         .toHaveText('Sauce Labs Bolt T-Shirt');
  66  | 
  67  |     // Checkout
  68  |     await page.click('#checkout');
  69  | 
  70  |     // Fill user information
  71  |     await page.fill('#first-name', 'Saiful');
  72  |     await page.fill('#last-name', 'Hoque');
  73  |     await page.fill('#postal-code', '4000');
  74  | 
  75  |     await page.click('#continue');
  76  | 
  77  |     // Verify total price
  78  |     const totalPrice = await page.locator('.summary_total_label').textContent();
  79  | 
  80  |     console.log('Total Price:', totalPrice);
  81  | 
  82  |     await expect(page.locator('.summary_total_label')).toBeVisible();
  83  | 
  84  |     // Finish order
  85  |     await page.click('#finish');
  86  | 
  87  |     // Verify success message
  88  |     await expect(page.locator('.complete-header'))
  89  |         .toHaveText('Thank you for your order!');
  90  | 
  91  |     // Back to products
  92  |     await page.click('#back-to-products');
  93  | 
  94  |     // Open menu again
  95  |     await page.click('#react-burger-menu-btn');
  96  | 
  97  |     // Reset app state again
  98  |     await page.click('#reset_sidebar_link');
  99  | 
  100 |     // Logout
  101 |     await page.click('#logout_sidebar_link');
  102 | 
  103 |     // Verify login page
  104 |     await expect(page).toHaveURL(URL);
  105 | });
  106 | 
  107 | 
  108 | 
  109 | // ======================================================
  110 | // Q3 [30 Marks]
  111 | // performance_glitch_user with filter and checkout
  112 | // ======================================================
  113 | 
  114 | test('Q3 - Performance glitch user checkout flow', async ({ page }) => {
  115 | 
  116 |     await page.goto(URL);
  117 | 
  118 |     // Login
  119 |     await page.fill('#user-name', 'performance_glitch_user');
  120 |     await page.fill('#password', 'secret_sauce');
  121 | 
  122 |     await page.click('#login-button');
  123 | 
  124 |     // Open menu
  125 |     await page.click('#react-burger-menu-btn');
  126 | 
  127 |     // Reset app state
  128 |     await page.click('#reset_sidebar_link');
  129 | 
  130 |     // Close menu
  131 |     await page.click('#react-burger-cross-btn');
  132 | 
  133 |     // Filter by Name Z to A
  134 |     await page.selectOption('.product_sort_container', 'za');
  135 | 
  136 |     // Get first product name
  137 |     const firstProduct =
> 138 |         await page.locator('.inventory_item_name').first().textContent();
      |                                                            ^ Error: locator.textContent: Target page, context or browser has been closed
  139 | 
  140 |     console.log('Selected Product:', firstProduct);
  141 | 
  142 |     // Add first product to cart
  143 |     await page.locator('button:has-text("Add to cart")').first().click();
  144 | 
  145 |     // Go to cart
  146 |     await page.click('.shopping_cart_link');
  147 | 
  148 |     // Verify product name
  149 |     await expect(page.locator('.inventory_item_name').first())
  150 |         .toContainText(firstProduct);
  151 | 
  152 |     // Checkout
  153 |     await page.click('#checkout');
  154 | 
  155 |     // Fill user information
  156 |     await page.fill('#first-name', 'Saiful');
  157 |     await page.fill('#last-name', 'Hoque');
  158 |     await page.fill('#postal-code', '4000');
  159 | 
  160 |     await page.click('#continue');
  161 | 
  162 |     // Verify all product names
  163 |     const checkoutProducts =
  164 |         await page.locator('.inventory_item_name').allTextContents();
  165 | 
  166 |     console.log('Checkout Products:', checkoutProducts);
  167 | 
  168 |     // Verify total price
  169 |     const finalTotal =
  170 |         await page.locator('.summary_total_label').textContent();
  171 | 
  172 |     console.log('Final Total:', finalTotal);
  173 | 
  174 |     await expect(page.locator('.summary_total_label')).toBeVisible();
  175 | 
  176 |     // Finish order
  177 |     await page.click('#finish');
  178 | 
  179 |     // Verify successful order message
  180 |     await expect(page.locator('.complete-header'))
  181 |         .toHaveText('Thank you for your order!');
  182 | 
  183 |     // Back to products
  184 |     await page.click('#back-to-products');
  185 | 
  186 |     // Open menu
  187 |     await page.click('#react-burger-menu-btn');
  188 | 
  189 |     // Reset app state again
  190 |     await page.click('#reset_sidebar_link');
  191 | 
  192 |     // Logout
  193 |     await page.click('#logout_sidebar_link');
  194 | 
  195 |     // Verify redirected to login page
  196 |     await expect(page).toHaveURL(URL);
  197 | });
```