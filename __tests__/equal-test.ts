/* eslint-disable no-undef */
import {
  AndStatement, LogicalStatementCollection, LogicalStatementType,
} from '../lib';
import { simplifyAnd } from '../lib/simplifiers/and';

describe('Tests using the equality simplfier', () => {
  const collection: LogicalStatementCollection<string> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: '1',
      equal: (l: string, r: string) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: '1',
      equal: (l: string, r: string) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: '2',
      equal: (l: string, r: string) => l === r,
    }],
  };
  const collection2: LogicalStatementCollection<string> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: '1',
      equal: (l: string, r: string) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: '1',
      equal: (l: string, r: string) => l === r,
    }],
  };
  const andStatement: AndStatement<string> = {
    type: LogicalStatementType.and,
    statement: collection,
  };
  const andStatement2: AndStatement<string> = {
    type: LogicalStatementType.and,
    statement: collection2,
  };
  it('Should merge \'and\' statement based on equality', () => {
    expect(JSON.stringify(simplifyAnd(andStatement))).toStrictEqual(JSON.stringify({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: '1',
          equal: (l: string, r: string) => l === r,
        }, {
          type: LogicalStatementType.statement,
          statement: '2',
          equal: (l: string, r: string) => l === r,
        }],
      },
    }));
  });
  it('Should merge \'and\' statement based on equality', () => {
    expect(JSON.stringify(simplifyAnd(andStatement2))).toStrictEqual(JSON.stringify({
      type: LogicalStatementType.statement,
      statement: '1',
      equal: (l: string, r: string) => l === r,
    }));
  });
});
