import { Page, Locator } from '@playwright/test';
import CommonActions from 'ui/Utils_UI/helper/CommonActions';

export default class OffersPage {
  private common: CommonActions;

  constructor(private page: Page) {
    this.common = new CommonActions(page);
  }

  // All locators defined here
  private readonly sliderSelector = '[role="slider"]';
  private readonly valueLabelSelector = 'div[data-side="top"] > span:first-child';
  private readonly sliderTrackSelector = `${this.sliderSelector} >> xpath=../..`;
  private readonly confirmOffersbutton = 'button:has-text("Confirm Offer")';
  private readonly letsGoButton = 'button:has-text("Let’s Go")';

    async selectOffer(targetValue: number): Promise<void> {
        const min = 3500;
        const max = 27664.2;

        if (targetValue < min || targetValue > max) {
        throw new Error(`❌ Value out of range: $${targetValue}`);
        }
        // Wait for slider
        const slider = this.page.locator(this.sliderSelector).first();
        await slider.waitFor({ state: 'visible', timeout: 90000 });

        // Get slider track box
        const track = this.page.locator(this.sliderTrackSelector);
        const trackBox = await track.boundingBox();
        if (!trackBox) throw new Error('❌ Slider track not found');

        // Move % to x position
        const percentage = (targetValue - min) / (max - min);
        const xOffset = trackBox.width * percentage;
        const thumbCenterY = trackBox.y + trackBox.height / 2;

        // Drag
        await this.page.mouse.move(trackBox.x + 1, thumbCenterY);
        await this.page.mouse.down();
        await this.page.mouse.move(trackBox.x + xOffset, thumbCenterY, { steps: 10 });
        await this.page.mouse.up();

        // Optionally log selected value
        const valueText = await this.page.locator(this.valueLabelSelector).textContent();
        console.log(`✅ Selected loan amount: ${valueText?.trim()}`);
    }

    private getNumericValue(text: string | null): number {
        return Number(text?.replace(/[^0-9]/g, '') || 0);
    }

    private async getDirection(label: Locator, targetValue: number): Promise<'left' | 'right'> {
        const currentText = await label.textContent();
        const currentValue = this.getNumericValue(currentText);
        return currentValue < targetValue ? 'right' : 'left';
    }

    async clickConfirmOffers(): Promise<void> {
        await this.common.logStep('Click On Confirm Offers Button', async () => {
            await this.common.click(this.confirmOffersbutton);
            //await this.page.waitForTimeout(90000);
        });
    }

    async clickOnLetsGoButton(): Promise<void> {
        await this.common.logStep("Click On Let's Go Button", async () => {
            await this.common.click(this.letsGoButton);
        });
    }
}
