export function divide(a: number, b: number) {
    return a / b;
}

export function sum(numbers: number[]) {
    let total = 0;

    for (const num of numbers) {
        total += num;
    }

    return total;
}