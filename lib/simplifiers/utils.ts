import {
  LogicalStatementCollection, LogicalStatementType, LogicalStatementCollectionUnprocessed, LogicalStatementOutput,
} from '../types';
import { simplifyAnd } from './and';
import { simplifyNot } from './not';
import { simplifyOr } from './or';
import { simplifyXone } from './xone';

/**
 * Applies the simplification algorithm to a collection of statements.
 * @param collection Collection of logical statemnts
 */
export function applyCollectionElements<T>(collection: LogicalStatementCollection<T>, merge?: LogicalStatementType.and | LogicalStatementType.or): LogicalStatementCollectionUnprocessed<T> {
  const results: LogicalStatementCollectionUnprocessed<T> = {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.empty]: [],
    [LogicalStatementType.statement]: collection.statement,
  };

  // TODO: Work out how to do this without the switch
  // statement whilst remaining type safe
  function pusher(elem: LogicalStatementOutput<T>) {
    switch (elem.type) {
      case LogicalStatementType.and:
        results[elem.type].push(elem);
        break;
      case LogicalStatementType.or:
        results[elem.type].push(elem);
        break;
      case LogicalStatementType.xone:
        results[elem.type].push(elem);
        break;
      case LogicalStatementType.not:
        results[elem.type].push(elem);
        break;
      case LogicalStatementType.empty:
        results[elem.type].push(elem);
        break;
      case LogicalStatementType.statement:
        results[elem.type].push(elem);
        break;
    }
  }

  for (const elem of collection.and.map(simplifyAnd)) {
    pusher(elem);
  }
  for (const elem of collection.or.map(simplifyOr)) {
    pusher(elem);
  }
  for (const elem of collection.xone.map(simplifyXone)) {
    pusher(elem);
  }
  for (const elem of collection.not.map(simplifyNot)) {
    pusher(elem);
  }

  /**
   * Used to merge nested ands/ors
   */
  if (merge) {
    for (const elem of results[merge]) {
      pusher(elem);
    }
    results[merge] = [];
  }

  return results;
}
