"use strict";

import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const __rootdirname = __dirname.substring(0, __dirname.lastIndexOf("/"));
// const __inputDirname = __rootdirname + "input/";
const __inputDirname = "./input/";

const enum LetterState {
    Empty,    // (Black) No letter
    Absent,   // (Dark Gray) Letter guessed, but not in answer
    Present,  // (Yellow) Letter guessed. In answer, but not this column
    Correct   // (Green) Letter guessed. In answer and correct column
}

// const fiveLetterWords = fs
//     .readFileSync(path.join(__inputDirname, "words5u.txt"), "utf8")
//     .toString()
//     .split("\n");

export const answerWords = fs
    .readFileSync(path.join(__inputDirname, "wordleanswers.txt"), "utf8")
    .toString()
    .split("\n")
    .map(word => word.trim().toUpperCase());

export const knownHints = JSON.parse(
    fs.readFileSync(path.join(__inputDirname, "hints.json"), "utf8"));

export const computeRegexsForHints = (knowHints: any[]): RegExp[] => {
    // let knownAbsents: Array<string> = [];
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
    regexs.push(/^R[^AISE][^ISE][^ISE][^ISE]$/);
    regexs.push(/R/);
    regexs.push(/A/);
    console.log(regexs);
    console.log('----------');

    return regexs;
}


export const findHints = (inputs: string[], wordleRegexs: RegExp[]) =>
    inputs.filter(line => wordleRegexs.every(regEx => regEx.test(line)));

findHints(answerWords, computeRegexsForHints(knownHints)).forEach(item => console.log(item));
