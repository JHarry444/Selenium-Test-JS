
require("chromedriver");
const { Builder, By, Key } = require("selenium-webdriver");
//Builder - what builds our browser
//By - how we select the element to click or input values into
//Key - keyboard functionality
const { expect } = require("chai");

describe("selenium tests", function () {
  this.timeout(30_000);

  let driver; //declaring a driver variable

  //setting up our browser to be ready for testing - before each test
  // beforeEach(async () => {
  //   driver =  await new Builder().forBrowser("chrome").build();
  // });


  it("should find turtles", async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.bbc.co.uk/search?q=");
    await driver.findElement(By.css("#search-input")).sendKeys("turtles", Key.ENTER);
    const firstResult = await driver.findElement(By.css("#main-content > div.ssrcss-1v7bxtk-StyledContainer.enjd40x0 > div > div > ul > li:nth-child(1) > div > div > div.ssrcss-tq7xfh-PromoContent.e1f5wbog7 > div.ssrcss-1f3bvyz-Stack.e1y4nx260 > a > span > p > span")).getText();
    expect(firstResult).to.equal("The Man Who Made Mock Turtle Soup");
  })
  //terminating the browser after each test
  afterEach(async () => {
    await driver.quit();
  });

});