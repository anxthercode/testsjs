
import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

test('Покупка самого дорогого товара на Sauce Demo', async ({ page }) => {

  // Создаём экземпляры Page Objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // 1. Открываем страницу логина
  await loginPage.open();

  // 2. Выполняем авторизацию
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. Проверяем заголовок страницы товаров
  expect(await inventoryPage.getPageTitle()).toBe('Products');

  // 4. Сортируем товары от дорогих к дешёвым
  await inventoryPage.sortByPriceDescending();

  // Проверяем правильность сортировки
  const prices = await inventoryPage.getPrices();
  expect(prices.length).toBeGreaterThan(0);
  expect(prices).toEqual([...prices].sort((a, b) => b - a));

  // Получаем название самого дорогого товара
  const itemName = await inventoryPage.getFirstItemName();

  // Добавляем его в корзину
  await inventoryPage.addItemToCart(itemName);

  // 5. Открываем корзину
  await inventoryPage.openCart();

  // 6. Проверяем добавленный товар
  expect(await cartPage.getCartItemNames()).toEqual([itemName]);

  // 7. Начинаем оформление заказа
  await cartPage.goToCheckout();

  // 8. Заполняем информацию о покупателе
  await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');

  // 9. Продолжаем оформление заказа
  await checkoutStepOnePage.continueCheckout();

  // Дополнительно проверяем товар и сумму заказа
  expect(await checkoutStepTwoPage.getOrderItemNames()).toEqual([itemName]);
  expect(await checkoutStepTwoPage.getTotalPrice()).toMatch(/^Total: \$/);

  // 10. Завершаем покупку
  await checkoutStepTwoPage.finishCheckout();

  // 11. Проверяем сообщение об успешном заказе
  expect(await checkoutCompletePage.getCompletionMessage())
    .toBe('Thank you for your order!');

});
