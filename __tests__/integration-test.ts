/* eslint-disable no-undef */
import { AndBuilder } from 'build-logic-statement-ts';
import {
  LogicalStatementType, simplify,
} from '../lib';

describe('integration test with build-logic-statement-ts', () => {
  it('should return empty on nested ands', () => {
    const andStatement = new AndBuilder<string>().addAnd().addAnd().addAnd();
    const build = andStatement.build();
    expect(simplify<string>(build)).toEqual({
      type: LogicalStatementType.empty,
      statement: true,
    });
  });
  it('should not flatten ands but not ors nested in ands', () => {
    const andStatement = new AndBuilder<string>();
    const nestedAnd = andStatement.addAnd();
    nestedAnd.addStatement('hello1');
    nestedAnd.addStatement('hello2');
    const nestedOr = andStatement.addOr();
    nestedOr.addStatement('hello3');
    nestedOr.addStatement('hello4');

    const simplified = new AndBuilder<string>();
    simplified.addStatement('hello1');
    simplified.addStatement('hello2');
    const nestedOrSimplified = simplified.addOr();
    nestedOrSimplified.addStatement('hello3');
    nestedOrSimplified.addStatement('hello4');
    expect(andStatement.build()).not.toEqual(simplified.build());
    expect(simplify<string>(andStatement.build())).toEqual(simplified.build());
  });
  it('should not flatten ands and ors with 1 element but not ors nested in ands', () => {
    const andStatement = new AndBuilder<string>();
    const nestedAnd = andStatement.addAnd();
    nestedAnd.addStatement('hello1');
    nestedAnd.addStatement('hello2');
    const nestedOr = andStatement.addOr();
    nestedOr.addStatement('hello3');
    nestedOr.addStatement('hello4');
    andStatement.addOr().addStatement('hello6');
    andStatement.addOr().addStatement('hello7');

    const simplified = new AndBuilder<string>();
    simplified.addStatement('hello6');
    simplified.addStatement('hello7');
    simplified.addStatement('hello1');
    simplified.addStatement('hello2');
    const nestedOrSimplified = simplified.addOr();
    nestedOrSimplified.addStatement('hello3');
    nestedOrSimplified.addStatement('hello4');
    expect(andStatement.build()).not.toEqual(simplified.build());
    expect(simplify<string>(andStatement.build())).toEqual(simplified.build());
  });
  it('should not flatten ors nested in ands', () => {
    const simplified = new AndBuilder<string>();
    simplified.addStatement('hello1');
    simplified.addStatement('hello2');
    simplified.addStatement('hello5');
    simplified.addStatement('hello6');
    const nestedOrSimplified = simplified.addOr();
    nestedOrSimplified.addStatement('hello3');
    nestedOrSimplified.addStatement('hello4');
    expect(simplify<string>(simplified.build())).toEqual(simplified.build());
    expect(simplify<string>(simplified.build())).toEqual({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [{
          type: LogicalStatementType.or,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello3',
            }, {
              type: LogicalStatementType.statement,
              statement: 'hello4',
            }],
          },
        }],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello1',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello2',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello5',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello6',
        }],
      },
    });
  });
});
