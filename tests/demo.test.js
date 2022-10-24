require("chromedriver"); // You WILL need to update chrome on the LoD
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
//Builder - what builds our browser
//By - how we select the element to click or input values into
//Key - keyboard functionality
const { expect } = require("chai");

describe("selenium tests", function () {
  this.timeout(60_000); // changes how long the mocha test will run for before failing automatically

  // let driver; //declaring a driver variable

  //setting up our browser to be ready for testing - before each test
  // beforeEach(async () => {
  //   driver =  await new Builder().forBrowser("chrome").build();
  // });

  it("should convert miles to KMs", async () => {
    const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    try {
      await driver.get("http://localhost:3000/testing/ex1");
      const miles = await driver.findElement(By.css("#root > div > div.container > div:nth-child(2) > div:nth-child(2) > input"));
      await miles.sendKeys("10");
      const Kms = await driver.findElement(By.css("#root > div > div.container > div:nth-child(2) > div.mt-4.input-group > input"));
      expect(await Kms.getAttribute("value")).to.equal("16");
    } finally {
      // await driver.quit();
    }
  })

  it.skip("should count to 4494", async () => {
    const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    try {
      await driver.get("http://localhost:3000/testing/ex2");
      const plus5 = await driver.findElement(By.css("#root > div > div.container > div.input-group > button:nth-child(5)"));
      for (let i = 0; i < 900; i++) {
        plus5.click();
      }
      await (await driver.findElement(By.css("#root > div > div.container > div.input-group > button:nth-child(1)"))).click();
      await (await driver.findElement(By.css("#root > div > div.container > div.input-group > button:nth-child(2)"))).click();
      const counter = await driver.findElement(By.css("#root > div > div.container > div.input-group > input"));
      const value = await counter.getAttribute("value");
      expect(value).to.equal("4494");
    } finally {
      // await driver.quit();
    }
  })

  it("should find batman", async () => {
    const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    try {
      await driver.get("http://localhost:3000/testing/ex3");
      const search = await driver.findElement(By.id("filmTitle"));
      await search.sendKeys("batman");
      await search.sendKeys(Key.ENTER);
      const result = await driver.wait(until.elementLocated(By.css("#root > div > div.container > div.container > div > div:nth-child(1) > div > div > div")));
      // const result = await driver.findElement(By.css("#root > div > div.container > div.container > div > div:nth-child(1) > div > div > div"));
      expect(await result.getText()).to.equal("Batman Begins");
    } finally {
      // await driver.quit();
    }
  })


  it.skip("should find a dress", async () => {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    try {
      await driver.get("http://www.automationpractice.com");
      const search = await driver.findElement(By.id("search_query_top"))
      await search.sendKeys("dress");
      await (await driver.findElement(By.css("#searchbox > button"))).click();
      const result = await driver.findElement(By.css("#center_column > ul > li:nth-child(1) > div > div.right-block > h5 > a"));
      expect(await result.getText()).to.equal("Printed Summer Dress");
    } finally {
      await driver.quit();
    }
  });

  it.skip("should find turtles", async () => {
    const driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.get("https://www.bbc.co.uk/search");
      const search = await driver.findElement(By.id("search-input"));
      await search.sendKeys("turtles");
      // await search.sendKeys(Key.ENTER);
      await driver.findElement(By.css("#main-content > form > div > div > div > button")).click();
      const result = await driver.findElement(By.css("#main-content > div.ssrcss-1v7bxtk-StyledContainer.enjd40x0 > div > div > ul > li:nth-child(1) > div > div > div.ssrcss-tq7xfh-PromoContent.e1f5wbog7 > div.ssrcss-1f3bvyz-Stack.e1y4nx260 > a > span > p > span"));
      expect(await result.getText()).to.equal("The Man Who Made Mock Turtle Soup");
    } finally {
      await driver.quit();
    }
  })

  it.skip("should find a surprise", async () => {
    const driver = await new Builder().forBrowser("chrome").build();
    try {
      driver.get("https://christophperrins.github.io/TestingSite/");
      // presenceOfElementedBy
      const surprise = await driver.wait(until.elementLocated(By.css("#quote > h1")));
      expect(await surprise.getText()).to.equal("Surprise!")
    } finally{
      driver.quit();
    }
    return;
  });
  //terminating the browser after each test
  // afterEach(async () => {
  //   await driver.quit();
  // });

});