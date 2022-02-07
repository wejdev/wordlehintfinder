import { add, mul } from "../src/calc";

describe("test add function", () => {
    test.each(
        [
            [1, 1, 2],
            [-1, 2, 1],
            [2, 1, 3],
            [2, 3, 5],
            [10, 5, 15]
        ])(
            'add( %i, %i) should return %i', (a, b, expected) => {
                expect(add(a, b)).toBe(expected);
            },
        );
});


describe("test mul function", () => {
    it("should return 15 for mul(3,5)", () => {
        expect(mul(3, 5)).toBe(15);
    });
});
