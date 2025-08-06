import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class VerifyPhoneOtp {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private readonly inputOTPSelector = '.otp-input';

  async enterOtp(otp: string): Promise<void> {
    await this.common.logStep('Enter OTP digits', async () => {
      const otpInputs = this.page.locator(this.inputOTPSelector);
      await otpInputs.first().waitFor({ state: 'visible', timeout: 10000 });

      for (let i = 0; i < otp.length; i++) {
        await otpInputs.nth(i).fill(otp[i]);
      }
    });
  }

  async verifyPhoneSuccess(expectedUrl: string | RegExp): Promise<void> {
    await this.common.waitForUrl(expectedUrl);
  }
}
