'use strict'
const {By} = require('selenium-webdriver')
const BasePage = require('./basePage')

const resultsHeaderLocator = By.xpath('//div[@class=\'rc\']/h3')
const totalNumberLocator = By.id('resultStats')

class ResultsPage extends BasePage {

  constructor (driver) {
    super(driver)
  }

  async getResulsHeaders () {
    const selector = await super.waitForElementsBy(resultsHeaderLocator)
    let headersArray = await selector.map(async result => {
      return result.getText()
    })
    let headers = await Promise.all(headersArray)
    await console.log('Results on the first page:\n', headers)
    return headers
  }

  async getNumberOfResults () {
    let totalNumberContent = await super.getElementText(totalNumberLocator)
    let totalNumber = await totalNumberContent.split(' ').join('').match('(\\d+)([^(,])')
    let total = Number.parseInt(totalNumber[0])
    console.log('Number of results: ', total)
    return total
  }

}

module.exports = ResultsPage
