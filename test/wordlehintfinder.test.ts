"use strict";

import { findHints, computeRegexsForHints } from '../src/wordlehintfinder';

const computeRegexsForHintsInputs: { hints: { ch: string; state: string }[][]; expected: RegExp[]; }[] =
    [
        {
            hints: [],
            expected: [/^[^ ][^ ][^ ][^ ][^ ]$/i]
        },
        {
            hints: [
                []
            ],
            expected: [/^[^ ][^ ][^ ][^ ][^ ]$/i]
        },
        {
            hints: [
                [
                    { "ch": "", "state": "empty" }
                ]
            ],
            expected: [/^[^ ][^ ][^ ][^ ][^ ]$/i]
        },
        {
            hints: [
                [
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" }
                ]
            ],
            expected: [/^[^ ][^ ][^ ][^ ][^ ]$/i]
        },
        {
            hints: [
                [
                    { "ch": "R", "state": "absent" },
                    { "ch": "A", "state": "present" },
                    { "ch": "I", "state": "absent" },
                    { "ch": "S", "state": "absent" },
                    { "ch": "E", "state": "absent" }
                ]
            ],
            expected: [
                /^[^RISE][^RAISE][^RISE][^RISE][^RISE]$/i,
                /A/i
            ]
        },
        {
            hints: [
                [
                    { "ch": "R", "state": "correct" },
                    { "ch": "A", "state": "present" },
                    { "ch": "I", "state": "absent" },
                    { "ch": "S", "state": "absent" },
                    { "ch": "E", "state": "absent" }
                ]
            ],
            expected: [
                /^R[^AISE][^ISE][^ISE][^ISE]$/i,
                /R/i,
                /A/i
            ]
        },
        {
            hints: [
                [
                    { "ch": "I", "state": "DARKGRAY" },
                    { "ch": "R", "state": "DARKGRAY" },
                    { "ch": "A", "state": "YELLOW" },
                    { "ch": "T", "state": "DARKGRAY" },
                    { "ch": "E", "state": "DARKGRAY" }
                ]
            ],
            expected: [
                /^[^IRTE][^IRTE][^IRATE][^IRTE][^IRTE]$/i,
                /A/i
            ]
        },
        {
            hints: [
                [
                    { "ch": "I", "state": "DARKGRAY" },
                    { "ch": "R", "state": "DARKGRAY" },
                    { "ch": "A", "state": "YELLOW" },
                    { "ch": "T", "state": "DARKGRAY" },
                    { "ch": "E", "state": "DARKGRAY" }
                ],
                [
                    { "ch": "S", "state": "DARKGRAY" },
                    { "ch": "U", "state": "YELLOW" },
                    { "ch": "M", "state": "DARKGRAY" },
                    { "ch": "A", "state": "YELLOW" },
                    { "ch": "C", "state": "YELLOW" }
                ],
                [
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" }
                ]
            ],
            expected: [
                /^[^IRTESM][^IRTESUM][^IRATESM][^IRTESMA][^IRTESMC]$/i,
                /A/i,
                /U/i,
                /C/i,
            ]
        },
        {
            hints: [
                [
                    { "ch": "I", "state": "DARKGRAY" },
                    { "ch": "R", "state": "DARKGRAY" },
                    { "ch": "A", "state": "YELLOW" },
                    { "ch": "T", "state": "DARKGRAY" },
                    { "ch": "E", "state": "DARKGRAY" }
                ],
                [
                    { "ch": "S", "state": "DARKGRAY" },
                    { "ch": "U", "state": "YELLOW" },
                    { "ch": "M", "state": "DARKGRAY" },
                    { "ch": "A", "state": "YELLOW" },
                    { "ch": "C", "state": "YELLOW" }
                ],
                [
                    { "ch": "S", "state": "G" },
                    { "ch": "U", "state": "G" },
                    { "ch": "M", "state": "G" },
                    { "ch": "A", "state": "G" },
                    { "ch": "C", "state": "G" }
                ],
                [
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" }
                ],
                [
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" },
                    { "ch": "", "state": "empty" }
                ]
            ],
            expected: [
                /^SUMAC$/i,
                /A/i,
                /U/i,
                /C/i,
                /S/i,
                /M/i
            ]
        }
    ];

test.each(computeRegexsForHintsInputs)
    ('computeRegexsForHints returns correct regular expressions', (inputs) => {
        const { hints, expected } = inputs;

        const actual = computeRegexsForHints(hints);

        expect(actual).toEqual(expected);
    });


const findHintsInputs =
    [
        {
            words: [],
            regexs: [],
            expected: []
        },
        {
            words: ["", ""],
            regexs: [/./],
            expected: []
        },
        {
            words: ["TOM", "DICK", "HARRY"],
            regexs: [/.*/],
            expected: ["TOM", "DICK", "HARRY"]
        },
        {
            words: ["TOM", "DICK", "HARRY"],
            regexs: [/T/],
            expected: ["TOM"]
        },
        {
            words: ["tom", "dick", "harry"],
            regexs: [/t/i],
            expected: ["tom"]
        },
        {
            words: ["cozie", "craal", "crabs", "crags", "craic", "craig", "crake"],
            regexs: [/A/i],
            expected: ["craal", "crabs", "crags", "craic", "craig", "crake"]
        },
        {
            words: ["cozie", "craal", "crabs", "crags", "craic", "craig", "crake"],
            regexs: [/^C[^Z][^BC][^AI][a-z]/i, /A/i],
            expected: ["crabs", "crags", "crake"]
        },
        {
            words: ["cozie", "craal", "crabs", "crags", "craic", "craig", "crake"],
            regexs: [/^C[^Z][^BC][AI][^LEC]$/i, /A/i],
            expected: ["craig"]
        }
    ];

test.each(findHintsInputs)
    ('findHints figures out correct hints', (inputs) => {
        const { words, regexs, expected } = inputs;

        const actual = findHints(words, regexs);

        expect(actual).toEqual(expected);
    });
