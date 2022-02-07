import { add, mul } from "../src/calc";

describe("test add function", () => {
    it("should return 15 for add(10,5)", () => {
        expect(add(10, 5)).toBe(15);
    });

    it("should return 5 for add(2,3)", () => {
        expect(add(2, 3)).toBe(5);
    });

    it("should return 5 for add(2,3)", () => {
        expect(add(2, 3)).toBe(5);
    });

    test.each(
        [
            [1, 1, 2],
            [-1, 2, 1],
            [2, 1, 3]
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
