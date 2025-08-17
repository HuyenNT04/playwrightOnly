import { expect, Locator, Page } from "@playwright/test";
import { step } from "./logging";
 
export class Assertion {
    @step('Assert equal')
    static assertEqual<T>(actual: T, expected: T, message?: string): void {
        expect.soft(actual, message ?? `Expected ${actual} to equal ${expected}`).toBe(expected);
    }
    @step('Asssert true')
    static assertTrue<T>(actual: boolean, message?: string): void {
        expect.soft(actual, message ?? `Actual ${actual} is not true now`).toBeTruthy();
    }
    @step('Assert false')
    static assertFalse(actual: boolean, message?: string): void {
        expect.soft(actual, message ?? `Actual ${actual} is not false now`).toBeFalsy();
    }
 
    @step('Assert contains in array')
    static assertContainsObject<T>(actual: T[], expected: T, message?: string): void {
        expect.soft(actual, message ?? `Expected ${JSON.stringify(actual)} to contain ${expected}`).toContain(expected);
    }
    @step('Assert contains text')
    static assertContainsText<T>(actual: string, expected: string, message?: string): void {
        expect.soft(actual, message ?? `Expected text to contain ${expected}`).toContain(expected);
    }
    @step('Assert greater than')
    static assertGreaterThan(actual: number, expected: number, message?: string): void {
        expect.soft(actual > expected, message ?? `Expected ${actual} to be greater than ${expected}`).toBeTruthy();
    }
 
    @step('Assert less than')
    static assertLessThan(actual: number, expected: number, message?: string): void {
        expect.soft(actual < expected, message ?? `Expected ${actual} to be less than ${expected}`).toBeTruthy();
    }
    @step('Assert to have URL')
    static async assertToHaveUrl(actual: Page, expected: string, message?: string): Promise<void> {
        await expect.soft(actual, message ?? 'Actual is not expected URL').toHaveURL(expected);
    }
}