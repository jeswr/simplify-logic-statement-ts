/* eslint-disable no-undef */
import {
  AndStatement, LogicalStatementCollection, LogicalStatementType, simplify,
} from '../lib';
import { simplifyAnd } from '../lib/simplifiers/and';

const collection: LogicalStatementCollection<string> = {
  [LogicalStatementType.and]: [],
  [LogicalStatementType.or]: [],
  [LogicalStatementType.not]: [],
  [LogicalStatementType.xone]: [],
  [LogicalStatementType.statement]: [{
    type: LogicalStatementType.statement,
    statement: 'hello',
  }, {
    type: LogicalStatementType.statement,
    statement: 'helloes',
  }],
};

const statement: () => AndStatement<string> = () => ({
  type: LogicalStatementType.and,
  statement: collection,
});

describe('and handler tests', () => {
  it('should mantain standard and statements', () => {
    expect(simplify(statement())).toEqual(statement());
    expect(simplifyAnd(statement())).toEqual(statement());
  });

  it('should flatten nested ands', () => {
    expect(simplify({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [statement()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual(statement());

    expect(simplifyAnd({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [statement()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual(statement());
  });
});
