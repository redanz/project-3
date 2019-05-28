import {op} from "./main.js";

export async function sort(numbers) {
    console.log('sortv3.js')
    let last = numbers.length-1;
    for (let i=0; i < numbers.length; i++) {
        let position = await findInsertionPoint(last, numbers, i);
        numbers.splice(position, 0, numbers[last]);
        numbers.splice(last+1, 1);
    }
}

// takes an index of a number, finds and returns the new sorted index of that number
async function findInsertionPoint(index, array, start) {
    for (let i=start; i>=0; i--){
        await op(i, index);
        if (array[index] >= array[i]) {
            return i+1;
        }
    }
    return 0;
}