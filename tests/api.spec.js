
import { test, expect } from '@playwright/test';

// Описываем набор API-тестов
test.describe('API-тесты для Restful-booker', () => {

  // Запускаем тесты последовательно
  test.describe.configure({ mode: 'serial' });

  const baseURL = 'https://restful-booker.herokuapp.com';

  let bookingId;
  let authToken;

  // Данные для создания бронирования
  const bookingData = {
    firstname: 'Test',
    lastname: 'User',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-11-10',
      checkout: '2026-11-15'
    },
    additionalneeds: 'Breakfast'
  };

  // Тест 1: Создание бронирования (POST)
  test('Создание бронирования', async ({ request }) => {

    // 1. Отправляем POST-запрос
    const response = await request.post(`${baseURL}/booking`, {
      headers: {
        Accept: 'application/json'
      },
      data: bookingData
    });

    // 2. Проверяем статус-код 200
    expect(response.status()).toBe(200);

    // 3. Получаем тело ответа
    const responseBody = await response.json();

    // 4. Проверяем наличие bookingid
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.bookingid).toBeGreaterThan(0);

    // 5. Проверяем данные бронирования
    expect(responseBody.booking).toEqual(bookingData);

    // 6. Сохраняем ID для следующих тестов
    bookingId = responseBody.bookingid;

  });

  // Тест 2: Получение бронирования (GET)
  test('Получение информации о бронировании', async ({ request }) => {

    // 1. Отправляем GET-запрос по ID
    const response = await request.get(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Accept: 'application/json'
      }
    });

    // 2. Проверяем статус-код 200
    expect(response.status()).toBe(200);

    // 3. Получаем тело ответа
    const responseBody = await response.json();

    // 4. Проверяем данные бронирования
    expect(responseBody).toEqual(bookingData);

  });

  // Тест 3: Обновление бронирования (PUT)
  test('Обновление бронирования', async ({ request }) => {

    // 1. Получаем токен авторизации
    const authResponse = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    // 2. Проверяем статус авторизации
    expect(authResponse.status()).toBe(200);

    // 3. Сохраняем токен
    const authBody = await authResponse.json();
    expect(authBody.token).toBeTruthy();

    authToken = authBody.token;

    // 4. Обновляем данные бронирования
    const updatedBookingData = {
      ...bookingData,
      firstname: 'Updated',
      totalprice: 250
    };

    // 5. Отправляем PUT-запрос
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Accept: 'application/json',
        Cookie: `token=${authToken}`
      },
      data: updatedBookingData
    });

    // 6. Проверяем статус-код 200
    expect(response.status()).toBe(200);

    // 7. Проверяем обновлённые данные
    const responseBody = await response.json();

    expect(responseBody).toEqual(updatedBookingData);

  });

  // Тест 4: Удаление бронирования (DELETE)
  test('Удаление бронирования', async ({ request }) => {

    // 1. Отправляем DELETE-запрос
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`
      }
    });

    // 2. Проверяем статус-код 201
    expect(response.status()).toBe(201);

    // 3. Проверяем, что бронирование удалено
    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);

    // 4. Проверяем статус-код 404
    expect(getResponse.status()).toBe(404);

  });

});
