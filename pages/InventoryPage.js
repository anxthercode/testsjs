export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Локаторы страницы товаров
    this.pageTitle = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  // Получаем заголовок страницы
  async getPageTitle() {
    return await this.pageTitle.innerText();
  }

  // Сортируем товары от дорогих к дешёвым
  async sortByPriceDescending() {
    await this.sortDropdown.selectOption('hilo');
  }

  // Получаем цены товаров
  async getPrices() {
    const prices = await this.inventoryItems
      .locator('.inventory_item_price')
      .allTextContents();

    return prices.map(price => Number(price.replace('$', '')));
  }

  // Получаем название первого товара
  async getFirstItemName() {
    return await this.inventoryItems
      .first()
      .locator('.inventory_item_name')
      .innerText();
  }

  // Добавляем выбранный товар в корзину
  async addItemToCart(itemName) {
    const item = this.inventoryItems.filter({
      has: this.page.getByText(itemName, { exact: true })
    });

    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  // Открываем корзину
  async openCart() {
    // Ждём появления счётчика корзины
    await this.cartBadge.waitFor({ state: 'visible' });

    // Переходим в корзину
    await this.cartIcon.click();
  }
}
