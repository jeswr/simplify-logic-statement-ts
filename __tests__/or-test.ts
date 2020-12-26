/* eslint-disable no-undef */
import {
  LogicalStatementCollection, LogicalStatementType, OrStatement, simplify,
} from '../lib';
import { simplifyOr } from '../lib/simplifiers/or';

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

const statement: () => OrStatement<string> = () => ({
  type: LogicalStatementType.or,
  statement: collection,
});

describe('or handler tests', () => {
  it('should mantain standard and statements', () => {
    expect(simplify(statement())).toEqual(statement());
    expect(simplifyOr(statement())).toEqual(statement());
  });

  it('should flatten nested ors', () => {
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [statement()],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual(statement());

    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [statement()],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual(statement());
  });

  it('should extract single elements', () => {
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.and]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }],
      },
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.and]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }],
      },
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.and]: [{
          type: LogicalStatementType.and,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello',
            }, {
              type: LogicalStatementType.statement,
              statement: 'hello2',
            }],
          },
        }],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello2',
        }],
      },
    });
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.and]: [{
          type: LogicalStatementType.and,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello',
            }, {
              type: LogicalStatementType.statement,
              statement: 'hello2',
            }],
          },
        }],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello2',
        }],
      },
    });
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [{
          type: LogicalStatementType.xone,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello',
            }, {
              type: LogicalStatementType.statement,
              statement: 'hello2',
            }],
          },
        }],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello2',
        }],
      },
    });
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [{
          type: LogicalStatementType.xone,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello',
            }, {
              type: LogicalStatementType.statement,
              statement: 'hello2',
            }],
          },
        }],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }, {
          type: LogicalStatementType.statement,
          statement: 'hello2',
        }],
      },
    });
    // This is more of an integration test tbh
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [{
          type: LogicalStatementType.xone,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello',
            }],
          },
        }],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [{
          type: LogicalStatementType.xone,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [{
              type: LogicalStatementType.statement,
              statement: 'hello',
            }],
          },
        }],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }],
      },
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }],
      },
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [{
          type: LogicalStatementType.not,
          statement: {
            type: LogicalStatementType.statement,
            statement: 'hello',
          },
        }],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.statement,
        statement: 'hello',
      },
    });
  });

  it('should handle empty or', () => {
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
    expect(simplify({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
  });

  it('Returns an empty true when there is one true statement present', () => {
    expect(simplifyOr({
      type: LogicalStatementType.or,
      statement: {
        [LogicalStatementType.and]: [{
          type: LogicalStatementType.and,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [],
          },
        }],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: true });
    expect(simplify({
      type: LogicalStatementType.and,
      statement: {
        [LogicalStatementType.and]: [{
          type: LogicalStatementType.and,
          statement: {
            [LogicalStatementType.and]: [],
            [LogicalStatementType.not]: [],
            [LogicalStatementType.or]: [],
            [LogicalStatementType.xone]: [],
            [LogicalStatementType.statement]: [],
          },
        }],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: true });
  });
});
