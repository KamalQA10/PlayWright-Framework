import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';
import VerifyPhoneOtp from './VerifyPhoneOtp';

export default class ContactInformationPage {

  private common: CommonActions;
  
  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private readonly mobilePhoneSelectors = ['input[name="phone"]', 'input[inputmode="tel"]', '//input[@name="phone"]'  ];
  private readonly emailAddressSelectors = ['input[name="email"]', 'input[inputmode="email"]', '//input[@name="email"]'  ];
  private readonly continueToVerificationButtonSelectors = ['button:has-text("Continue to Verification")','//button[contains(text(), "Continue to Verification")]','[role="button"][name="Continue to Verification"]'];

  async entermobilePhone(): Promise<void> {
    const baseNumber = "7722281";
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedPhone =  baseNumber + randomSuffix;

    await this.common.logStep(`Enter mobilePhone number: ${generatedPhone}`, async () => {
      await this.common.fillOneOf(this.mobilePhoneSelectors, generatedPhone);
    });
  }

    async enterEmail(): Promise<void> {
      const generatedEmail = '001ksb@gmail.com';
      //const generatedEmail = `kamal+${Date.now()}@lendingpoint.com`;
      await this.common.logStep(`Enter EmailId: ${generatedEmail}`, async () => {
        await this.common.fillOneOf(this.emailAddressSelectors, generatedEmail);
      });
    }

    async clickcontinueToVerificationButton(){
      await this.common.logStep(`click On continue To Verification Button`, async () => {
        await this.common.waitForElementToBeClickable(this.continueToVerificationButtonSelectors);
        await this.common.click(this.continueToVerificationButtonSelectors);
      });
    } 

}