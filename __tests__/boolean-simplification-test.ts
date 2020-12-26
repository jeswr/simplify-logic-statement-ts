/* eslint-disable no-undef */
/**
 * This test file confirms that properties
 * of simplification using boolean logic hold
 */

import { LogicalStatementOutput, LogicalStatementType, simplify } from '../lib';

function notCount(statement: LogicalStatementOutput<string>): number {
  if ([
    LogicalStatementType.and,
    LogicalStatementType.or,
    LogicalStatementType.xone,
  ].includes(statement.type)) {
    return Math.max(...Object.values(statement.statement)
      .map(
        (st) => Math.max(...st.map((s: LogicalStatementOutput<string>) => notCount(s))),
      ));
  }
  if (statement.type === LogicalStatementType.not) {
    return 1 + notCount(statement.statement);
  }
  return 0;
}

describe('Testing that \'not\' statements are not nested (even if separated by logical operators)', () => {
  it('should not be able to have a nested nots separated by an and', () => {
    const simplification = simplify({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.and,
        statement: {
          [LogicalStatementType.and]: [],
          [LogicalStatementType.or]: [],
          [LogicalStatementType.not]: [{
            type: LogicalStatementType.not,
            statement: {
              type: LogicalStatementType.statement,
              statement: 'hello',
            },
          }],
          [LogicalStatementType.xone]: [],
          [LogicalStatementType.statement]: [{
            type: LogicalStatementType.statement,
            statement: 'hello',
          }],
        },
      },
    });
    expect(notCount(simplification)).toBeLessThanOrEqual(1);
  });
});
