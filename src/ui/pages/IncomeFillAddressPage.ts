import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class IncomeFillAddressPage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private addressInput = 'input[name="address"]';
  private cityInput = 'input[name="city"]';
  private stateDropDownButton = '//button[@role="combobox" and .//label[text()="State"]]';
  private zipCodeInput = 'input[name="zipCode"]';
  private continueToYourIncomeButton = 'button[type="submit"]';

  async enterAddress(value: string): Promise<void> {
    await this.common.logStep(`Enter Address field`, async () => {
      await this.common.type(this.addressInput, value);
    });
  }

  async enterCity(value: string): Promise<void> {
    await this.common.logStep(`Enter City field`, async () => {
      await this.common.type(this.cityInput, value);
    });
  }

  async clickOnStateDropDownButton(optionDropDownText: string): Promise<void> {
    await this.common.logStep(`Click on DropDown & Select State`, async () => {
      await this.common.click(this.stateDropDownButton);
      await this.common.selectVisibleDropdownOption(optionDropDownText);
    });
  }

  async enterZipCode(value: string): Promise<void> {
    await this.common.logStep(`Enter Zip Code`, async () => {
      await this.common.type(this.zipCodeInput, value);
    });
  }

  async clickOnContinueToYourIncomeButton(): Promise<void> {
    await this.common.logStep(`Click On Continue to Your Income Button`, async () => {
      await this.common.click(this.continueToYourIncomeButton);
    });
  }
}
