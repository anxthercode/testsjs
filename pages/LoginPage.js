export class LoginPage {
  constructor(page) {
    this.page = page;

    // Локаторы страницы входа
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Открываем страницу входа
  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Выполняем авторизацию
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
