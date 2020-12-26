/* eslint-disable no-undef */
import { LogicalStatementType } from '../lib';
import { applyCollectionElements } from '../lib/simplifiers/utils';

describe('util error tests', () => {
  it('should throw an error on invalid input elements', () => {
    expect(() => {
      applyCollectionElements({
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [{
          type: LogicalStatementType.not,
          // @ts-ignore
          statement: {
            type: LogicalStatementType.not,
            statement: {
              type: 'INVALID KEY',
              statement: 'myValue',
            },
          },
        }],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      });
    }).toThrow('Invalid element');
  });

  it('should turn an empty collection into another empty collection', () => {
    expect(applyCollectionElements({
      [LogicalStatementType.and]: [],
      [LogicalStatementType.or]: [],
      [LogicalStatementType.not]: [],
      [LogicalStatementType.xone]: [],
      [LogicalStatementType.statement]: [],
    })).toEqual({
      [LogicalStatementType.and]: [],
      [LogicalStatementType.or]: [],
      [LogicalStatementType.not]: [],
      [LogicalStatementType.xone]: [],
      [LogicalStatementType.statement]: [],
      [LogicalStatementType.empty]: [],
    });
  });

  it('should maintain an arbitrary statement', () => {
    expect(applyCollectionElements({
      [LogicalStatementType.and]: [],
      [LogicalStatementType.or]: [],
      [LogicalStatementType.not]: [],
      [LogicalStatementType.xone]: [],
      [LogicalStatementType.statement]: [{
        type: LogicalStatementType.statement,
        statement: 'hello',
      }],
    })).toEqual({
      [LogicalStatementType.and]: [],
      [LogicalStatementType.or]: [],
      [LogicalStatementType.not]: [],
      [LogicalStatementType.xone]: [],
      [LogicalStatementType.statement]: [{
        type: LogicalStatementType.statement,
        statement: 'hello',
      }],
      [LogicalStatementType.empty]: [],
    });
  });

  it('should transform double not in collection to a single statement', () => {
    expect(applyCollectionElements({
      [LogicalStatementType.and]: [],
      [LogicalStatementType.or]: [],
      [LogicalStatementType.not]: [{
        type: LogicalStatementType.not,
        statement: {
          type: LogicalStatementType.not,
          statement: {
            type: LogicalStatementType.statement,
            statement: 'hello',
          },
        },
      }],
      [LogicalStatementType.xone]: [],
      [LogicalStatementType.statement]: [],
    })).toEqual({
      [LogicalStatementType.and]: [],
      [LogicalStatementType.or]: [],
      [LogicalStatementType.not]: [],
      [LogicalStatementType.xone]: [],
      [LogicalStatementType.statement]: [{
        type: LogicalStatementType.statement,
        statement: 'hello',
      }],
      [LogicalStatementType.empty]: [],
    });
  });
});
