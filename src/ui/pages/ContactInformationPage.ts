import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class ContactInformationPage {
  private common: CommonActions;

  private static readonly mobilePhoneSelectors = [
    'input[name="phone"]',
    'input[inputmode="tel"]',
    '//input[@name="phone"]',
  ];

  private static readonly emailAddressSelectors = [
    'input[name="email"]',
    'input[inputmode="email"]',
    '//input[@name="email"]',
  ];

  private static readonly continueToVerificationButtonSelectors = [
    'button:has-text("Continue to Verification")',
    '//button[contains(text(), "Continue to Verification")]',
    '[role="button"][name="Continue to Verification"]',
  ];

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private generateRandomMobileNumber(base = '9183526'): string {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    return `${base}${randomSuffix}`;
  }

  async enterMobilePhone(): Promise<void> {
    const mobileNumber = this.generateRandomMobileNumber();

    await this.common.logStep(`Enter mobile phone number: ${mobileNumber}`, async () => {
      await this.common.fillOneOf(ContactInformationPage.mobilePhoneSelectors, mobileNumber);
    });
  }

  private generateRandomEmail(): string {
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 4-digit random number
    return `kbisht${randomNum}@lendingpoint.com`;
  }

  async enterEmail(): Promise<void> {
    const email = this.generateRandomEmail();

    await this.common.logStep(`Enter email: ${email}`, async () => {
      await this.common.fillOneOf(ContactInformationPage.emailAddressSelectors, "kbisht@lendingpoint.com");
    });
  }

  async clickContinueToVerificationButton(): Promise<void> {
    await this.common.logStep('Click on Continue to Verification button', async () => {
      await this.common.click(ContactInformationPage.continueToVerificationButtonSelectors);
    });
  }
}
