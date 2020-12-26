/* eslint-disable no-undef */
import { LogicalStatement, LogicalStatementType, NotStatement, simplify } from '../lib';
import { simplifyNot } from '../lib/simplifiers/not';

const nestedNot = (statement: LogicalStatement<string>): NotStatement<string> => ({
  type: LogicalStatementType.not,
  statement: {
    type: LogicalStatementType.not,
    statement,
  },
});

describe('Not handler tests', () => {
  it('Should remove basic double negation (simplifyNot)', () => {
    expect(simplifyNot(nestedNot({
      type: LogicalStatementType.statement,
      statement: 'a',
    }))).toEqual({
      type: LogicalStatementType.statement,
      statement: 'a',
    });
  });

  it('Should remove basic double negation (simplify)', () => {
    expect(simplify(nestedNot({
      type: LogicalStatementType.statement,
      statement: 'a',
    }))).toEqual({
      type: LogicalStatementType.statement,
      statement: 'a',
    });
  });

  it('Should remove basic quadruple negation (simplifyNot)', () => {
    expect(simplifyNot(nestedNot(nestedNot({
      type: LogicalStatementType.statement,
      statement: 'a',
    })))).toEqual({
      type: LogicalStatementType.statement,
      statement: 'a',
    });
  });

  it('Should remove basic quadruple negation (simplify)', () => {
    expect(simplify(nestedNot(nestedNot({
      type: LogicalStatementType.statement,
      statement: 'a',
    })))).toEqual({
      type: LogicalStatementType.statement,
      statement: 'a',
    });
  });

  it('Should remove basic triple negation (simplifyNot)', () => {
    expect(simplifyNot(nestedNot(nestedNot({
      type: LogicalStatementType.statement,
      statement: 'a',
    })))).toEqual({
      type: LogicalStatementType.statement,
      statement: 'a',
    });
  });

  it('Should remove basic triple negation (simplify)', () => {
    expect(simplify(nestedNot({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.statement,
        statement: 'a',
      },
    }))).toEqual({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.statement,
        statement: 'a',
      },
    });
  });
});
