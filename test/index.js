
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

    it('should not throw when the fn test passes for every node', function () {
      assertions.hasChildren(element('div', null, 'a'), test);

      function test(child) {
        return child === 'a';
      }
    });

    it('should throw when the fn test fails for a single node', fail(function () {
      assertions.hasChildren(element('div', null, 'a', 'b'), test);

      function test(child) {
        return child === 'a';
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
});


function noop() {}

function fail(fn) {
  return function () {
    assert.throws(fn, Error);
  };
}
