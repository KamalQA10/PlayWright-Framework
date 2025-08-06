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

  private generateRandomMobileNumber(base = '7722281'): string {
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
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `user${randomNum}@gmail.com`;
  }

  async enterEmail(): Promise<void> {
    const email = this.generateRandomEmail();

    await this.common.logStep(`Enter email: ${email}`, async () => {
      await this.common.fillOneOf(ContactInformationPage.emailAddressSelectors, email);
    });
  }

  async clickContinueToVerificationButton(): Promise<void> {
    await this.common.logStep('Click on Continue to Verification button', async () => {
      await this.common.click(ContactInformationPage.continueToVerificationButtonSelectors);
    });
  }
}
