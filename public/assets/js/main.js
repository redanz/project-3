import {sort as sortv1} from "./sortv1.js";
import {sort as sortv2} from "./sortv2.js";
import {sort as sortv3} from "./sortv3.js";
import {sort as sortv4} from "./sortv4.js";
import {sort as sortv5} from "./sortv5.js";
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
let masterNumbers = [];
let currentNumbers = [];
let pauseTime;

export async function op(color1, color2, color3) {
    opCount++;
    await drawBars(currentNumbers, version, color1, color2, color3, opCount, pauseTime);
}

async function main(min, max, pause, verArr) {
    // let url = new URL(window.location);
    // console.log(url)
    // masterNumbers = JSON.parse(url.searchParams.get('array'));
    // pauseTime = parseInt(url.searchParams.get('pause'));
    pauseTime = pause;
    // let randomParameters = JSON.parse(url.searchParams.get('random'));
    masterNumbers = randomArray(min, max, 50);
    for (let i = 0; i < verArr.length; await i++) {
        if (verArr[i] == 1) {
           await runSort(sortv1, "V1: "); 
        }
        if (verArr[i] == 2) {
           await runSort(sortv2, "V2: "); 
        }
        if (verArr[i] == 3) {
           await runSort(sortv3, "V3: "); 
        }
        if (verArr[i] == 4) {
           await runSort(sortv4, "V4: "); 
        }
    }
    // await runSort(sortv5, "V5: ");
    // await runSort(function(array) {
    //     array.sort(function(a, b) {
    //         op();
    //         return a - b;
    //     })
    // }, "JS: ");

                // let arrays = [];
                // let comps = [];
                // opCount = 0;
                // version = "JS: ";
                // masterNumbers.sort(function(a, b) {
                //     arrays.push(masterNumbers.slice());
                //     comps.push([masterNumbers.indexOf(a), masterNumbers.indexOf(b)]);
                //     return a - b;
                // })
                // for (let i = 0; i < arrays.length; i++) {
                //     currentNumbers = arrays[i];
                //     await op(...comps[i]);
                // }
                // currentNumbers = masterNumbers;
    await op();
    document.querySelector('#startButton').disabled = false;

}

async function runSort(sort, name){
    opCount = 0;
    currentNumbers = masterNumbers.slice();
    version = name;
    await drawBars(currentNumbers, version, undefined, undefined, undefined, opCount, pauseTime);
    let startTime = performance.now();
    await sort(currentNumbers);
    let endTime = performance.now();
    console.log(version, 'Ops:', opCount, 'Time:', (endTime-startTime)/1000);
}

document.querySelector('#startButton').addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector('#startButton').disabled = true;
    let min = parseInt(this.parentElement[0].value);
    let max = parseInt(this.parentElement[1].value);
    let pause = parseInt(this.parentElement[2].value);
    let versions = document.querySelectorAll('.versionCheckbox:checked');
    let verArr = [];
    for (let i=0; i<versions.length; i++){
        verArr.push(parseInt(versions[i].value));  
    }
    main(min, max, pause, verArr);
});

