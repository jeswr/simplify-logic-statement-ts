import {
  LogicalStatementType, LogicalStatementOutput, OrStatement,
} from '../types';
import { applyCollectionElements } from './utils';

export function simplifyOr<T>(or: OrStatement<T>): LogicalStatementOutput<T> {
  const applied = applyCollectionElements(or.statement, LogicalStatementType.or);

  // If one element of the and statement is always true, then the
  // whole statement is always true. Otherwise we do not care about
  // empty statements
  if (applied.empty.some((element) => element.statement === true)) {
    return { type: LogicalStatementType.empty, statement: true };
  }

  const {
    not, and, xone, statement,
  } = applied;
  const totalLength = not.length + and.length + xone.length + statement.length;
  // Handling case where and is unecessary
  if (totalLength === 0) {
    return { type: LogicalStatementType.empty, statement: false };
  } if (totalLength === 1) {
    if (not.length === 1) return not[0];
    if (and.length === 1) return and[0];
    if (xone.length === 1) return xone[0];
    return statement[0];
  }

  return {
    type: LogicalStatementType.or,
    statement: {
      not, and, xone, statement, or: [],
    },
  };
}
