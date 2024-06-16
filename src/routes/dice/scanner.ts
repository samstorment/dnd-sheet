import { isAlpha, isAlphaNumeric, isNumeric, rand } from '$lib/index';


export function scanner(input: string) {


    let start = 0;
    let current = 0;
    const prevChar = () => input[current - 1];
    const peekChar = () => current >= input.length ? '\0' : input[current];
    const nextChar = (offset = 1) => current >= input.length - offset ? '\0' : input[current + offset];
    const isAtEnd = () => current >= input.length;
    const prevToken = () => tokens.at(-1);

    let tokens: Token[] = [];

    function scan(): Token[] {
        while (!isAtEnd()) {

            start = current;

            scanTokens();   
        }

        start = current;

        addToken('eof');

        return tokens;
    }

    function scanTokens() {
        const c = advance();

        switch (c) {
            case ' ': break;
            case '(':
            case ')':
            case '+':
            case '-': 
            case '*':
            case '/':
                addToken(c); break;
            case 'd':
                if (isNumeric(peekChar())) scanDice();
                break;
            default:
                if (isNumeric(c)) scanNumber(); 
        }

    }

    function scanDice() {
        while (isNumeric(peekChar())) {
            advance();
        }

        addToken('dice', parseFloat(input.slice(start + 1, current)));
    }

    function scanNumber() {

        while (isNumeric(peekChar())) {
            advance();
        }

        if (peekChar() === '.') {
            advance();
        }

        while(isNumeric(peekChar())) {
            advance();
        }

        addToken('number', parseFloat(input.slice(start, current)));

        return;
    }

    const advance = () => input.at(current++) ?? '\0';

    function match(...c: string[]) {
        const res = c.includes(peekChar());
        if (res) {
            advance();
        }
        return res;
    }

    function addToken(type: TokenType, literal: string | number | undefined = undefined) {
        const lexeme = input.slice(start, current);
        tokens.push({ type, literal, lexeme, start, end: current });
    }

    function expand() {
        const result: Token[] = [];

        function isValidPreDiceToken(token?: Token) {
            if (token?.type !== 'number') return false;
            const num = token.literal as number;
            if (num <= 0) return false;
            return Number.isInteger(num);
        }

        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i];

            const next = i === tokens.length - 1 ? undefined : tokens[i + 1];

            if (isValidPreDiceToken(t) && next?.type === 'dice') {
                continue;
            }

            if (t.type !== 'dice') {
                result.push(t);
                continue;
            }

            let numRolls = 1;

            const prev = i === 0 ? undefined : tokens[i - 1];

            if (isValidPreDiceToken(prev)) {
                numRolls = prev?.literal as number;
            }

            result.push({ start: 0, end: 0, lexeme: '(', literal: undefined, type: "(" });

            const rolls = Array
                .from({ length: numRolls }, () => rand(1, t.literal as number));
                
            if (numRolls < 101) {
                rolls.forEach((r, j) => {
                    result.push({ start: 0, end: 0, lexeme: r.toString(), literal: r, type: "number" });
                    if (j < numRolls - 1) {
                        result.push({ start: 0, end: 0, lexeme: '+', literal: undefined, type: "+" });
                    }
                });
            } else {
                const sumOfRolls = rolls.reduce((a, b) => a + b); 
                result.push({ start: 0, end: 0, lexeme: sumOfRolls.toString(), literal: sumOfRolls, type: "number" });
            }

            result.push({ start: 0, end: 0, lexeme: ')', literal: undefined, type: ")" });
        }

        return result;
    }
    

    return {
        scan, expand
    }

}


export type TokenType =
    'number' | 'dice' |
    '(' | ')' |
    '+' | '-' | '*' | '/' |
    'eof';


export interface Token {
    type: TokenType;
    lexeme: string;
    literal: string | number | undefined;
    start: number;
    end: number;
}