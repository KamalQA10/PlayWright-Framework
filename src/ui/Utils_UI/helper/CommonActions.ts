import { Page, Locator, Frame, FrameLocator  } from '@playwright/test';

export default class CommonActions {
  private page: Page;
  private defaultTimeout = 60000;

  constructor(page: Page) {this.page = page;}

  async logStep<T>(stepName: string,action: () => Promise<T>,logOnlyOnFailure: boolean = false): Promise<T> {
    if (!logOnlyOnFailure) console.log(`➡️ :- Trying to ${stepName}`);

    try {
      const result = await action();
      if (!logOnlyOnFailure) console.log(`✅ *****${stepName} Sucessfully*****`);
      return result;
    } catch (error) {
      console.error(`❌ ${stepName}`);
      throw error;
    }
  }

    async goto(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
      await this.page.goto(url, { waitUntil, timeout: this.defaultTimeout });
    }

    async clickAndWaitForNewTab(selectors: string | string[],expectedUrlPattern: string | RegExp,timeout = this.defaultTimeout): Promise<Page> {
      const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
      const [newPage] = await Promise.all([this.page.context().waitForEvent('page', { timeout }),this.click(selectorArray, timeout),]);
      await newPage.waitForLoadState('load');
      await newPage.waitForURL(expectedUrlPattern, { timeout });
      return newPage;
    }

    private getLocator(selector: string): Locator {
      return selector.startsWith('//') || selector.startsWith('(')
        ? this.page.locator(`xpath=${selector}`)
        : this.page.locator(selector);
    }

    async waitFor(selector: string, timeout = this.defaultTimeout, retries = 1): Promise<Locator> {
      const locator = this.getLocator(selector);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          await locator.waitFor({ state: 'visible', timeout });

          const enabled = await locator.isEnabled();
          if (enabled) return locator;
        } catch (error) {
          console.warn(`⚠️ Wait failed for selector: ${selector} — Attempt ${attempt}/${retries}`);
        }
        if (attempt < retries) {
          await this.page.waitForTimeout(1000); // small retry delay
        }
      }
      throw new Error(`❌ Element not ready: ${selector}`);
    }

    async waitForElement(locator: Locator | string, timeout = this.defaultTimeout): Promise<void> {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      await element.waitFor({ state: 'visible', timeout });
    }

    async getText(locator: Locator | string): Promise<string | null> {
      const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
      return await element.textContent();
    }

    async dragTo(page: Page, fromX: number, fromY: number, toX: number, toY: number): Promise<void> {
      await page.mouse.move(fromX, fromY);
      await page.mouse.down();
      await page.mouse.move(toX, toY, { steps: 10 });
      await page.mouse.up();
    }

    async click(selectors: string | string[], timeout = this.defaultTimeout, retries = 1): Promise<void> {
      const selectorArray = Array.isArray(selectors) ? selectors : [selectors];
      for (const selector of selectorArray) {
        try {
          const locator = await this.page.waitForSelector(selector, {
            state: 'visible',
            timeout,
          });
          await locator.waitForElementState('stable', { timeout });
          await locator.waitForElementState('enabled', { timeout });

          await locator.click();
          return;
        } catch (error) {
          if (--retries > 0) {
            await this.page.waitForTimeout(500);
            return this.click(selectorArray, timeout, retries);
          } else {
            throw new Error(`Click failed for: ${selector}\n\n${error}`);
          }
        }
      }
      throw new Error(`Click failed for all selectors: ${selectorArray.join(', ')}`);
    }

    async fillOneOf(selectors: string[],value: string,label?: string,timeout = this.defaultTimeout): Promise<void> {
      const stepLabel = label
      ? `Fill ${label} with value: "${value}"`
      : `Fill one of: ${selectors.join(', ')} with value: "${value}"`;
      for (const selector of selectors) {
        const locator = await this.waitFor(selector, timeout);
        await locator.fill(value);
        return;
      }
      throw new Error("❌ No valid selector found for fill operation.");
    }

    async type(selector: string, value: string, label?: string): Promise<void> {
      const stepLabel = label ? `Type into ${label}` : `Type into ${selector}`;
      const locator = await this.waitFor(selector);
      await locator.type(value);
    }

    async selectVisibleDropdownOption(optionText: string, timeout = this.defaultTimeout): Promise<void> {
      const option = this.page.locator('div[role="option"]', { hasText: optionText });
      const target = option.first();
      await target.waitFor({ state: 'visible', timeout });
      await target.scrollIntoViewIfNeeded();
      await target.click({ force: true });
    }

    async waitForUrl(expectedUrl: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
      await this.page.waitForURL(expectedUrl, { timeout });
    }

    async GoToiFrame(iframeTitle: string): Promise<FrameLocator> {
      const iframeSelector = `iframe[title="${iframeTitle}"]`;
      await this.page.waitForSelector(iframeSelector, {state: 'visible',timeout: this.defaultTimeout,});
      const frameLocator = this.page.frameLocator(iframeSelector);
      return frameLocator;
    }

    async iframeClick(frame: FrameLocator,selector: string,timeout = this.defaultTimeout): Promise<void> {
      const element = frame.locator(selector);
      await element.waitFor({ state: 'visible', timeout });
      await element.click();
    }

    async iframeFill(frame: FrameLocator,selector: string,InputText: string,timeout = this.defaultTimeout): Promise<void> {
      const element = frame.locator(selector);
      await element.waitFor({ state: 'visible', timeout });
      await element.fill(InputText);
    }
} 