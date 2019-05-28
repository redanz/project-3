import {op} from "./main.js";

export async function sort(numbers) {
    // most likely not sorted at the start
    let possiblyUnsorted = true;
    while (possiblyUnsorted) {
        // assume it's sorted unless told otherwise
        possiblyUnsorted = false;

        // sorts one by one and checks if numbers are sorted in the process
        for (let i = 0; i < numbers.length-1; i++) {
            if (numbers[i] > numbers[i+1]) {
                
                // "It's not all sorted!""
                possiblyUnsorted = true;

                // swap bars
                let temp = numbers[i];
                numbers[i] = numbers[i+1];
                numbers[i+1] = temp;
            }
            // 
            await op(i, i+1);
        }
    }
}