export function generateRandomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = '';

    for (let i = 0; i < 3; i++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        code += randomLetter + randomNumber;
    }

    return code;
}