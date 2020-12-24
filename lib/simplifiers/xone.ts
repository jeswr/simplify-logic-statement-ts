import { LogicalStatementType, LogicalStatementOutput, XoneStatement } from '../types';
import { simplifyNot } from './not';
import { applyCollectionElements } from './utils';

export function simplifyXone<T>(xone: XoneStatement<T>): LogicalStatementOutput<T> {
  const applied = applyCollectionElements(xone.statement);

  let emptyCount = 0;
  for (const element of applied.empty) {
    if (element.statement === true) {
      emptyCount++;
      if (emptyCount > 1) {
        return { type: LogicalStatementType.empty, statement: false };
      }
    }
  }

  const {
    not, and, or, statement,
  } = applied;
  const totalLength = not.length + and.length + or.length + statement.length;

  if (totalLength === 0 && emptyCount === 1) {
    return { type: LogicalStatementType.empty, statement: true };
  } if (totalLength === 1 && emptyCount === 0) {
    if (not.length === 1) return not[0];
    if (and.length === 1) return and[0];
    if (or.length === 1) return or[0];
    if (statement.length === 1) return statement[0];
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
          not, and, or, statement,
        },
      },
    });
  }
}
