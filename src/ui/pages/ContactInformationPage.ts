import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class ContactInformationPage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  /* Selectors */
  private readonly mobilePhoneSelectors = [
    'input[name="phone"]',
    'input[inputmode="tel"]',
    '//input[@name="phone"]'
  ];

  private readonly emailAddressSelectors = [
    'input[name="email"]',
    'input[inputmode="email"]',
    '//input[@name="email"]'
  ];

  private readonly continueToVerificationButtonSelectors = [
    'button:has-text("Continue to Verification")',
    '//button[contains(text(), "Continue to Verification")]',
    '[role="button"][name="Continue to Verification"]'
  ];

  /* Actions */
  async enterMobilePhone(): Promise<void> {
    const baseNumber = '7722281';
    const randomSuffix = Math.floor(100 + Math.random() * 900); // generates 3-digit random number
    const mobileNumber = baseNumber + randomSuffix;

    await this.common.logStep(`Enter mobile phone number: ${mobileNumber}`, async () => {
      await this.common.fillOneOf(this.mobilePhoneSelectors, mobileNumber);
    });
  }

  async enterEmail(): Promise<void> {
    const email = '001ksb@gmail.com';

    await this.common.logStep(`Enter email: ${email}`, async () => {
      await this.common.fillOneOf(this.emailAddressSelectors, email);
    });
  }

  async clickContinueToVerificationButton(): Promise<void> {
    await this.common.logStep(`Click on Continue to Verification button`, async () => {
      //await this.common.waitForElementToBeClickable(this.continueToVerificationButtonSelectors);
      await this.common.click(this.continueToVerificationButtonSelectors);
    });
  }
}
