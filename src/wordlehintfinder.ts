"use strict";

import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootdirname = __dirname.substring(0, __dirname.lastIndexOf("/"));
const __inputDirname = __rootdirname + "input/";
// const __inputDirname = "./input/";

enum LetterState {
    Empty,    // (Black) No letter
    Absent,   // (Dark Gray) Letter guessed, but not in answer
    Present,  // (Yellow) Letter guessed. In answer, but not this column
    Correct   // (Green) Letter guessed. In answer and correct column
}


const fiveLetterWords = fs
    .readFileSync(path.join(__inputDirname, "words5u.txt"), "utf8")
    .toString()
    .split("\n");

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
    // let columnStates: Array<{ iindex: number; ch: string; state: LetterState; }>[] = [];

    // knowHints.forEach((hintRow: any[]) => {
    //     hintRow.forEach((hint, index) => {
    //         let currentLetter = hint.ch.toUpperCase();
    //         switch (currentLetter) {
    //             case "ABSENT":
    //             case "DARKGRAY":
    //                 knownAbsents.push(currentLetter);
    //                 break;

    //             case "PRESENT":
    //             case "YELLOW":
    //                 columnStates[index].push(currentLetter);
    //                 knownPresents.push(currentLetter);
    //                 break;

    //             case "CORRECT":
    //             case "GREEN":
    //                 knownPresents.push(hint.ch.toUpperCase());
    //                 break;

    //             case "EMPTY":
    //             case "BLACK":
    //                 break;
    //         }
    //     });
    // });

    // let absentLetterRegex = knownAbsents.map(absentLetter => new RegExp(absentLetter));

    let regexs: Array<RegExp> = [];
    regexs.push(/^([^IATE]|[R])R([^IRATE]|[R])([^IRATE]|[R])([^IRATE]|[R])$/);
    regexs.push(/R/);
    console.log(regexs);

    return regexs;
}


export const findHints = (inputs: string[], wordleRegexs: RegExp[]) =>
    inputs.filter(line => wordleRegexs.every(regEx => regEx.test(line)));

findHints(answerWords, computeRegexsForHints(knownHints)).forEach(item => console.log(item));
