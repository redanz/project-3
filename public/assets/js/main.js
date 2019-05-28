import {sort as sortv1} from "./sortv1.js";
import {sort as sortv2} from "./sortv2.js";
import {sort as sortv3} from "./sortv3.js";
import {sort as sortv4} from "./sortv4.js";
import {drawBars, pause} from "./util.js";

function randomArray(min, max, length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * (max-min+1)) + min);
    }
    return array;
}

let opCount;
let version;
let masterNumbers;
let currentNumbers;
let pauseTime;

export async function op(color1, color2, color3) {
    opCount++;
    await drawBars(currentNumbers, version, color1, color2, color3, opCount, pauseTime);
}

async function main() {
    // let url = new URL(window.location);
    // console.log(url)
    // masterNumbers = JSON.parse(url.searchParams.get('array'));
    // pauseTime = parseInt(url.searchParams.get('pause'));
    pauseTime = 50;
    // let randomParameters = JSON.parse(url.searchParams.get('random'));
    masterNumbers = randomArray(0, 100, 20);
    // await runSort(sortv1, "V1: ");
    // await runSort(sortv2, "V2: ");
    await runSort(sortv3, "V3: ");
    // await runSort(sortv4, "V4: ");
    await runSort(function(array) {
        array.sort(function(a, b) {
            op();
            return a - b;
        })
    }, "JS: ");
    let arrays = [];
    let comps = [];
    opCount = 0;
    version = "JS: ";
    masterNumbers.sort(function(a, b) {
        arrays.push(masterNumbers.slice());
        comps.push([masterNumbers.indexOf(a), masterNumbers.indexOf(b)]);
        return a - b;
    })
    for (let i = 0; i < arrays.length; i++) {
        currentNumbers = arrays[i];
        await op(...comps[i]);
    }
    currentNumbers = masterNumbers;
    await op();
}

async function runSort(sort, name){
    opCount = 0;
    currentNumbers = masterNumbers.slice();
    version = name;
    await drawBars(currentNumbers, version, undefined, undefined, undefined, opCount, pauseTime);
    let startTime = performance.now();
    await sort(currentNumbers);
    let endTime = performance.now();
    console.log(version, opCount, endTime-startTime);
}

main();

