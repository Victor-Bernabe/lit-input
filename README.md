# lit-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-input) ![npm](https://img.shields.io/npm/v/lit-input.svg)

Web component to input text implemented with LitElement.

See [Documentation](https://www.webcomponents.org/element/lit-input), [Demo](https://lit-input.victorbp.site).

## Installation

```shell
npm install lit-input --save
```

Then import lit-input into your element:

```javascript
import 'lit-input/lit-input.js';
```

or in an html file:

```html
<script type="module" src="/path/to/lit-input.js"></script>
```

## Usage

In your LitElement class:
```javascript
static get styles() {
  return css`
  * {
    box-sizing: border-box;
  }
  :host {
    display: block;

    --lit-input-width: 350px;
    --lit-input-height: 30px;
  }
  `;
}
static get properties() {
  return {};
}

constructor() {
  super();
}

render() {
  return html`
  <lit-input
    icon-right
    text-left
    .icon="${'icons:close'}"
    @key-pressed="${this._log}"
    @enter-pressed="${this._log}"
    @focus-lost="${this._log}"
    @icon-clicked="${this._log}">
  </lit-input>
  `;
}

_log(event) {
  console.log(event.detail.value);
}
```

Variable `value` from the event is a `String` containing the text inside `lit-input`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D