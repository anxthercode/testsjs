export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    // Локаторы страницы завершения покупки
    this.completionMessage = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  // Получаем сообщение об успешном заказе
  async getCompletionMessage() {
    return await this.completionMessage.innerText();
  }
}