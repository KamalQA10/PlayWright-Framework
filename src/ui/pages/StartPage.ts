import { Page } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class StartPage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  private readonly applyNowButtonSelectors = [
    '//button[contains(text(), "Apply Now")]',
    'button:has-text("Apply Now")',
  ];

  async navigateToStartPage(): Promise<void> {
    await this.common.logStep('Navigate to start page', async () => {
      await this.common.goto('/');
    });
  }

  async applyNow(expectedUrlPattern: RegExp): Promise<Page> {
    return await this.common.logStep('Click on Apply Now & wait for new tab', async () => {
      return await this.common.clickAndWaitForNewTab(this.applyNowButtonSelectors, expectedUrlPattern);
    });
  }
}
