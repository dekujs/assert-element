# assert-element

> Assertions that can be used when working with Deku/React and JSX.

## API

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
 - when a `Function`, it will run the function against each child node (which should
   throw if they are invalid)
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

## Using with Deku Components

When unit-testing deku components, you'll typically run the `render()` function and
make assertions against the virtual element it returns.

```js
let Button = {
  render({ props }) {
    return <button type={props.type}>{props.children}</button>
  }
};

var component = {
  props: {
    type: 'submit',
    children: 'Hello World'
  }
};

assert.isNode(Button.render(component), 'button');
assert.hasAttribute(Button.render(component), 'type', 'submit');
assert.hasChildren(Button.render(component), [ 'Hello World' ]);
```

This is a trivial example of course, but you can easily introduce variables and
other dynamic code in order to test that your components properly understand the
various `props` and `state` that they will receive.
