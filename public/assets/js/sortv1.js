import {op} from "./main.js";

export async function sort(numbers) {
    console.log('sortv1.js')
    let possiblyUnsorted = true;
    while (possiblyUnsorted) {
        possiblyUnsorted = false;
        for (let i = 0; i < numbers.length-1; i++) {
            if (numbers[i] > numbers[i+1]) {
                possiblyUnsorted = true;
                let temp = numbers[i];
                numbers[i] = numbers[i+1];
                numbers[i+1] = temp;
            }
            await op(i, i+1);
        }
    }
}