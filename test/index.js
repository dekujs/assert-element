
var assert = require('assert');
var element = require('virtual-element');
var assertions = require('..');

describe('node', function () {
  it('should be an object', function () {
    assert(assertions);
    assert.strictEqual(typeof assertions, 'object');
  });

  describe('.isNode(node, type)', function () {
    it('should throw when missing the node', fail(function () {
      assertions.isNode();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.isNode({});
    }));

    it('should not throw for plain elements', function () {
      assertions.isNode(element('div'));
    });

    it('should match the type if given', function () {
      assertions.isNode(element('div'), 'div');
    });

    it('should match strictly on component types', function () {
      var Component = { render: function () {} };
      assertions.isNode(element(Component), Component);
    });
  });

  describe('.hasAttribute(node, attr, [value])', function () {
    it('should throw when missing the node', fail(function () {
      assertions.hasAttribute();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.hasAttribute({});
    }));

    it('should throw when missing the attr name', fail(function () {
      assertions.hasAttribute(element('div'));
    }));

    it('should throw when the attribute name is not found', fail(function () {
      assertions.hasAttribute(element('div'), 'id');
    }));

    it('should not throw when the attribute name is found', function () {
      assertions.hasAttribute(element('div', { id: 'a' }), 'id');
    });

    it('should throw when the attribute does not match', fail(function () {
      assertions.hasAttribute(element('div', { id: 'a' }), 'id', 'b');
    }));

    it('should not throw when the attribute does match', function () {
      assertions.hasAttribute(element('div', { id: 'a' }), 'id', 'a');
    });

    it('should strictly match attribute values', function () {
      assertions.hasAttribute(element('a', { onClick: noop }), 'onClick', noop);
    });

    it('should not treat falsy values as a missing attribute', function () {
      assertions.hasAttribute(element('input', { disabled: false }), 'disabled');
    });

    it('should fail when the attribute is falsy and does not match', fail(function() {
      assertions.hasAttribute(element('input', { disabled: true }), 'disabled', false);
    }));
  });

  describe('.notHasAttribute(node, attr)', function () {
    it('should throw when missing the node', fail(function () {
      assertions.notHasAttribute();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.notHasAttribute({});
    }));

    it('should throw when missing the attr name', fail(function () {
      assertions.notHasAttribute(element('div'));
    }));

    it('should not throw when the attribute is not present', function () {
      assertions.notHasAttribute(element('div'), 'id');
    });

    it('should throw when the attribute is present, but falsy', fail(function () {
      assertions.notHasAttribute(element('input', { disabled: false }), 'disabled');
    }));
  });

  describe('.hasClass(node, name)', function () {
    it('should throw when missing the node', fail(function () {
      assertions.hasClass();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.hasClass({});
    }));

    it('should throw when missing the attr name', fail(function () {
      assertions.hasClass(element('div'));
    }));

    it('should not throw when the class name is present', function () {
      assertions.hasClass(element('div', { class: 'a' }), 'a');
      assertions.hasClass(element('div', { class: 'a b' }), 'b');
      assertions.hasClass(element('div', { class: 'a b c' }), 'b');
      assertions.hasClass(element('div', { class: 'a b c' }), 'c');
    });

    it('should throw when the class name is missing', fail(function () {
      assertions.hasClass(element('div', { class: 'a' }), 'b');
    }));

    it('should throw when the node has no class names', fail(function () {
      assertions.hasClass(element('div'), 'b');
    }));

    it('should throw when the class is not a string', fail(function () {
      assertions.hasClass(element('div', { class: { a: true, b: false } }), 'a');
    }));
  });

  describe('.notHasClass(node, name)', function () {
    it('should throw when missing the node', fail(function () {
      assertions.notHasClass();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.notHasClass({});
    }));

    it('should throw when missing the class name', fail(function () {
      assertions.notHasClass(element('div'));
    }));

    it('should throw when the class name is present', fail(function () {
      assertions.notHasClass(element('div', { class: 'a' }), 'a');
    }));

    it('should not throw when the class name is missing', function () {
      assertions.notHasClass(element('div', { class: 'a' }), 'b');
    });

    it('should not throw when the node has no class names', function () {
      assertions.notHasClass(element('div'), 'b');
    });
  });

  describe('.hasChildren(node, children)', function () {
    it('should throw when missing the node', fail(function () {
      assertions.hasChildren();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.hasChildren({});
    }));

    it('should throw when there are no children', fail(function () {
      assertions.hasChildren(element('div'));
    }));

    it('should not throw when there are children', function () {
      assertions.hasChildren(element('div', null, 'hello world'));
    });

    it('should not throw when the number of children matches', function () {
      assertions.hasChildren(element('div', null, 'a'), 1);
      assertions.hasChildren(element('div', null, 'a', 'b'), 2);
    });

    it('should throw when the number of children does not match', fail(function () {
      assertions.hasChildren(element('div', null, 'a'), 0);
      assertions.hasChildren(element('div', null, 'a', 'b'), 1);
    }));

    it('should not throw when the array of children matches', function () {
      assertions.hasChildren(element('div', null, 'a', 'b'), [ 'a', 'b' ]);
    });

    it('should throw when the array of children does not match', fail(function () {
      assertions.hasChildren(element('div', null, 'a', 'b'), [ 'a' ]);
    }));

    it('should treat a string argument as a single child array', function () {
      assertions.hasChildren(element('div', null, 'a'), 'a');
    });

    it('should throw if the children does not match the single argument', fail(function () {
      assertions.hasChildren(element('div', null, 'a'), 'b');
    }));

    it('should throw if there are multiple children and a single argument is passed', fail(function () {
      assertions.hasChildren(element('div', null, 'a', 'b'), 'a');
    }));

    it('should not throw when the fn does not throw for any node', function () {
      assertions.hasChildren(element('div', null, 'a'), test);

      function test(child) {}
    });

    it('should throw when the fn throws for any node', fail(function () {
      assertions.hasChildren(element('div', null, 'a', 'b'), test);

      function test(child) {
        throw new Error('fail');
      }
    }));
  });

  describe('.notHasChildren(node)', function () {
    it('should throw when missing the node', fail(function () {
      assertions.notHasChildren();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.notHasChildren({});
    }));

    it('should not throw when there are no children', function () {
      assertions.notHasChildren(element('div'));
    });

    it('should not throw when there are children', fail(function () {
      assertions.notHasChildren(element('div', null, 'hello world'));
    }));
  });

  describe('.hasChild(node, index, [fn])', function () {
    it('should throw when missing the node', fail(function () {
      assertions.hasChild();
    }));

    it('should throw for objects that are not virtual nodes', fail(function () {
      assertions.hasChild({});
    }));

    it('should throw when there are no children', fail(function () {
      assertions.hasChild(element('div'));
    }));

    it('should throw when an index is not provided', fail(function () {
      assertions.hasChild(element('div', null, 'hello world'));
    }));

    it('should throw when a negative index is provided', fail(function () {
      assertions.hasChild(element('div', null, 'hello world'), -1);
    }));

    it('should throw when a child at the given index does not exist', fail(function () {
      assertions.hasChild(element('div', null, 'a'), 1);
    }));

    it('should not throw when there are children and an index is provided', function () {
      assertions.hasChild(element('div', null, 'hello world'), 0);
    });

    context('with array for index', function () {
      var root = element('ul', null, [
        element('li', null, element('a', { href: 'http://example.com/' })),
        element('li', null, element('a', { href: 'http://example.org/' }))
      ]);

      it('should not throw when it finds the right child', function () {
        assertions.hasChild(root, [ 0, 0 ]);
        assertions.hasChild(root, [ 1, 0 ]);
      });

      it('should throw when it cannot find a child', fail(function () {
        assertions.hasChild(root, [ 2, 0 ]);
      }));
    });
  });

  describe('.hasChild(node, index, criteria)', function () {
    describe('criteria is not a function', function() {
      it('should not throw when the deep comparison succeeds', function() {
        assertions.hasChild(element('div', null, 'a', 'b'), 0, 'a');
        assertions.hasChild(element('div', null, 'a', 'b'), 1, 'b');
      });

      it('should throw when the deep comparison fails', fail(function() {
        assertions.hasChild(element('div', null, 'a', 'b'), 0, 'b');
      }));

      it('should throw when the criteria is falsy and does not match', fail(function () {
        assertions.hasChild(element('div', null, 'a', 'b'), 0, null);
      }));

      context('with array for index', function () {
        var root = element('ul', null, [
          element('li', null, element('b', null, 'Hello')),
          element('li', null, element('span', null, 'World'))
        ]);

        it('should not throw when it finds the right child', function () {
          assertions.hasChild(root, [ 0, 0, 0 ], 'Hello');
          assertions.hasChild(root, [ 1, 0, 0 ], 'World');
        });

        it('should throw when it cannot find a child', fail(function () {
          assertions.hasChild(root, [ 2, 0, 0 ], 'Hello');
        }));

        it('should throw when deep comparison fails', fail(function () {
          assertions.hasChild(root, [ 1, 0, 0 ], 'Hello');
        }));
      });
    });

    describe('criteria is a function', function() {
      it('should throw when `criteria` throws', fail(function () {
        assertions.hasChild(element('div', null, 'a', 'b'), 0, test);

        function test(child) {
          throw new Error('fail');
        }
      }));

      it('should not throw when `criteria` does not throw', function () {
        assertions.hasChild(element('div', null, 'a'), 0, test);

        function test(child) {}
      });

      context('with array for index', function () {
        var root = element('ul', null, [
          element('li', null, element('b', null, 'Hello')),
          element('li', null, element('span', null, 'World'))
        ]);

        it('should not throw when `criteria` does not throw', function () {
          assertions.hasChild(root, [ 0, 0, 0 ], test);

          function test(child) {}
        });

        it('should throw when `criteria throws`', fail(function () {
          assertions.hasChild(root, [ 2, 0, 0 ], test);

          function test(child) {
            throw new Error('fail');
          }
        }));
      });
    });
  });
});


function noop() {}

function fail(fn) {
  return function () {
    assert.throws(fn, Error);
  };
}
