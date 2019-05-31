import {op} from "./main.js";


// ----- WORK IN PROGRESS -----
export async function sort(numbers) {
    // orange bar
    let last = numbers.length-1;
    for (let i=0; i < numbers.length; i++) {
        let position = await findInsertionPoint(last, numbers, i);

        // insert orange into position
        numbers.splice(position, 0, numbers[last]);

        // remove orange from end
        numbers.splice(last+1, 1);
    }
}

// takes an index of a number, finds and returns the new sorted index of that number
async function findInsertionPoint(index, array, start) {
    let mean = (array[0] + array[start]) / 2;
    console.log(array[index], mean)
    if (array[index] > mean) {
        // decrement starting i ('start') to zero
        for (let i = start; i >= 0; i--){
            await op(i, index);

            // return index (and exit function) if 
            if (array[index] >= array[i]) {
                return i+1;
            }
        }
    } else if (array[index] <= mean) {
        for (let i = 0; i < array.length; i++){
            await op(i, index);

            // return index (and exit function) if 
            if (array[index] < array[i]) {
                return i-1;
            }
        }
    } else {
       return 0; 
    } 
}