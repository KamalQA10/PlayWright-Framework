import { test as base, Browser, Page, BrowserContext, TestInfo } from '@playwright/test';
import { 
          StartPage, ApplyNowPage, ContactInformationPage, VerifyPhoneOtp, IncomeFillAddressPage,
          YourIncomePage, AboutYouPage, OffersPage, BankInformationPage
        } from '@pages';
import { loadTestData } from '@config_UI/dataConfigUI';

type Fixtures = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  startPage: StartPage;
  applyNowPage: ApplyNowPage;
  contactInfoPage: ContactInformationPage;
  verifyPhoneOtp: VerifyPhoneOtp;
  incomeFillAddressPage: IncomeFillAddressPage;
  yourIncomePage: YourIncomePage;
  aboutYouPage: AboutYouPage;
  offersPage: OffersPage;
  bankInformationPage: BankInformationPage;
  testData: any;
  newTabPage: Page;
};

export const test = base.extend<Fixtures>({

  context: async ({ browser }, use: (context: BrowserContext) => Promise<void>) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  page: async ({ context }, use: (page: Page) => Promise<void>) => {
    const page = await context.newPage();
    await use(page);
  },

  testData: async ({}, use: (data: any) => Promise<void>, testInfo: TestInfo) => {
    const data = loadTestData(process.env.TEST_ENV ||'');
    await use(data);
  },

 startPage: async ({ page }, use) => {
    const startPage = new StartPage(page);
    await startPage.navigateToStartPage();
    await use(startPage);
  },

  newTabPage: async ({ startPage }, use) => {
    const newTab = await startPage.applyNow(/apply/);
    await use(newTab);
  },

  applyNowPage: async ({ newTabPage }, use) => {
    const applyNow = new ApplyNowPage(newTabPage);
    await use(applyNow);
  },

  contactInfoPage: async ({ newTabPage }, use) => {
    const contact = new ContactInformationPage(newTabPage);
    await use(contact);
  },

  verifyPhoneOtp: async ({ newTabPage }, use) => {
    const otp = new VerifyPhoneOtp(newTabPage);
    await use(otp);
  },

  incomeFillAddressPage: async ({ newTabPage }, use) => {
    const yourAddress = new IncomeFillAddressPage(newTabPage);
    await use(yourAddress);
  },

  yourIncomePage: async ({ newTabPage }, use) => {
    const yourIncome = new YourIncomePage(newTabPage);
    await use(yourIncome);
  },

  aboutYouPage: async ({ newTabPage }, use) => {
    const aboutYou = new AboutYouPage(newTabPage);
    await use(aboutYou);
  },

  offersPage: async ({ newTabPage }, use) => {
    const offers = new OffersPage(newTabPage);
    await use(offers);
  },

  bankInformationPage: async ({ newTabPage }, use) => {
    const bankInformation = new BankInformationPage(newTabPage);
    await use(bankInformation);
  }

});

export const expect = base.expect;
