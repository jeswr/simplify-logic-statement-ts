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
  const collection4: LogicalStatementCollection<boolean> = {
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
    }],
  };
  const collection5: LogicalStatementCollection<boolean> = {
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
      merge(l, r) {
        return l && r;
      },
    }],
  };
  const collection6: LogicalStatementCollection<boolean> = {
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
    }, {
      type: LogicalStatementType.statement,
      statement: true,
    }],
  };
  const collection7: LogicalStatementCollection<boolean> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [{
      type: LogicalStatementType.statement,
      statement: true,
      merge(l, r) {
        return l && r;
      },
    }, {
      type: LogicalStatementType.statement,
      statement: true,
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
  const andStatement4: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection4,
  };
  const andStatement5: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection5,
  };
  const andStatement6: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection6,
  };
  const andStatement7: AndStatement<boolean> = {
    type: LogicalStatementType.and,
    statement: collection7,
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
  it('Should merge \'and\' statement based on merge functions (only some methods present & only in 2nd statement)', () => {
    expect(JSON.stringify(simplifyAnd(andStatement4))).toStrictEqual(JSON.stringify({
      type: LogicalStatementType.statement,
      statement: true,
      mergeable(l: boolean, r: boolean) {
        return typeof l === 'boolean' && typeof r === 'boolean';
      },
      merge(l: boolean, r: boolean) {
        return l && r;
      },
    }));
  });
  it('should not merge if there is .merge but no .mergable', () => {
    expect(simplifyAnd(andStatement5)).toEqual(andStatement5);
  });
  expect(JSON.stringify(simplifyAnd(andStatement6))).toStrictEqual(JSON.stringify({
    type: LogicalStatementType.statement,
    statement: true,
    mergeable(l: boolean, r: boolean) {
      return typeof l === 'boolean' && typeof r === 'boolean';
    },
    merge(l: boolean, r: boolean) {
      return l && r;
    },
  }));
  it('should not merge if there is .merge but no .mergable (in 2nd statement)', () => {
    expect(simplifyAnd(andStatement7)).toEqual(andStatement7);
  });
});
