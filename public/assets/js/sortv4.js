import {op} from "./main.js";

// Quicksort (using pivots)
export async function sort(numbers) {
    let last = numbers.length-1;
    for (let i=0; i < numbers.length; i++) {
        let position = await findInsertionPoint(last, numbers, 0, i);
        // insert blue into position
        numbers.splice(position, 0, numbers[last]);
        // remove blue from end
        numbers.splice(last+1, 1);
    }
}

// takes an index of a number, finds and returns the new (sorted) index of that number
async function findInsertionPoint(index, array, start, end) {
    let middle = Math.floor((end+start)/2);
    await op(index, start, end);
    // if blue < value midway between red & orange
    if (array[index] < array[middle]) {
        // if red = orange (at the start, i.e. end = 0) or if middle = orange (second iteration, i.e. end = 1)
        if (end == start || middle == start) {
            // put blue at the start & exit function
            return start;
        }
        // run function again with middle-1 as the position of red (end) bar
        return await findInsertionPoint(index, array, start, middle-1);
    // if blue > value midway between red & orange
    } else if (array[index] > array[middle]) {
        // if red = orange (at the start, i.e. end = 0) or if middle = orange (second iteration, i.e. end = 1)
        if (end == start || middle == end) {
            // put blue at the right of red & exit function 
            return end+1;
        }
        // run function again with middle+1 as the position of orange (start) bar
        return await findInsertionPoint(index, array, middle+1, end);
    // if blue = middle value
    } else {
        // put blue at the mid point 
        return middle;
    }
}