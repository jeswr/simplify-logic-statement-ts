import {
  LogicalStatementType, AndStatement, LogicalStatementOutput, NotStatement,
} from '../types';
import { applyCollectionElements } from './utils';
import { simplify } from './index';

export function simplifyNot<T>(not: NotStatement<T>): LogicalStatementOutput<T> {
  const statement = simplify(not.statement);

  // Double 'not' so they cancel each other out
  if (statement.type === LogicalStatementType.not) {
    return statement.statement;
  }

  if (statement.type === LogicalStatementType.empty) {
    return { type: LogicalStatementType.empty, statement: !statement.statement };
  }

  return {
    type: LogicalStatementType.not,
    statement,
  };
}
