import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class YourIncomePage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private readonly annualIncomeInput = 'input[name="annualIncome"]';
  private readonly incomeTypeDropdownButton = '//button[@role="combobox" and .//label[text()="Income Type"]]';
  private readonly companyNameInput = 'input[name="companyName"]';
  private readonly continueToAboutYouButton = 'button[type="submit"]';

  async enterAnnualIncome(value: string): Promise<void> {
    await this.common.type(this.annualIncomeInput, value, 'Annual Income');
  }

  async selectEmploymentType(optionText: string): Promise<void> {
    await this.common.logStep('Select Employment Type', async () => {
      await this.common.click(this.incomeTypeDropdownButton);
      await this.common.selectVisibleDropdownOption(optionText);
    });
  }

  async enterCompanyName(value: string): Promise<void> {
    await this.common.type(this.companyNameInput, value, 'Company Name');
  }

  async clickContinueToAboutYou(): Promise<void> {
    await this.common.click(this.continueToAboutYouButton);
  }
}
