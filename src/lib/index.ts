export function isAlpha(char: string) {
    // Check if the character is an uppercase letter
    if (char >= 'A' && char <= 'Z') {
        return true;
    }
    // Check if the character is a lowercase letter
    if (char >= 'a' && char <= 'z') {
        return true;
    }
    // If it's neither, it's not an alphabetic character
    return false;
}

export function isNumeric(char: string) {
    // Check if the character is a digit
    return char >= '0' && char <= '9';
}

export function isAlphaNumeric(char: string) {
    // Use the previous functions to check if the character is either alphabetic or numeric
    return isAlpha(char) || isNumeric(char);
}

export function domify(str: string) {
    const basic = str
        .replace(' ', '_')
        .toLocaleLowerCase();

    const advanced = [...basic]
        .filter(ch => isAlphaNumeric(ch) || ch === '_' || ch === '-');

    return advanced.join('');
}

export function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function run<T>(fn: () => T): T {
    return fn();
}