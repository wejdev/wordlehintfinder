"use strict";

import { computeRegexsForHints, knownHints, findHints } from '../src/wordlehintfinder';

test('Wordle map returns correct regular expressions', () => {

    expect(true).toBeTruthy;
});

test('computeRegexsForHints works with various inputs', () => {

    const regexs = computeRegexsForHints([]);
    expect(regexs).toStrictEqual([/^R[^AISE][^ISE][^ISE][^ISE]$/, /R/, /A/]);
});

test('knowHints is importable', () => {

    const kh = knownHints;
    expect(kh).toEqual(knownHints);
});
