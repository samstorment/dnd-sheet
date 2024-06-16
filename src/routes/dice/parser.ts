import type { Token, TokenType } from "./scanner";

function parser(tokens: Token[]) {

    let start = 0;
    let i = 0;

    function parse() {

    }

    function parseExpression() {
        return parseTerm();
    }

    function parseTerm() {

    }

    function match(...types: TokenType[]) {
        for (const type of types) {
            if (check(type)) {
                advance();
                return true;
            }
        }
    
        return false;
    }


    function check(type: TokenType) {
        if (isAtEnd()) return false;
        return peek().type == type;
    }

    function advance() {
        if (!isAtEnd()) i++;
        return previous();
    }

    function isAtEnd() {
        return peek().type == 'eof';
    }
    
    function peek() {
        return tokens.at(i)!;
    }

    function previous() {
        return tokens.at(i - 1)!;
    }

    return {
        parse
    }
}


type Expr = BinaryExpr | UnaryExpr;

interface BinaryExpr {
    left: Expr,
    op: Token,
    right: Expr
}

interface UnaryExpr {
    op: Token,
    right: Expr
}