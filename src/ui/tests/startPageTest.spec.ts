import { test, expect } from 'ui/Utils_UI/fixtures/testSetup';

test.describe('DTC-NEW End 2 End Flow', () => {
  test('Test001: Regression Test:- Fill basic info', async ({
    applyNowPage,
    testData,
    contactInfoPage,
    verifyPhoneOtp,
    incomeFillAddressPage,
    yourIncomePage,
    aboutYouPage,
    offersPage,
    bankInformationPage
  }) => {
    // Step 1: Apply Now Form
    await applyNowPage.enterFirstName(testData.firstName);
    await applyNowPage.enterLastName(testData.lastName);
    await applyNowPage.enterLoanAmount(testData.loanAmount);
    await applyNowPage.selectLoanPurpose(testData.loanPurpose);
    await applyNowPage.clickContinueToContactButton();

    // Step 2: Contact Information
    await contactInfoPage.enterMobilePhone();
    await contactInfoPage.enterEmail();
    await contactInfoPage.clickContinueToVerificationButton();

    // Step 3: OTP Verification
    await verifyPhoneOtp.enterOtp(testData.defaultOTP);
    await verifyPhoneOtp.verifyPhoneSuccess(testData.incomefilladdressURL);

    // Step 4: Address Information
    await incomeFillAddressPage.enterAddress(testData.street);
    await incomeFillAddressPage.enterCity(testData.city);
    await incomeFillAddressPage.clickOnStateDropDownButton(testData.state);
    await incomeFillAddressPage.enterZipCode(testData.zip);
    await incomeFillAddressPage.clickOnContinueToYourIncomeButton();

    // Step 5: Income Details
    await yourIncomePage.enterAnnualIncome(testData.annualIncome);
    await yourIncomePage.selectEmploymentType(testData.incomeType);
    await yourIncomePage.enterCompanyName(testData.companyName);
    await yourIncomePage.clickContinueToAboutYou();

    // Step 6: About You Details
    await aboutYouPage.enterDOB(testData.dob);
    await aboutYouPage.enterSSN(testData.ssn);
    await aboutYouPage.clickSeeYourOptions();

    // step 7: Select Offer
    await offersPage.selectOffer(testData.offeramount);
    await offersPage.clickConfirmOffers();
    await offersPage.clickOnLetsGoButton();

    // step 8: Bank Information Page
    await bankInformationPage.clickConfirmOffers();
    await bankInformationPage.clickOnContinueAsGuest(testData.bankName, testData.bankUserName, testData.bankPassword);
    await bankInformationPage.clickOnSetUpAutoPay();
    await bankInformationPage.clickOncontinueToReviewYourLoan();
    await bankInformationPage.clickOnContinuetoLoanAgreement();
    
  });

  test('Test002: Smoke Test:- Fill basic info @smoke', async ({
    applyNowPage,
    testData,
    contactInfoPage,
    verifyPhoneOtp,
    incomeFillAddressPage,
    yourIncomePage,
    aboutYouPage,
    offersPage,
    bankInformationPage
  }) => {
    // Step 1: Apply Now Form
    await applyNowPage.enterFirstName(testData.firstName);
    await applyNowPage.enterLastName(testData.lastName);
    await applyNowPage.enterLoanAmount(testData.loanAmount);
    await applyNowPage.selectLoanPurpose(testData.loanPurpose);
    await applyNowPage.clickContinueToContactButton();

    // Step 2: Contact Information
    await contactInfoPage.enterMobilePhone();
    await contactInfoPage.enterEmail();
    await contactInfoPage.clickContinueToVerificationButton();

    // Step 3: OTP Verification
    await verifyPhoneOtp.enterOtp(testData.defaultOTP);
    await verifyPhoneOtp.verifyPhoneSuccess(testData.incomefilladdressURL);

    // Step 4: Address Information
    await incomeFillAddressPage.enterAddress(testData.street);
    await incomeFillAddressPage.enterCity(testData.city);
    await incomeFillAddressPage.clickOnStateDropDownButton(testData.state);
    await incomeFillAddressPage.enterZipCode(testData.zip);
    await incomeFillAddressPage.clickOnContinueToYourIncomeButton();

    // Step 5: Income Details
    await yourIncomePage.enterAnnualIncome(testData.annualIncome);
    await yourIncomePage.selectEmploymentType(testData.incomeType);
    await yourIncomePage.enterCompanyName(testData.companyName);
    await yourIncomePage.clickContinueToAboutYou();

    // Step 6: About You Details
    await aboutYouPage.enterDOB(testData.dob);
    await aboutYouPage.enterSSN(testData.ssn);
    await aboutYouPage.clickSeeYourOptions();

    // step 7: Select Offer
    await offersPage.selectOffer(testData.offeramount);
    await offersPage.clickConfirmOffers();
    await offersPage.clickOnLetsGoButton();

    // step 8: Bank Information Page
    await bankInformationPage.clickConfirmOffers();
    await bankInformationPage.clickOnContinueAsGuest(testData.bankName, testData.bankUserName, testData.bankPassword);
    await bankInformationPage.clickOnSetUpAutoPay();
    await bankInformationPage.clickOncontinueToReviewYourLoan();
    await bankInformationPage.clickOnContinuetoLoanAgreement();
    
  });
});
