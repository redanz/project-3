import {op} from "./main.js";

export async function sort(numbers) {
    let last = numbers.length-1;
    for (let i=0; i < numbers.length; i++) {
        let position = await findInsertionPoint(last, numbers, 0, i);
        numbers.splice(position, 0, numbers[last]);
        numbers.splice(last+1, 1);
    }
}

// takes an index of a number, finds and returns the new sorted index of that number
async function findInsertionPoint(index, array, start, end) {
    let middle = Math.floor((end+start)/2);
    await op(index, start, end);
    if (array[index] < array[middle]) {
        if (end == start || middle == start) {
            return start;
        }
        return await findInsertionPoint(index, array, start, middle-1);
    } else if (array[index] > array[middle]) {
        if (end == start || middle == end) {
            return end+1;
        }
        return await findInsertionPoint(index, array, middle+1, end);
    } else {
        return middle;
    }
}