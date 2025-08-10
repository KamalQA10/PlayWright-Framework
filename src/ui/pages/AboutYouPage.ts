import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class AboutYouPage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private readonly dobInput = 'input[name="dob"]';
  private readonly ssnInput = 'input[name="ssn"]';
  private readonly seeYourOptionsButton = 'button[type="submit"]';


  async enterDOB(value: string): Promise<void> {
    await this.common.logStep('Enter DOB', async () => {
      await this.common.type(this.dobInput, value, 'DOB');
    });
  }

  async enterSSN(value: string): Promise<void> {
    await this.common.logStep('Enter SSN', async () => {
      await this.common.type(this.ssnInput, value, 'SSN');
    }); 
  }

  async clickSeeYourOptions(): Promise<void> {
    await this.common.logStep('Click On See Your Options Button', async () => {
      await this.common.click(this.seeYourOptionsButton);
    });
  }
}
