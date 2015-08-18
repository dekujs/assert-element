# virtual-element-assertions

> Assertions that can be used when working with Deku/React and JSX.

## Usage

### assert.isNode(node, [type])

Checks the given `node` to make sure it looks like a virtual node. If the `type`
is specified, it must match strictly.

```js
assert.isNode(<div />);
assert.isNode(<b>Hello World</b>, 'b');
assert.isNode(<Button>Log In</Button>, Button);
```

### assert.hasAttribute(node, attr, [value])

Checks the given `node` to make sure it has the given `attr` attribute. If the
`value` is specified, it must match that value strictly.

```js
assert.hasAttribute(<a href="http://example.com/">Home</a>, 'href');
assert.hasAttribute(<button type="submit">Submit</button>, 'type', 'submit');
```

**NOTE:** this allows for falsy values, as an attribute can be present but intentionally
false, such as `checked={false}`.

### assert.notHasAttribute(node, attr)

Checks the given `node` to make sure it does **not** have the given `attr` attribute.

```js
assert.notHasAttribute(<div />, 'id');
```

**NOTE:** this will not throw for falsy values, as an attribute can be present but
intentionally false, such as `checked={false}`.

### assert.hasClass(node, name)

Checks that the given `node` has the given CSS class `name`. This is largely a helper
for HTML elements, although any component that uses `class` in the same fashion can be
checked.

```js
assert.hasClass(<div class="a b c" />, 'b');
```

### assert.notHasClass(node, name)

Checks that the given `node` does **not** have the given CSS class `name`. This is largely
a helper for HTML elements, although any component that uses `class` in the same fashion
can be checked.

```js
assert.notHasClass(<div class="a" />, 'b');
```

### assert.hasChildren(node, [children])

Checks that the given `node` has child nodes matching the `children` argument:

 - when a `Number`, it will ensure `node` has that many child nodes
 - when a `Function`, it will all the child nodes pass that as a truth test
 - when an `Array`, it will check for loose/deep equality
 - when not specified, it will just make sure the `node` has at least 1 child

```js
var node = (
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
);

// make sure there are any children
assert.hasChildren(node);

// make sure there are 3 children
assert.hasChildren(node, 3);

// our fn just runs other assertions
assert.hasChildren(node, function (child) {
  assert.isNode(child, 'li');
  assert.hasChildren(child);
});
```

### assert.notHasChildren(node)

Checks that the given `node` does **not** have any child nodes.

```js
assert.notHasChildren(<div />);
```
