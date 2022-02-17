"use strict";

import path from "path";
import fs from "fs";

const __rootdirname = __dirname.substring(0, __dirname.lastIndexOf("/"));
const __inputdirname = __rootdirname + "input/";

const wordleWords = JSON.parse(fs.readFileSync(
    path.join(__inputdirname, "nytwordlewords.json"), "utf8"));

const answerWords = wordleWords
    .answerWords
    .map((w: string) => w.toUpperCase())
    .sort((n1: string, n2: string) => {
        return (n1 > n2) ? 1 : (n1 < n2) ? -1 : 0;
    });

const knownHints = JSON.parse(
    fs.readFileSync(path.join(__inputdirname, "hints.json"), "utf8"));

const replaceColumnState = (
    array: { correct: string, absent: string }[],
    index: number,
    items: { correct: string, absent: string }) =>
    [...array.slice(0, index), items, ...array.slice(index + 1)];

const computeRegexsForHints = (hints: { ch: string; state: string }[][]): RegExp[] => {
    let knownPresents: Set<string> = new Set();
    let columnStates: Array<{ correct: string, absent: string }> =
        new Array<{ correct: string, absent: string }>(5)
            .fill({ correct: "", absent: "" });

    hints.forEach((hintRow: { ch: string; state: string }[]) => {
        hintRow.forEach((hint, index) => {
            let currentLetter: string = hint.ch.toUpperCase();
            let currentState: string = hint.state.toUpperCase();

            switch (currentState) {
                case "ABSENT":
                case "DARKGRAY":
                case "D":
                case "GRAY":
                case "A":
                case "CHARCOAL":
                case "C":
                    columnStates = columnStates.map(cs => {
                        return {
                            correct: cs.correct,
                            absent: cs.absent + currentLetter
                        };
                    });
                    break;

                case "PRESENT":
                case "YELLOW":
                case "Y":
                    columnStates = replaceColumnState(
                        columnStates,
                        index,
                        {
                            correct: columnStates[index].correct,
                            absent: columnStates[index].absent + currentLetter
                        }
                    );
                    knownPresents.add(currentLetter);
                    break;

                case "CORRECT":
                case "GREEN":
                case "G":
                    columnStates = replaceColumnState(
                        columnStates,
                        index,
                        {
                            correct: currentLetter,
                            absent: columnStates[index].absent
                        }
                    );
                    knownPresents.add(currentLetter);
                    break;

                case "EMPTY":
                case "BLACK":
                case "B":
                case "K":
                default:
                    break;
            }
        });
    });

    const columnSpecificStrings = columnStates.map((cs, _) => {
        if (cs.correct)
            return cs.correct;
        else
            return '[^' + (cs.absent === '' ? ' ' : cs.absent) + ']';
    });
    const columnSpecificString = '^' + columnSpecificStrings.join('') + '$';
    let columnSpecificRegex = new RegExp(columnSpecificString, 'i');

    const presentLetterRegexs: RegExp[] = [];
    knownPresents.forEach(letter => presentLetterRegexs.push(new RegExp(letter, 'i')));

    return [columnSpecificRegex, ...presentLetterRegexs];
}

const findHints = (inputs: string[], wordleRegexs: RegExp[]) =>
    inputs.filter(line => wordleRegexs.every(regEx => regEx.test(line)));

const knownRegexs = computeRegexsForHints(knownHints);
const hints = findHints(answerWords, knownRegexs);
hints.forEach(item => console.log(item));

export { knownHints, computeRegexsForHints, wordleWords, findHints }
