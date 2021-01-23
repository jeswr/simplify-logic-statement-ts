import {
  LogicalStatementType, AndStatement, LogicalStatementOutput, Statement,
} from '../types';
import { applyCollectionElements } from './utils';

export function simplifyAnd<T>(and: AndStatement<T>): LogicalStatementOutput<T> {
  const applied = applyCollectionElements(and.statement, LogicalStatementType.and);

  // If one element of the and statement is always false, then the
  // whole statement is always false. Otherwise we do not care about
  // empty statements
  if (applied.empty.length > 0 && applied.empty.some((element) => element.statement === false)) {
    return { type: LogicalStatementType.empty, statement: false };
  }

  const {
    not, or, xone, statement,
  } = applied;

  let mergable = true;
  let tempStatements = statement;
  while (mergable) {
    mergable = false;
    const merged: Statement<T>[] = [];
    for (const elem1 of tempStatements) {
      let toAdd = true;
      for (let i = 0; i < merged.length; i += 1) {
        const elem2 = merged[i];
        if (
          elem1.equal?.(elem1.statement, elem2.statement)
          || elem2.equal?.(elem1.statement, elem2.statement)
        ) {
          toAdd = false;
          break;
        }
        if (elem1.merge && elem1.mergeable?.(elem1.statement, elem2.statement)) {
          merged[i] = {
            ...elem1,
            statement: elem1.merge(elem1.statement, elem2.statement),
          };
          mergable = true;
          toAdd = false;
          break;
        }
        if (elem2.merge && elem2.mergeable?.(elem1.statement, elem2.statement)) {
          merged[i] = {
            ...elem2,
            statement: elem2.merge(elem1.statement, elem2.statement),
          };
          mergable = true;
          toAdd = false;
          break;
        }
      }
      if (toAdd) {
        merged.push(elem1);
      }
    }
    tempStatements = merged;
  }

  const totalLength = not.length + or.length + xone.length + tempStatements.length;
  // Handling case where and is unecessary
  if (totalLength === 0) {
    return { type: LogicalStatementType.empty, statement: true };
  } if (totalLength === 1) {
    if (not.length === 1) return not[0];
    if (or.length === 1) return or[0];
    if (xone.length === 1) return xone[0];
    return tempStatements[0];
  }

  return {
    type: LogicalStatementType.and,
    statement: {
      and: [], or, not, xone, statement: tempStatements, 
    },
  };
}
