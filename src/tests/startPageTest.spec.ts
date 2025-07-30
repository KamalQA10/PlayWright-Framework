import { expect, test, Page } from "@playwright/test";
import StartPage from "../pages/StartPage";
import ApplyNowPage from '../pages/ApplyNowPage';
import VerifyPhoneOtp from '../pages/VerifyPhoneOtp';
import { loadTestData  } from '../utils/env';

test.describe.configure({ timeout: 60000 });

let page: Page;
let startPage: StartPage;
let applyNowPage: ApplyNowPage;
let newTabPage: Page;
let contactInfoPage: any;
let verifyPhoneOtp: any;
 let testData: any;

test.describe.serial("DTC-NEW End 2 End Flow..", () => {

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext();
    page = await context.newPage();
    startPage = new StartPage(page);

    const env = testInfo.project.name;
    testData = loadTestData(env);
  });

    test("Step 1: Navigate and Click on Apply Button", async () => {
      await startPage.navigateToStartPage();
  
      await expect(page).toHaveURL(/customerportal.lendingpoint.com/);
      await expect(page).toHaveTitle(/LendingPoint/i);

      newTabPage = await startPage.applyNow(/apply/);

      await expect(newTabPage).toHaveURL(/apply/);
      await expect(newTabPage).toHaveTitle(/LendingPoint/i);
    });

    test("Step 2: Enter Details on Apply/Let's Get Started Page", async () => {
      const applyNowPage = new ApplyNowPage(newTabPage);
      await applyNowPage.enterfirstName(testData.firstName);
      await applyNowPage.enterlasttName(testData.lastName);
      await applyNowPage.enterloanAmount(testData.loanAmount);
      await applyNowPage.clickOnLoanPurposeDropDownButton(testData.loanPurpose);
      contactInfoPage = await applyNowPage.clickOncontinueToContactButton();
    });

    test("Step 3: Enter Details(Phone number & Email) on contact-information Page", async () => {
      await expect(newTabPage).toHaveURL(/contact-information/);
      await expect(newTabPage).toHaveTitle(/LendingPoint/i);

      await contactInfoPage.entermobilePhone();
      await contactInfoPage.enterEmail();
      verifyPhoneOtp = await contactInfoPage.clickcontinueToVerificationButton();
    });

    test("Step 4: Enter OTP on verify-phone-otp", async () => {
      await verifyPhoneOtp.enterOtp(testData.defaultOTP);
      await expect(newTabPage).toHaveURL(/verify-phone-otp/);

      await verifyPhoneOtp.verifyphonesuccess();
      
      await newTabPage.waitForTimeout(20000);
    });
    
});