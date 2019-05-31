import {op} from "./main.js";

let canvas = document.querySelector('canvas');
let width = window.innerWidth;
// console.log(document.querySelector('form').offsetHeight, document.querySelector('form').offsetWidth)
let height = window.innerHeight-100;

canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext('2d');

window.addEventListener('resize', function(){
    width = window.innerWidth;
    height = window.innerHeight-100;
    canvas.width = width;
    canvas.height = height;
})

export async function drawBars(numbers, version, color1, color2, color3, numComparisons, pauseTime) {
    ctx.font = "10px sans-serif";
    ctx.clearRect(0, 0, width, height);
    let scaled = fitToScale(numbers, height);
    for (let i = 0; i < numbers.length; i++) {
        if (i == color1) {
            ctx.fillStyle = 'blue';
        } else if (i == color2) {
            ctx.fillStyle = 'orange';
        } else if (i == color3) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'gray';
        }
        ctx.fillRect(20*i, height, 10, -scaled[i]);
        ctx.fillText(numbers[i], 20*i, height-scaled[i]-5);
    }
    ctx.fillStyle = 'red';
    ctx.font = "30px sans-serif";
    ctx.fillText(version + numComparisons, 20, 30);
    await pause(pauseTime);
}

export function pause(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
}

function fitToScale(array, height) {
    let maxValue = Math.max(...array);
    let valuesScaled = [];
    for (let i = 0; i < array.length; i++) {
        valuesScaled[i] = array[i] * ((height - 50) / maxValue);
    }
    return valuesScaled;
}

export function isSorted(array) {
    for (let i = 0; i < array.length-1; i++) {
        if (array[i] > array[i+1]) {
            return false;
        }
    }
    return true;
}