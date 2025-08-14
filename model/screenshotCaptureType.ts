import { Locator } from "@playwright/test";
 
export interface ScreenshotOptions {
    fullPage?: boolean;
    mask?: Locator[];
    maxDiffPixels?: number;
    maxDiffPixelRatio?: number;
    threshold?: number;
}