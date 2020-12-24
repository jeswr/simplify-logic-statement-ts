import { LogicalStatement, LogicalStatementOutput, LogicalStatementType } from '../types';

import { simplifyAnd } from './and';
import { simplifyNot } from './not';
import { simplifyOr } from './or';
import { simplifyXone } from './xone';

export function simplify<T>(statement: LogicalStatement<T>): LogicalStatementOutput<T> {
  switch (statement.type) {
    case LogicalStatementType.and: return simplifyAnd(statement);
    case LogicalStatementType.or: return simplifyOr(statement);
    case LogicalStatementType.xone: return simplifyXone(statement);
    case LogicalStatementType.not: return simplifyNot(statement);
    default: return statement;
  }
}
