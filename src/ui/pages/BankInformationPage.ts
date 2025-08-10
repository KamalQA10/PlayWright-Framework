import { Page, Locator } from '@playwright/test';
import { getActiveResourcesInfo } from 'process';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class BankInformationPage {
  
  constructor(private page: Page, private common: CommonActions) {
    this.common = new CommonActions(page);
  }

  // All locators defined here
    static connectBankAccountButton = 'button:has-text("Connect Bank Account")';
    static continueAsGuestButton = 'role=button[name="Continue as guest"]';
    static searchBankTestBox = 'role=textbox[name="Search"]';
    static banknamefound = 'role=button[name="First Platypus Bank"]';
    static banknameOnSearchList = 'xpath=(//button[@id="aut-ins_109508"])';
    static bankusernameTestBox = 'role=textbox[name="Username"]';
    static bankpasswordTestBox = 'role=textbox[name="Password"]';
    static bankuserpswdSubmitButton = 'button:has-text("Submit")';
    static bankaccntTypeSaving = 'role=button[name^="Savings"]';
    static bankaccntContinueButton = 'role=button[name="Continue"]';
    static bankaccntAllowButton = 'role=button[name="Allow"]';
    static bankaccntFinishWithoutSavingButton = 'role=button[name="Finish without saving"]';
    static setupRepaymentMethodButton = 'role=button[name="Set Up Autopay"]';
    static continueToReviewYourLoan = 'role=button[name="Continue to Review Your Loan"]';
    static ContinuetoLoanAgreementButton = 'role=button[name="Continue to Loan Agreement"]'

    async clickConfirmOffers(): Promise<void> {
        await this.common.logStep("Click On Connect Bank Account Button", async () => {
            await this.common.click(BankInformationPage.connectBankAccountButton);
        });
    }

    async clickOnContinueAsGuest(BankName: string, BankUsername: string, BankPassword: string): Promise<void> {
        await this.common.logStep("Step: IFRAME PAGE OPEN", async () => {
        const iframe = await this.common.GoToiFrame("Plaid Link");

            await this.common.logStep("1. Click on 'Continue as Guest'", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.continueAsGuestButton);
            });

            await this.common.logStep(`2. Enter bank name: ${BankName}`, async () => {
            await this.common.iframeFill(iframe, BankInformationPage.searchBankTestBox, BankName);
            });

            await this.common.logStep("3. Click on bank name found", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.banknamefound);
            });

            await this.common.logStep("4. Click on bank search list item", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.banknameOnSearchList);
            });

            await this.common.logStep("5. Fill bank username", async () => {
            await this.common.iframeFill(iframe, BankInformationPage.bankusernameTestBox, BankUsername);
            });

            await this.common.logStep("6. Fill bank password", async () => {
            await this.common.iframeFill(iframe, BankInformationPage.bankpasswordTestBox, BankPassword);
            });

            await this.common.logStep("7. Click on 'Submit' button", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.bankuserpswdSubmitButton);
            });

            await this.common.logStep("8. Select 'Savings' account", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.bankaccntTypeSaving);
            });

            await this.common.logStep("9. Click on 'Continue' button", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.bankaccntContinueButton);
            });

            await this.common.logStep("10. Click on 'Allow' button", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.bankaccntAllowButton);
            });

            await this.common.logStep("11. Click on 'Finish without saving' button", async () => {
            await this.common.iframeClick(iframe, BankInformationPage.bankaccntFinishWithoutSavingButton);
            });
        });
    }


    async clickOnSetUpAutoPay(): Promise<void> {
        await this.common.logStep("Click On SetUp AutoPay Button", async () => {
            await this.common.click(BankInformationPage.setupRepaymentMethodButton);
        });
    }

    async clickOncontinueToReviewYourLoan(): Promise<void> {
        await this.common.logStep("Click On Continue To Review Your Loan Button", async () => {
            await this.common.click(BankInformationPage.continueToReviewYourLoan);
        });
    }

    async clickOnContinuetoLoanAgreement(): Promise<void> {
        await this.common.logStep("Click On Continue to Loan Agreement Button", async () => {
            await this.common.click(BankInformationPage.ContinuetoLoanAgreementButton);
            await this.page.waitForTimeout(50000);
        });
    }


}