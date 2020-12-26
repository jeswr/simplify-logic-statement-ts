/* eslint-disable no-undef */
import {
  LogicalStatement, LogicalStatementType, NotStatement, simplify,
} from '../lib';
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

  it('Should manipulate empty statements', () => {
    // // eslint-disable-next-line
    // let simplify: (statement: LogicalStatement<boolean>) => LogicalStatementOutput<boolean>;

    // beforeEach(() => {
    //   // eslint-disable-next-line no-unused-vars
    //   simplify = (statement: LogicalStatement<boolean>): LogicalStatementOutput<boolean> => ({
    //     type: LogicalStatementType.empty,
    //     statement: Boolean(statement.statement),
    //   });
    // });

    expect(simplifyNot({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.and,
        statement: {
          [LogicalStatementType.and]: [],
          [LogicalStatementType.or]: [],
          [LogicalStatementType.not]: [],
          [LogicalStatementType.xone]: [],
          [LogicalStatementType.statement]: [],
        },
      },
    })).toEqual({
      type: LogicalStatementType.empty,
      statement: false,
    });

    expect(simplify({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.or,
        statement: {
          [LogicalStatementType.and]: [],
          [LogicalStatementType.or]: [],
          [LogicalStatementType.not]: [],
          [LogicalStatementType.xone]: [],
          [LogicalStatementType.statement]: [],
        },
      },
    })).toEqual({
      type: LogicalStatementType.empty,
      statement: true,
    });
  });
});
