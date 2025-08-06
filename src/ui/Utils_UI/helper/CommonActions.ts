import { Page, Locator } from '@playwright/test';

export default class CommonActions {
  private page: Page;
  private defaultTimeout = 30000;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
  await this.logStep(`Navigate to URL: ${url}`, async () => {
    await this.page.goto(url, { waitUntil, timeout: this.defaultTimeout });
  });
}

async logStep<T>(
  stepName: string,
  action: () => Promise<T>,
  logOnlyOnFailure: boolean = false  // <-- NEW param
): Promise<T> {
  if (!logOnlyOnFailure) {
    console.log(`➡️ ${stepName}`);
  }

  try {
    const result = await action();
    if (!logOnlyOnFailure) {
      console.log(`✅ ${stepName}`);
    }
    return result;
  } catch (error) {
    console.error(`❌ ${stepName}`);
    throw error;
  }
}


  async clickAndWaitForNewTab(
    selectors: string | string[],
    expectedUrlPattern: string | RegExp,
    timeout = this.defaultTimeout
  ): Promise<Page> {
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];

    return await this.logStep(
      `Click on one of: ${selectorArray.join(' | ')} and wait for new tab matching ${expectedUrlPattern}`,
      async () => {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page', { timeout }),
          (async () => {
            for (const selector of selectorArray) {
              try {
                const locator = await this.waitFor(selector, timeout);
                await locator.click();
                return;
              } catch {}
            }
            throw new Error(`Click failed for selectors: ${selectorArray.join(', ')}`);
          })(),
        ]);
        await newPage.waitForLoadState('load');
        await newPage.waitForURL(expectedUrlPattern, { timeout });

        return newPage;
      }
    );
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
        await locator.waitFor({ state: 'attached', timeout });
        if (await locator.isVisible() && await locator.isEnabled()) {
          return locator;
        }
      } catch {
        console.warn(`Attempt ${attempt} failed for: ${selector}`);
      }

      if (attempt < retries) {
        await this.page.waitForTimeout(1000);
      }
    }

    throw new Error(`❌ Element not ready: ${selector}`);
  }

  async click(selectors: string | string[], timeout?: number, retries = 1): Promise<void> {
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];

    await this.logStep(`Clicking on: ${selectorArray.join(' | ')}`, async () => {
      for (const selector of selectorArray) {
        try {
          const locator = await this.waitFor(selector, timeout ?? this.defaultTimeout, retries);
          await locator.click();
          return;
        } catch {}
      }
      throw new Error(`Click failed for: ${selectorArray.join(', ')}`);
    });
  }

  async fillOneOf(selectors: string[], value: string, label?: string, timeout = this.defaultTimeout): Promise<void> {
  const stepLabel = label
    ? `Fill ${label} with value: "${value}"`
    : `Fill one of: ${selectors.join(', ')} with value: "${value}"`;

  await this.logStep(stepLabel, async () => {
    for (const selector of selectors) {
      try {
        const locator = await this.waitFor(selector, timeout);
        await locator.fill(value);
        return;
      } catch {
        console.warn(`⚠️ Failed to fill with selector: ${selector}`);
      }
    }
    throw new Error("❌ No valid selector found for fill operation.");
  });
}

  async type(selector: string, value: string, label?: string): Promise<void> {
    const stepLabel = label ? `Type into ${label}` : `Type into ${selector}`;
    await this.logStep(stepLabel, async () => {
      const locator = await this.waitFor(selector);
      await locator.type(value);
    });
  }

  async selectVisibleDropdownOption(optionText: string, timeout = this.defaultTimeout): Promise<void> {
    await this.logStep(`Select dropdown option: ${optionText}`, async () => {
      const option = this.page.locator('div[role="option"]', { hasText: optionText });
      await option.first().waitFor({ state: 'visible', timeout });
      await option.first().scrollIntoViewIfNeeded();
      await option.first().click({ force: true });
    });
  }

  async waitForUrl(expectedUrl: string | RegExp, timeout = this.defaultTimeout): Promise<void> {
    await this.logStep(`Wait for URL: ${expectedUrl}`, async () => {
      await this.page.waitForURL(expectedUrl, { timeout });
    });
  }
}
