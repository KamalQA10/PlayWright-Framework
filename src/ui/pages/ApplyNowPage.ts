import { Page } from '@playwright/test';
import ContactInformationPage from 'ui/pages/ContactInformationPage';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class ApplyNowPage {
  private common: CommonActions;

  constructor(private page: Page) { this.common = new CommonActions(page); } 

    private readonly firstnameInputSelectors = 
        ['input[name="firstName"]', 'input[placeholder="Input Place Holder"]', "//*[@class='flex gap-3 mt-8']/div[1]/div"];
    private readonly lastnameInputSelectors = 
        ['input[name="lastName"]',];
    private readonly loanAmountInputSelectors = 
        ['input[name="desiredLoanAmount"]',];
    private readonly loanPurposeDropDownSelectors = 
        ['svg[class*="chevron-down"]','//svg[contains(@class, "chevron-down")]'];
    private readonly continueToContactButtonSelectors = 
        [
            'button:has-text("Continue to Contact Information")',
            '//button[contains(text(),"Continue to Contact Information")]',
            '[role="button"][name="Continue to Contact Information"]'
        ];

    /* Actions */  
    async enterfirstName(firstName: string): Promise<void> {
        return await this.common.logStep(`Enter first name: ${firstName}`, async () => {
            await this.common.fillOneOf(this.firstnameInputSelectors, firstName);
        });
    }

    async enterlasttName(lastName: string): Promise<void> {
        await this.common.logStep(`Enter last name: ${lastName}`, async () => {
            await this.common.fillOneOf(this.lastnameInputSelectors, lastName);
        });
    }

    async enterloanAmount(loanAmount: string): Promise<void> {
        await this.common.logStep(`Enter last name: ${loanAmount}`, async () => {
            await this.common.fillOneOf(this.loanAmountInputSelectors, loanAmount);
        });
    }

    async clickOnLoanPurposeDropDownButton(optionDropDownText: string): Promise<void> {
        await this.common.logStep(`click On Loan Purpose Drop Button`, async () => {
            await this.common.click(this.loanPurposeDropDownSelectors);
            await this.common.selectVisibleDropdownOption(optionDropDownText);
        });
    }  

    async clickOncontinueToContactButton(){
        await this.common.logStep(`click On continue To Contact Button`, async () => {
            await this.common.click(this.continueToContactButtonSelectors);
        });
    } 

}