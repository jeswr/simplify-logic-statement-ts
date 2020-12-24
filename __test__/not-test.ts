/* eslint-disable no-undef */
import { LogicalStatementType, NotStatement } from '../lib';
import { simplifyNot } from '../lib/index/not'

const nestedNot = (): NotStatement<string> => ({
  type: LogicalStatementType.not,
  statement: {
    type: LogicalStatementType.not,
    statement: {
      type: LogicalStatementType.statement,
      statement: 'a',
    },
  },
});

describe('Testing', () => {
  expect(simplifyNot(nestedNot())).toEqual({
    type: LogicalStatementType.statement,
    statement: 'a',
  });
});
