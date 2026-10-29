export class CartPage {
  constructor(page) {
    this.page = page;

    // Локаторы страницы корзины
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  // Получаем названия товаров в корзине
  async getCartItemNames() {
    // Ждём появления товара в корзине
    await this.cartItems.first().waitFor({ state: 'visible' });

    // Получаем названия товаров
    return await this.cartItems
      .locator('.inventory_item_name')
      .allInnerTexts();
  }

  // Переходим к оформлению заказа
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
