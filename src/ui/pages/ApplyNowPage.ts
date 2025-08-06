import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class ApplyNowPage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  /* Selectors */
  private readonly firstNameInputSelectors = [
    'input[name="firstName"]',
    'input[placeholder="Input Place Holder"]',
    "//*[@class='flex gap-3 mt-8']/div[1]/div"
  ];

  private readonly lastNameInputSelectors = [
    'input[name="lastName"]'
  ];

  private readonly loanAmountInputSelectors = [
    'input[name="desiredLoanAmount"]'
  ];

  private readonly loanPurposeDropDownSelectors = [
    'svg[class*="chevron-down"]',
    '//svg[contains(@class, "chevron-down")]'
  ];

  private readonly continueToContactButtonSelectors = [
    'button:has-text("Continue to Contact Information")',
    '//button[contains(text(),"Continue to Contact Information")]',
    '[role="button"][name="Continue to Contact Information"]'
  ];

  /* Actions */
  async enterFirstName(firstName: string): Promise<void> {
    await this.common.logStep(`Enter first name: ${firstName}`, async () => {
      await this.common.fillOneOf(this.firstNameInputSelectors, firstName);
    });
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.common.logStep(`Enter last name: ${lastName}`, async () => {
      await this.common.fillOneOf(this.lastNameInputSelectors, lastName);
    });
  }

  async enterLoanAmount(loanAmount: string): Promise<void> {
    await this.common.logStep(`Enter loan amount: ${loanAmount}`, async () => {
      await this.common.fillOneOf(this.loanAmountInputSelectors, loanAmount);
    });
  }

  async selectLoanPurpose(optionText: string): Promise<void> {
    await this.common.logStep(`Select loan purpose: ${optionText}`, async () => {
      await this.common.click(this.loanPurposeDropDownSelectors);
      await this.common.selectVisibleDropdownOption(optionText);
    });
  }

  async clickContinueToContactButton(): Promise<void> {
    await this.common.logStep(`Click on Continue to Contact Information button`, async () => {
      await this.common.click(this.continueToContactButtonSelectors);
    });
  }
}
