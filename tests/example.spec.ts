import {test, expect, Page} from '@playwright/test';

const pageSelectors = {
  pageUrl: 'https://rahulshettyacademy.com/AutomationPractice/',
  inputRadio1: "#radio-btn-example > fieldset > label:nth-child(2) > input",
  inputRadio2: "#radio-btn-example > fieldset > label:nth-child(3) > input",
  inputRadio3: "#radio-btn-example > fieldset > label:nth-child(4) > input",
}

test('Corso Rahul Shetty', async ({ page }) => {

  console.log('Raggiungo paggina')
  await page.goto(pageSelectors.pageUrl);

  await clickAndCheckInputRadio(page, pageSelectors.inputRadio1)
  await clickAndCheckInputRadio(page, pageSelectors.inputRadio2)
  await clickAndCheckInputRadio(page, pageSelectors.inputRadio3)

})

async function clickAndCheckInputRadio(page: Page, inputRadioSelector:string) {
  const propertyName = Object.entries(pageSelectors).find(([key, value]) => value === inputRadioSelector)[0];

  console.log("Eseguo click del selettore: " + propertyName)
  await page.locator(inputRadioSelector).click()

  const boolInputRadio1Selector = await page.locator(inputRadioSelector).isChecked()
  console.log("Il selettore è selezionato? " + boolInputRadio1Selector)
  expect(boolInputRadio1Selector).toBeTruthy()
}
