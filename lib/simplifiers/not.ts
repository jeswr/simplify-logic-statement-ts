import {
  LogicalStatementType, LogicalStatementOutput, NotStatement,
} from '../types';
import { simplify } from './index';

export function simplifyNot<T>(not: NotStatement<T>, flatten = true): LogicalStatementOutput<T> {
  if (flatten) {
    const internalStatement = not.statement;

    if (internalStatement.type === LogicalStatementType.and) {
      const noter: NotStatement<T>[] = [
        ...internalStatement.statement.and,
        ...internalStatement.statement.not,
        ...internalStatement.statement.or,
        ...internalStatement.statement.xone,
        ...internalStatement.statement.statement,
      ].map(((statement) => ({
        type: LogicalStatementType.not,
        statement,
      })));
      return simplify({
        type: LogicalStatementType.or,
        statement: {
          and: [],
          not: noter,
          or: [],
          xone: [],
          statement: [],
        },
      });
    }

    if (internalStatement.type === LogicalStatementType.or) {
      const nots: NotStatement<T>[] = [
        ...internalStatement.statement.and,
        ...internalStatement.statement.not,
        ...internalStatement.statement.or,
        ...internalStatement.statement.xone,
        ...internalStatement.statement.statement,
      ].map(((statement) => ({
        type: LogicalStatementType.not,
        statement,
      })));
      return simplify({
        type: LogicalStatementType.and,
        statement: {
          and: [],
          not: nots,
          or: [],
          xone: [],
          statement: [],
        },
      });
    }
  }

  // if (not.statement.statement === LogicalStatementType.xone) {
  //   return {

  //   }
  // }

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
