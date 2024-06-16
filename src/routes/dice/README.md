# Grammar

```js
expression     → term ;
term           → factor (( "-" | "+" ) factor)* ;
factor         → unary (( "/" | "*" ) unary)* ;
unary          → ( "-" ) unary | primary ;
primary        → NUMBER | DICE | "(" expression ")" ;
```