/* eslint-disable no-undef */
import {
  AndStatement,
  LogicalStatementCollection, LogicalStatementType, simplify, XoneStatement,
} from '../lib';
import { simplifyXone } from '../lib/simplifiers/xone';

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

const statement: () => XoneStatement<string> = () => ({
  type: LogicalStatementType.xone,
  statement: collection,
});

const emptyAnd: () => AndStatement<string> = () => ({
  type: LogicalStatementType.and,
  statement: {
    [LogicalStatementType.and]: [],
    [LogicalStatementType.or]: [],
    [LogicalStatementType.not]: [],
    [LogicalStatementType.xone]: [],
    [LogicalStatementType.statement]: [],
  },
});

describe('xone handler tests', () => {
  it('should mantain standard and statements', () => {
    expect(simplify(statement())).toEqual(statement());
    expect(simplifyXone(statement())).toEqual(statement());
  });

  it('should *not* flatten nested xone', () => {
    expect(simplify({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [statement(), statement()],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [statement(), statement()],
        [LogicalStatementType.statement]: [],
      },
    });

    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [statement(), statement()],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [statement(), statement()],
        [LogicalStatementType.statement]: [],
      },
    });
  });

  it('should extract single elements', () => {
    expect(simplifyXone({
      type: LogicalStatementType.xone,
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
      type: LogicalStatementType.xone,
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
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.and]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.or]: [{
          type: LogicalStatementType.or,
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
      type: LogicalStatementType.or,
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
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.and]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.or]: [{
          type: LogicalStatementType.or,
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
      type: LogicalStatementType.or,
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
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.or]: [],
        [LogicalStatementType.and]: [],
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
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.or]: [],
        [LogicalStatementType.and]: [],
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
    expect(simplifyXone({
      type: LogicalStatementType.xone,
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
      type: LogicalStatementType.xone,
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
    // This is more of an integration test tbh
    expect(simplifyXone({
      type: LogicalStatementType.xone,
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
      type: LogicalStatementType.xone,
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
    expect(simplifyXone({
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
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplify({
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
    })).toEqual({
      type: LogicalStatementType.statement,
      statement: 'hello',
    });
    expect(simplifyXone({
      type: LogicalStatementType.xone,
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

  it('should handle empty xone', () => {
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
    expect(simplify({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
  });

  it('should immediately make xone true when exactly 1 true statement is present', () => {
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [emptyAnd()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: true });
    expect(simplify({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [emptyAnd()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: true });
  });

  it('transform to not when 1 statment is true', () => {
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [emptyAnd()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }],
      },
    })).toEqual({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.statement,
        statement: 'hello',
      },
    });
    expect(simplify({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [emptyAnd()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [{
          type: LogicalStatementType.statement,
          statement: 'hello',
        }],
      },
    })).toEqual({
      type: LogicalStatementType.not,
      statement: {
        type: LogicalStatementType.statement,
        statement: 'hello',
      },
    });
  });

  it('should immediately make xone false when 2 true statements are present', () => {
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [emptyAnd(), emptyAnd()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
    expect(simplify({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [emptyAnd(), emptyAnd()],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
  });

  it('should immediately make xone false when 2 false statements and nothing else are present', () => {
    expect(simplifyXone({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [{
          type: LogicalStatementType.not,
          statement: emptyAnd(),
        }, {
          type: LogicalStatementType.not,
          statement: emptyAnd(),
        }],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
    expect(simplify({
      type: LogicalStatementType.xone,
      statement: {
        [LogicalStatementType.and]: [],
        [LogicalStatementType.or]: [],
        [LogicalStatementType.not]: [{
          type: LogicalStatementType.not,
          statement: emptyAnd(),
        }, {
          type: LogicalStatementType.not,
          statement: emptyAnd(),
        }],
        [LogicalStatementType.xone]: [],
        [LogicalStatementType.statement]: [],
      },
    })).toEqual({ type: LogicalStatementType.empty, statement: false });
  });
});
