# simplify-logic-statement-ts
Takes a logical statement and simplifies it.

## Usage

Apply the *simplify* function to one of the types outlined below.

[![GitHub license](https://img.shields.io/github/license/jeswr/useState.svg)](https://github.com/jeswr/simplify-logic-statement-ts/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/simplify-logic-statement-ts.svg)](https://www.npmjs.com/package/simplify-logic-statement-ts)
[![build](https://img.shields.io/github/workflow/status/jeswr/simplify-logic-statement-ts/Node.js%20CI)](https://github.com/jeswr/simplify-logic-statement-ts/tree/main/)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![npm bundle size](https://img.shields.io/bundlephobia/min/simplify-logic-statement-ts)

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

### Using the `.equals` method
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
      equals(l: string, r: string) {
        return l === r;
      }
    }, {
      type: LogicalStatementType.statement,
      statement: 'hello',
    }],
  },
}

simplify(myAndStatement) // { type: LogicalStatementType.statement, statement: 'hello' };
```

### Using the `.mergable` and `.merge` methods
```ts
import { simplify, AndStatement } from 'simplify-logic-statement-ts'

const myAndStatement: AndStatement<boolean> = {
  type: LogicalStatementType.and,
  statement: {
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.and]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: true,
      merge(l: boolean, r: boolean) {
        return l && r;
      },
      mergeable(l: boolean, r: boolean) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      }
    }, {
      type: LogicalStatementType.statement,
      statement: false,
    }],
  },
}

simplify(myAndStatement) // { type: LogicalStatementType.statement, statement: false };
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

©2021–present
[Jesse Wright](https://github.com/jeswr), (https://github.com/jeswr/simplify-logic-statement-ts/blob/main/LICENSE).
