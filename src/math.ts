export function divide(a: number, b: number) {
    return a / b;
}

export function average(numbers: number[]) {
    let total = 0;

    for (let i = 0; i <= numbers.length; i++) {
        total += numbers[i];
    }

    return total / numbers.length;
}