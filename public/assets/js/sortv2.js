import {op} from "./main.js";

export async function sort(numbers) {
    let i = numbers.length;
    let possiblyUnsorted = true;
    while (possiblyUnsorted) {
        i--;
        possiblyUnsorted = false;
        for (let j = 0; j < i; j++) {    
            if (numbers[j] > numbers[j+1]) {
                possiblyUnsorted = true;
                let temp = numbers[j];
                numbers[j] = numbers[j+1];
                numbers[j+1] = temp;
            }
            await op(j, j+1);
        }
    }
}