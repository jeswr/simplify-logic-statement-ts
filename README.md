# simplify-logic-statement-ts
Takes a logical statement and simplifies it.

## Types

### Base Statement

```ts
const myStatement = {
  type: LogicalStatementType.statement,
  statement: 'statement 1',
}
```

### And Statement

A collection of statements that are logically anded together.

```ts
const myAndStatement = {
  type: LogicalStatementType.and;
  statement: {
    [LogicalStatementType.and]: [];
    [LogicalStatementType.or]: [];
    [LogicalStatementType.xone]: [];
    [LogicalStatementType.not]: [{
      type: LogicalStatementType.not,
      statement: 'statement 3',
    }];
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: 'statement 1',
    }, {
      type: LogicalStatementType.statement,
      statement: 'statement 2',
    }];
  }
}
```
