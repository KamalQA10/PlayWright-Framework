import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

export default class CommonActions {
  private page: Page;
  private defaultTimeout: number;

  constructor(page: Page) {
    this.page = page;
    this.defaultTimeout = 90000;
  }

  // For steps with no return value (void)
  async logStep(description: string, fn: () => Promise<void>): Promise<void> {
    await allure.step(description, fn);
  }

  // For steps with return value (generic)
  private async logStepWithResult<T>(description: string, fn: () => Promise<T>): Promise<T> {
    let result: T;
    await allure.step(description, async () => {
      result = await fn();
    });
    return result!;
  }

  private getLocator(selector: string): Locator {
    return selector.startsWith('//') || selector.startsWith('(')
      ? this.page.locator(`xpath=${selector}`)
      : this.page.locator(selector);
  }

  async waitFor(
    selector: string,
    timeout = this.defaultTimeout,
    retries = 3
  ): Promise<Locator> {
    const locator = this.getLocator(selector);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await locator.waitFor({ state: 'attached', timeout });

        const isVisible = await locator.isVisible();
        const isEnabled = await locator.isEnabled();

        if (isVisible && isEnabled) {
          return locator;
        }
      } catch {}

      if (attempt < retries) {
        await this.page.waitForTimeout(1000);
      }
    }

    throw new Error(`Element not ready for interaction: ${selector}`);
  }


  async waitForElementToBeClickable(selectors: string[] | string, timeout = this.defaultTimeout): Promise<void> {
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];

    for (const selector of selectorArray) {
      const locator = this.getLocator(selector);
      try {
        await locator.waitFor({ state: 'visible', timeout });
        if (await locator.isEnabled()) {
          return;
        }
      } catch {
      }
    }
    throw new Error(`None of the selectors became clickable: ${selectorArray.join(', ')}`);
  }

  async waitForUrl(expectedUrl: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await this.logStep(`Wait for URL to match: ${expectedUrl}`, async () => {
      await this.page.waitForURL(expectedUrl, { timeout });
    });
  }


  async waitForTitle(title: string, timeout = this.defaultTimeout): Promise<void> {
    await this.logStep(`Wait for title to contain: ${title}`, async () => {
      await this.page.waitForFunction(
        t => document.title.includes(t),
        title,
        { timeout }
      );
    });
  }

  async handleNewTab(selectors: string | string[], timeout?: number): Promise<Page> {
    return await this.logStepWithResult(`Handle new tab triggered by: ${selectors}`, async () => {
      const context = this.page.context();

      const pagePromise = context.waitForEvent('page');

      await this.click(selectors, timeout);

      const newPage = await pagePromise;
      await newPage.waitForLoadState('domcontentloaded');
      return newPage;
    });
  }


  async click(selectors: string | string[], timeout?: number): Promise<void> {
    await this.logStep(`Click on: ${selectors}`, async () => {
      for (const selector of selectors) {
        try {
          const locator = await this.waitFor(selector, timeout);
          await locator.click();
          return;
        } catch (error) {
          console.warn(`⚠️ Click failed for selector: ${selector}`);
        }
      }
      throw new Error("❌ Click failed: No valid selector found in [${selectors.join(', ')}]");
    }); 
  }

async selectVisibleDropdownOption(optionText: string, timeout = this.defaultTimeout): Promise<void> {
  await this.logStep(`Select visible dropdown option "${optionText}"`, async () => {
    const options = this.page.locator('div[role="option"]', { hasText: optionText });

    await options.first().waitFor({ state: 'visible', timeout });

    // Ensure it's truly interactable and not intercepted
    await this.page.waitForTimeout(500); // Allow UI animation to complete
    await options.first().scrollIntoViewIfNeeded();
    
    // Optional: add a bounding box check if needed
    const box = await options.first().boundingBox();
    if (!box || box.height === 0 || box.width === 0) {
      throw new Error(`Option "${optionText}" is not interactable`);
    }

    await options.first().click({ trial: true }).catch(() => {
      console.warn(`⚠️ Trial click failed for "${optionText}", retrying with force.`);
    });

    await options.first().click({ force: true }); // Fallback
  });
}


  async fillOneOf(selectors: string[], value: string, timeout = this.defaultTimeout): Promise<void> {
    await this.logStep(`Fill one of: ${selectors.join(', ')} with value: "${value}"`, async () => {
      for (const selector of selectors) {
        try {
          const locator = await this.waitFor(selector, timeout);
          await locator.fill(value);
          return;
        } catch {
          console.warn(`Failed to fill with selector: ${selector}`);
        }
      }
      throw new Error("No valid selector found for fill operation.");
    });
  }

  async getElementText(selector: string, timeout?: number): Promise<string> {
    return await this.logStepWithResult(`Get inner text of: ${selector}`, async () => {
      const locator = await this.waitFor(selector, timeout);
      return await locator.innerText();
    });
  }

  async type(selector: string, value: string, timeout?: number): Promise<void> {
    await this.logStep(`Type "${value}" into: ${selector}`, async () => {
      const locator = await this.waitFor(selector, timeout);
      await locator.type(value);
    });
  }

  async getCount(selector: string): Promise<number> {
    return await this.logStepWithResult(`Get count of elements matching: ${selector}`, async () => {
      const locator = this.getLocator(selector);
      return await locator.count();
    });
  }

  // etc...

  async logError(error: any, message = '') {
    console.error(`❌ ${message}:`, error.message);
    await this.takeScreenshot(`error-${Date.now()}.png`);
  }

  async takeScreenshot(path = `screenshot-${Date.now()}.png`) {
    await this.page.screenshot({ path, fullPage: true });
  }
}
