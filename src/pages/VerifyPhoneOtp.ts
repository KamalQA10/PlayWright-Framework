import { Page } from '@playwright/test';
import CommonActions from '../utils/helper/CommonActions';

export default class VerifyPhoneOtp {

  private common: CommonActions;
  
  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

    private inputOTPSelector = ".otp-input";

    async enterOtp(otp: string): Promise<void> {
        await this.common.logStep(`Enter OTP`, async () => {
            const otpInputs = this.page.locator(this.inputOTPSelector);
            const firstInput = otpInputs.nth(0);
            await firstInput.waitFor({ state: 'visible', timeout: 10000 });
            for (let i = 0; i < otp.length; i++) {
                await otpInputs.nth(i).fill(otp[i]);
            }
        });
    }

    async verifyphonesuccess(expectedUrl: string): Promise<void> {
        await this.common.logStep(`Wait for verify-phone-success URL`, async () => {
            await this.common.waitForUrl(expectedUrl);
        });
    }

}