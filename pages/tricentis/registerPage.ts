import { Page } from '@playwright/test';
import { BasePage } from '../common/BasePage';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async getPageUrl(): Promise<string> {
    return await this.getUrl();
  }
}
