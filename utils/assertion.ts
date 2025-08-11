import { expect } from "@playwright/test";
import { step } from "./logging";

export class Assertion {
    @step('Assert Equal')
    static assertEqual<T>(actual: T, expected: T, message?: string): void {
        expect.soft(actual, message ?? `Expected ${actual} to equal ${expected}`).toBe(expected);
    }
}
