const { Builder, Browser } = require("selenium-webdriver");

class BasePage {
  constructor() {
    this.driver = new Builder().forBrowser(Browser.CHROME).build();
    this.driver.manage().setTimeouts({ implicit: 100000 });
  }

  async navigateTo(url) {
    await this.driver.get(url);
  }

  async enterText(locator, text) {
    await this.driver.findElement(locator).sendKeys(text);
  }

  async getText(locator) {
    return await this.driver.findElement(locator).getText();
  }

  async click(locator) {
    await this.driver.findElement(locator).click();
  }

  async captureScreenshot(fileName) {
    const img = await this.driver.takeScreenshot();
    require("fs").writeFileSync(fileName, img, "base64");
  }

  async closeBrowser(delay = 0) {
    if (delay) await this.driver.sleep(delay);
    await this.driver.quit();
  }
}

module.exports = BasePage;