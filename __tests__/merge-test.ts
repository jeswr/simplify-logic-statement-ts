/* eslint-disable no-undef */
import {
  AndStatement, LogicalStatementCollection, LogicalStatementType,
} from '../lib';
import { simplifyAnd } from '../lib/simplifiers/and';
// TODO: Add edge case testing, only some methods etc
describe('Tests using the equality simplfier', () => {
  const collection: LogicalStatementCollection<boolean> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: true,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
      equal: (l: boolean, r: boolean) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: true,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
      equal: (l: boolean, r: boolean) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: false,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
      equal: (l: boolean, r: boolean) => l === r,
    }],
  };
  const collection2: LogicalStatementCollection<boolean> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: true,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
      equal: (l: boolean, r: boolean) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: true,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
      equal: (l: boolean, r: boolean) => l === r,
    }],
  };
  const collection3: LogicalStatementCollection<boolean> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: true,
    }, {
      type: LogicalStatementType.statement,
      statement: true,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
      equal: (l: boolean, r: boolean) => l === r,
    }, {
      type: LogicalStatementType.statement,
      statement: false,
      mergeable(l, r) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l, r) {
        return l && r;
      },
    }],
  };
  const andStatement: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection,
  };
  const andStatement2: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection2,
  };
  const andStatement3: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection3,
  };
  it('Should merge \'and\' statement based on merge functions', () => {
    expect(JSON.stringify(simplifyAnd(andStatement))).toStrictEqual(JSON.stringify({
      type: LogicalStatementType.statement,
      statement: false,
      equal: (l: string, r: string) => l === r,
    }));
  });
  it('Should merge \'and\' statement based on merge functions', () => {
    expect(JSON.stringify(simplifyAnd(andStatement2))).toStrictEqual(JSON.stringify({
      type: LogicalStatementType.statement,
      statement: true,
      equal: (l: string, r: string) => l === r,
    }));
  });
  it('Should merge \'and\' statement based on merge functions (only some methods present)', () => {
    expect(JSON.stringify(simplifyAnd(andStatement3))).toStrictEqual(JSON.stringify({
      type: LogicalStatementType.statement,
      statement: false,
      equal: (l: string, r: string) => l === r,
    }));
  });
});
