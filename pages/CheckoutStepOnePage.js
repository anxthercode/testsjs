export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page;

    // Локаторы полей и кнопки
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
  }

  // Заполняем информацию о покупателе
  async fillUserInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Продолжаем оформление заказа
  async continueCheckout() {
    await this.continueButton.click();
  }
}
