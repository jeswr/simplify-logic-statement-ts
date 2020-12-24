import { LogicalStatementType, AndStatement, LogicalStatementOutput } from '../types';
import { applyCollectionElements } from './utils';

export function simplifyAnd<T>(and: AndStatement<T>): LogicalStatementOutput<T> {
  const applied = applyCollectionElements(and.statement, LogicalStatementType.and);

  // If one element of the and statement is always false, then the
  // whole statement is always false. Otherwise we do not care about
  // empty statements
  if (applied.empty.some((element) => element.statement === false)) {
    return { type: LogicalStatementType.empty, statement: false };
  }

  const {
    not, or, xone, statement,
  } = applied;
  const totalLength = not.length + or.length + xone.length + statement.length;
  // Handling case where and is unecessary
  if (totalLength === 0) {
    return { type: LogicalStatementType.empty, statement: true };
  } if (totalLength === 1) {
    if (not.length === 1) return not[0];
    if (or.length === 1) return or[0];
    if (xone.length === 1) return xone[0];
    if (statement.length === 1) return statement[0];
  }

  return {
    type: LogicalStatementType.and,
    statement: {
      not, or, xone, statement,
    },
  };
}
