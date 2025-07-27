import { expect, test, Page } from "@playwright/test";
import StartPage from "../pages/StartPage";
import ContactInformationPage from '../pages/ContactInformationPage';
import VerifyPhoneOtp from '../pages/VerifyPhoneOtp';
import { loadTestData  } from '../utils/env';

test.describe.configure({ timeout: 60000 });

let startPage: StartPage;
let page: Page;
let contactInfoPage: any;
let verifyPhoneOtp: any;
 let testData: any;

test.describe.serial("DTC-NEW End 2 End Flow..", () => {

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext();
    page = await context.newPage();
    startPage = new StartPage(page);

    const env = testInfo.project.name; // will be 'qa' or 'int'
    testData = loadTestData(env);      // loads qaData.json or intData.json

  });

    test("Step 1: Navigate and Click on Apply Button", async () => {
      await startPage.navigate();
      //await page.waitForTimeout(100000);
      await expect(page).toHaveURL(/customerportal.lendingpoint.com/);
      await expect(page).toHaveTitle(/LendingPoint/i);

      page = await startPage.applyNow();
      await expect(page).toHaveURL(/apply/);
      await expect(page).toHaveTitle(/LendingPoint/i);
    });

    test("Step 2: Enter Details on Apply/Let's Get Started Page", async () => {
      const driver = new StartPage(page);
      await driver.enterfirstName(testData.firstName);
      await driver.enterlasttName(testData.lastName);
      await driver.enterloanAmount(testData.loanAmount);
      await driver.clickOnLoanPurposeDropDownButton(testData.loanPurpose);
      contactInfoPage = await driver.clickOncontinueToContactButton();
    });

    test("Step 3: Enter Details(Phone number & Email) on contact-information Page", async () => {
      await expect(page).toHaveURL(/contact-information/);
      await expect(page).toHaveTitle(/LendingPoint/i);

      await contactInfoPage.entermobilePhone();
      await contactInfoPage.enterEmail();
      verifyPhoneOtp = await contactInfoPage.clickcontinueToVerificationButton();
    });

    test("Step 4: Enter OTP on verify-phone-otp", async () => {
      await verifyPhoneOtp.enterOtp(testData.defaultOTP);
      await expect(page).toHaveURL(/verify-phone-otp/);

      await verifyPhoneOtp.verifyphonesuccess();
      
      await page.waitForTimeout(20000);
    });

});