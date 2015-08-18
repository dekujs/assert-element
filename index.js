
var assert = require('assert');


/**
 * Check if the given `node` looks like a virtual node. If `type` is specified,
 * it will ensure that type is strictly equal. (whether that is a `Component`
 * or a `String` element name)
 *
 * @param {Object} node  The virtual node to check.
 * @param {*} [type]     If given, the type of node this must be.
 */
exports.isNode = function (node, type) {
  assert(node, 'expected a virtual node');
  assert(node.attributes, 'expected a virtual node');
  assert(node.children, 'expected a virtual node');
  assert(node.type, 'expected a virtual node');
  if (type) assert.strictEqual(node.type, type);
};

/**
 * Check if the given `node` has the given `attr` attribute. If the `value` is
 * passed, it must match strictly.
 *
 * @param {Object} node  The virtual node to check.
 * @param {String} attr  The attribute name to look for.
 * @param {*} [value]    If given, the type of node this must be.
 */
exports.hasAttribute = function (node, attr, value) {
  exports.isNode(node);
  assert(attr, 'expected an attribute name');
  assert(attr in node.attributes, 'expected to find the attribute ' + attr + ' in the given node');
  if (value) assert.strictEqual(node.attributes[attr], value);
};

/**
 * Ensure that the given `node` does **not** have the given `attr` attribute.
 *
 * @param {Object} node  The virtual node to check.
 * @param {String} attr  The attribute name to look for.
 */
exports.notHasAttribute = function (node, attr) {
  exports.isNode(node);
  assert(attr, 'expected an attribute name');
  assert(!(attr in node.attributes), 'expected to not find the attribute ' + attr + ' in the given node');
};

/**
 * Check if the given `node` has the corresponding `children`, using the
 * following criteria:
 *
 *  - when not given, it will ensure that there is at least 1 child node.
 *  - when an `Array`, it will ensure that the child nodes are loosely equal.
 *  - when a `Number`, it will ensure that the number of child nodes matches
 *    that number.
 *  - when a `Function`, it will ensure that the child nodes all match the
 *    test in that function. (ie: `Array#every()` must return true)
 *
 * @param {Object} node        The virtual node to check.
 * @param {*}      [children]  The criteria for the child nodes. (see above)
 */
exports.hasChildren = function (node, children) {
  exports.isNode(node);
  if (Array.isArray(children)) {
    assert.deepEqual(node.children, children);
  } else if (typeof children === 'number') {
    assert.strictEqual(node.children.length, children);
  } else if (typeof children === 'function') {
    assert(node.children.every(children), 'expected the child nodes to pass the function test');
  } else {
    assert(node.children.length > 0, 'expected to find child nodes');
  }
};

/**
 * Ensures that the given `node` does not have any child nodes.
 *
 * @param {Object} node  The virtual node to check.
 */
exports.notHasChildren = function (node) {
  exports.isNode(node);
  assert(node.children.length === 0, 'expected to not find any child nodes');
};

/**
 * Assert that the given `node` has the given CSS class `name` applied.
 * (generally, this is only useful for HTML nodes)
 *
 * @param {Object} node  The virtual node to check.
 * @param {String} name  The class name to look for.
 */
exports.hasClass = function (node, name) {
  exports.isNode(node);
  assert(name, 'expected a class name');
  var list = classes(node.attributes.class);
  assert(list.indexOf(name) > -1, 'expected to find class name ' + name);
};

/**
 * Assert that the given `node` does **not** have the given CSS class `name`.
 *
 * @param {Object} node  The virtual node to check.
 * @param {String} name  The class name to look for.
 */
exports.notHasClass = function (node, name) {
  exports.isNode(node);
  assert(name, 'expected a class name');
  var list = classes(node.attributes.class);
  assert(list.indexOf(name) === -1, 'expected to not find class name ' + name);
};


// private helpers

/**
 * Parse the given `input` into an `Array` of class names. Will always return
 * an `Array`, even if it's empty.
 *
 * @param {String} [input]  The class attribute string.
 * @return {Array}
 */
function classes(input) {
  if (!input) return [];
  if (!input.trim()) return [];
  return input.trim().split(/\s+/g);
}
