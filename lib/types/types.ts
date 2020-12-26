/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { LogicalStatementType } from './enums';

/**
 * Organised collection of statements for use by
 * and, or and xone interfaces
 */
export interface LogicalStatementCollection<T> {
  [LogicalStatementType.and]: AndStatement<T>[];
  [LogicalStatementType.or]: OrStatement<T>[];
  [LogicalStatementType.xone]: XoneStatement<T>[];
  [LogicalStatementType.not]: NotStatement<T>[];
  [LogicalStatementType.statement]: Statment<T>[];
}

/**
 * Used internally for functions processing logic
 */
export interface LogicalStatementCollectionUnprocessed<T> extends LogicalStatementCollection<T> {
  [LogicalStatementType.empty]: EmptyStatement[];
}

// In the case of Schimatos a node shape or property shape
// always originates at an and statement
export interface AndStatement<T> {
  type: LogicalStatementType.and;
  statement: LogicalStatementCollection<T>;
}

export interface OrStatement<T> {
  type: LogicalStatementType.or;
  statement: LogicalStatementCollection<T>;
}

export interface XoneStatement<T> {
  type: LogicalStatementType.xone;
  statement: LogicalStatementCollection<T>;
}

export interface NotStatement<T> {
  type: LogicalStatementType.not;
  statement: LogicalStatement<T>;
}

/**
 * Either always true or always false. Should not be
 * necessary for any outputs and is
 */
export interface EmptyStatement {
  type: LogicalStatementType.empty;
  statement: boolean;
}

export interface Statment<T> {
  type: LogicalStatementType.statement;
  statement: T;
  // Optional method to test if two statements are equal
  equal?: (left: T, right: T) => boolean;
}

export type LogicalStatement<T> =
  | AndStatement<T>
  | OrStatement<T>
  | XoneStatement<T>
  | NotStatement<T>
  | Statment<T>;

export type LogicalStatementOutput<T> = LogicalStatement<T> | EmptyStatement;
