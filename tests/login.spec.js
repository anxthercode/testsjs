const { test, expect } = require('@playwright/test');

// Описываем наш набор тестов
test.describe('Авторизация на Sauce Demo', () => {

  // Тест 1: Успешная авторизация
  test('Пользователь должен успешно войти в систему', async ({ page }) => {

    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин
    // Используем селектор по id
    await page.locator('#user-name').fill('standard_user');

    // 3. Вводим пароль
    // Используем селектор по placeholder
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    // Используем селектор по data-test атрибуту
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем, что URL изменился и содержит нужную часть
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  });

  
  // Тест 2: Неуспешная авторизация
  test('Заблокированный пользователь не может войти в систему', async ({ page }) => {

    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин заблокированного пользователя
    // Используем селектор по id
    await page.locator('#user-name').fill('locked_out_user');

    // 3. Вводим пароль
    // Используем селектор по placeholder
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    // Используем селектор по data-test атрибуту
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем сообщение об ошибке
    // Используем селектор по data-test атрибуту
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );

  });

});
