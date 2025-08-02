import { test } from 'ui/Utils_UI/fixtures/testSetup';

test.describe.parallel('DTC-NEW End 2 End Flow', () => {
  test('Step 1: Fill basic info', async ({ applyNowPage, testData,contactInfoPage, verifyPhoneOtp}) => {
    await applyNowPage.enterfirstName(testData.firstName);
    await applyNowPage.enterlasttName(testData.lastName);
    await applyNowPage.enterloanAmount(testData.loanAmount);
    await applyNowPage.clickOnLoanPurposeDropDownButton(testData.loanPurpose);
    await applyNowPage.clickOncontinueToContactButton();
    await contactInfoPage.entermobilePhone();
    await contactInfoPage.enterEmail();
    await contactInfoPage.clickcontinueToVerificationButton();
    await verifyPhoneOtp.enterOtp(testData.defaultOTP);
  });

  test('Step 2:  basic info', async ({ applyNowPage, testData,contactInfoPage, verifyPhoneOtp}) => {
    await applyNowPage.enterfirstName(testData.firstName);
    await applyNowPage.enterlasttName(testData.lastName);
    await applyNowPage.enterloanAmount(testData.loanAmount);
    await applyNowPage.clickOnLoanPurposeDropDownButton(testData.loanPurpose);
    await applyNowPage.clickOncontinueToContactButton();
    await contactInfoPage.entermobilePhone();
    await contactInfoPage.enterEmail();
    await contactInfoPage.clickcontinueToVerificationButton();
    await verifyPhoneOtp.enterOtp(testData.defaultOTP);
  });

  test('Step 3: Fill basic', async ({ applyNowPage, testData,contactInfoPage, verifyPhoneOtp}) => {
    await applyNowPage.enterfirstName(testData.firstName);
    await applyNowPage.enterlasttName(testData.lastName);
    await applyNowPage.enterloanAmount(testData.loanAmount);
    await applyNowPage.clickOnLoanPurposeDropDownButton(testData.loanPurpose);
    await applyNowPage.clickOncontinueToContactButton();
    await contactInfoPage.entermobilePhone();
    await contactInfoPage.enterEmail();
    await contactInfoPage.clickcontinueToVerificationButton();
    await verifyPhoneOtp.enterOtp(testData.defaultOTP);
  });
});