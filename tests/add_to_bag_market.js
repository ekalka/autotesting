const BagMarketPage = require("../pages/addtocartpage");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
const { allure } = require("allure-mocha/runtime");

describe("Yandex Market Add to Bag Test Suite", function () {
  let marketPage = new BagMarketPage();

  before(async function () {
    await marketPage.open();
  });

  after(async function () {
    await marketPage.closeBrowser();
  });

  it("should successfully add a product to the bag", async function () {
    await allure.step("Navigate through categories", async function () {
      await marketPage.clickCatalog();
      await marketPage.clickBigCategory();
      await marketPage.clickMediumCategory();
      await marketPage.clickSmallCategory();
      await marketPage.verifyHeaderText("Ноутбуки");
    });

    await allure.step("Log details of the first five products", async function () {
      await marketPage.logFirstFiveProducts();
      console.log(marketPage.secondProductName);
    });

    await allure.step("Add the second product to the bag", async function () {
      await marketPage.addProductToBag();
      assert.equal(marketPage.plusBtn.length, 1);
      assert.equal(marketPage.minusBtn.length, 1);
      assert.equal(marketPage.record.length, 1);
      await marketPage.clickProduct();
      await marketPage.findProductAmount();
      assert.equal(await marketPage.amountOfProducts.getAttribute("value"), "1");
      await marketPage.increaseProductAmount();
      assert.equal(await marketPage.amountOfProducts.getAttribute("value"), "2");
      await marketPage.closeProductPopup();
      assert.equal(await marketPage.message.getText(), "Войдите в аккаунт");
    });
  });
});