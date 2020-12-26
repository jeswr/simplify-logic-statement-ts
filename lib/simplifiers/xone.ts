import { LogicalStatementType, LogicalStatementOutput, XoneStatement } from '../types';
import { simplifyNot } from './not';
import { applyCollectionElements } from './utils';

export function simplifyXone<T>(xoneS: XoneStatement<T>): LogicalStatementOutput<T> {
  const applied = applyCollectionElements(xoneS.statement);

  let emptyCount = 0;
  for (const element of applied.empty) {
    if (emptyCount > 0) {
      return { type: LogicalStatementType.empty, statement: false };
    }
    if (element.statement) {
      emptyCount += 1;
    }
  }

  const {
    not, and, or, statement, xone,
  } = applied;
  const totalLength = not.length + and.length + or.length + statement.length + xone.length;

  if (totalLength === 0 && emptyCount === 1) {
    return { type: LogicalStatementType.empty, statement: true };
  } if (totalLength === 1 && emptyCount === 0) {
    if (not.length === 1) return not[0];
    if (and.length === 1) return and[0];
    if (or.length === 1) return or[0];
    if (xone.length === 1) return xone[0];
    return statement[0];
  } if (totalLength === 0 && emptyCount === 0) {
    return { type: LogicalStatementType.empty, statement: false };
  }

  // If one statement is already arbitrarily true
  // then we just need to wrap the rest of the statements in a 'not'
  if (emptyCount === 1) {
    // TODO reduce unecessary additional caculations here
    return simplifyNot({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.and,
        statement: {
          not, and, or, statement, xone,
        },
      },
    });
  }

  return {
    type: LogicalStatementType.xone,
    statement: {
      not, and, or, statement, xone,
    },
  };
}
