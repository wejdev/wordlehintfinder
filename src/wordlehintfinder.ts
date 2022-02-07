"use strict";

import path from "path";
import fs from "fs";

const __rootdirname = __dirname.substring(0, __dirname.lastIndexOf("/"));
const __inputdirname = __rootdirname + "input/";

export const wordleWords = JSON.parse(fs.readFileSync(
    path.join(__inputdirname, "wordlewords.json"), "utf8"));
const answerWords = wordleWords
    .answerWords
    .map((w: string) => w.toUpperCase())
    .sort((n1: string, n2: string) => {
        return (n1 > n2) ? 1 : (n1 < n2) ? -1 : 0;
    });

export const knownHints = JSON.parse(
    fs.readFileSync(path.join(__inputdirname, "hints.json"), "utf8"));

export const computeRegexsForHints = (knowHints: any[]): RegExp[] => {
    // let knownAbsents: Array<string>n = [];
    // let knownPresents: Array<string> = [];
    // let columnStates: Array<{ index: number, correct: string, absent: string[] }> = new Array[5];

    // knowHints.forEach((hintRow: any[]) => {
    //     hintRow.forEach((hint, index) => {
    //         let currentLetter = hint.ch.toUpperCase();
    //         let currentState = hint.state.toUpperCase();

    //         switch (currentState) {
    //             case "ABSENT":
    //             case "DARKGRAY":
    //                 knownAbsents.push(currentLetter);
    //                 break;

    //             case "PRESENT":
    //             case "YELLOW":
    //                 columnStates[index].push(currentLetter);
    //                 knownPresents.push(currentLetter);
    //                 columnStates[index].absent.push(currentLetter);
    //                 break;

    //             case "CORRECT":
    //             case "GREEN":
    //                 knownPresents.push(currentLetter);
    //                 columnStates[index].correct =currentLetter;
    //                 break;

    //             default:
    //             case "EMPTY":
    //             case "BLACK":
    //                 break;
    //         }
    //     });
    // });
    //
    // console.log('----------');

    // let absentLetterRegex = new RegExp('^' + knownAbsents.join(''));
    // console.log(knownAbsents.join(''));
    // console.log(absentLetterRegex);
    // console.log('----------');

    // let presentLetterRegexs = knownPresents.map(letter => new RegExp(letter));
    // console.log(knownPresents.join(''));
    // console.log(presentLetterRegexs);
    // console.log('----------');

    let regexs: Array<RegExp> = [];
    regexs.push(/^S[^RATEWINDYPO][^RATEWNDYPO][^RATEWNDYPOI]L$/);
    regexs.push(/I/);
    regexs.push(/S/);
    regexs.push(/L/);
    console.log(regexs);
    return regexs;
}

export const findHints = (inputs: string[], wordleRegexs: RegExp[]) =>
    inputs.filter(line => wordleRegexs.every(regEx => regEx.test(line)));

const knownRegexs = computeRegexsForHints(knownHints);
const hints = findHints(answerWords, knownRegexs);
hints.forEach(item => console.log(item));
