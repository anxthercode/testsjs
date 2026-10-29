export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;

    // Локаторы страницы подтверждения
    this.orderItems = page.locator('.cart_item');
    this.totalPrice = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
  }

  // Получаем названия товаров в заказе
  async getOrderItemNames() {
    // Ждём появления товара на странице
    await this.orderItems.first().waitFor({ state: 'visible' });

    // Получаем названия товаров
    return await this.orderItems
      .locator('.inventory_item_name')
      .allInnerTexts();
  }

  // Получаем итоговую сумму
  async getTotalPrice() {
    return await this.totalPrice.innerText();
  }

  // Завершаем оформление заказа
  async finishCheckout() {
    await this.finishButton.click();
  }
}
