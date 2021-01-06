# simplify-logic-statement-ts
Takes a logical statement and simplifies it.

## Usage

Apply the *simplify* function to one of the types outlined below.

### Examples

#### Remove double negation

```ts
import { simplify, NotStatement } from 'simplify-logic-statement-ts'

const myNotStatement: NotStatment<string> = {
  type: LogicalStatementType.not,
  statement: {
    LogicalStatementType.not,
    statement: {
      LogicalStatementType.statement,
      statement: 'statement 3',
    },
  },
}

simplify(myNotStatement) // { LogicalStatementType.statement, statement: 'statement 3' }
```

#### Remove unecessary quantifiers

```ts
import { simplify, AndStatement } from 'simplify-logic-statement-ts'

const myAndStatement: AndStatement<string> = {
  type: LogicalStatementType.and,
  statement: {
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.and]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: 'hello',
    }],
  },
}

simplify(myAndStatement) // { type: LogicalStatementType.statement, statement: 'hello' };
```
### Flatten nested logic

```ts
import { simplify, AndStatement } from 'simplify-logic-statement-ts'

const myAndStatement: AndStatement<string> = {
  type: LogicalStatementType.and,
  statement: {
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.and]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: 'hello',
    }, {
      type: LogicalStatementType.statement,
      statement: 'hello again',
    }],
  },
}

const anotherAndStatement: AndStatement<string> = {
  type: LogicalStatementType.and,
  statement: {
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.and]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: 'goodbye',
    }, {
      type: LogicalStatementType.statement,
      statement: 'goodbye again',
    }],
  },
}

const myNestedAndStatement: AndStatement<string> = {
  type: LogicalStatementType.and,
  statement: {
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.and]: [myAndStatement, anotherAndStatement],
    [LogicalStatementType.statement]: [],
  },
}

simplify(myNestedAndStatement)
// {
//   type: LogicalStatementType.and,
//   statement: {
//    [LogicalStatementType.xone]: [],
//    [LogicalStatementType.or]: [],
//    [LogicalStatementType.not]: [],
//    [LogicalStatementType.and]: [],
//    [LogicalStatementType.statement]: [{
//      type: LogicalStatementType.statement,
//      statement: 'hello',
//    }, {
//      type: LogicalStatementType.statement,
//      statement: 'hello again',
//    }, {
//      type: LogicalStatementType.statement,
//      statement: 'goodbye',
//    }, {
//      type: LogicalStatementType.statement,
//      statement: 'goodbye again',
//    }],
//  },
// }
```

## Types

### Base Statement

```ts
import { LogicalStatementType, Statment } from 'simplify-logic-statement-ts'
const myStatement: Statment<string> = {
  type: LogicalStatementType.statement,
  statement: 'statement 1',
}
```

### Not Statement

A negated statement

```ts
import { LogicalStatementType, NotStatment } from 'simplify-logic-statement-ts'

const myNotStatement: NotStatment<string> = {
  type: LogicalStatementType.not,
  statement: {
    LogicalStatementType.statement,
    statement: 'statement 3',
  },
}
```

### And Statement

A collection of statements that are logically anded together.

```ts
import { LogicalStatementType, AndStatment } from 'simplify-logic-statement-ts'
const myAndStatement: AndStatment<string> = {
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

### Or Statement

A collection of statements that are logically ored together.

```ts
import { LogicalStatementType, OrStatment } from 'simplify-logic-statement-ts'
const myOrStatement: OrStatment<string> = {
  type: LogicalStatementType.or;
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

### Xone Statement

A collection of statements that are logically xoned together.

```ts
import { LogicalStatementType, XoneStatment } from 'simplify-logic-statement-ts'
const myXoneStatement: XoneStatment<string> = {
  type: LogicalStatementType.xone;
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

### Empty Statement

An empty statement that is either always true or always false. This should *not* be used as an input to the simplify function.

```ts
import { LogicalStatementType, EmptyStatment } from 'simplify-logic-statement-ts'
const myEmptyStatement: EmptyStatement = {
  type: LogicalStatementType.empty,
  statement: true,
}
```

## License

This package is licensed under the [MIT License](https://github.com/jeswr/simplify-logic-statement-ts/blob/main/LICENSE)
