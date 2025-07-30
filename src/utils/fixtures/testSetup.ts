import { test as base, Browser, Page, BrowserContext, TestInfo } from '@playwright/test';
import StartPage from '@pages/StartPage';
import ApplyNowPage from '@pages/ApplyNowPage';
import ContactInformationPage from '@pages/ContactInformationPage';
import VerifyPhoneOtp from '@pages/VerifyPhoneOtp';
import { loadTestData } from '@utils/env';

type Fixtures = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  startPage: StartPage;
  applyNowPage: ApplyNowPage;
  contactInfoPage: ContactInformationPage;
  verifyPhoneOtp: VerifyPhoneOtp;
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
    const env = testInfo.project.name;
    const data = loadTestData(env);
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
});

export const expect = base.expect;
