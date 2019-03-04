import { LitElement, html, css } from 'lit-element';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class LitInput extends LitElement {
  static get styles() {
    return css`
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
    }
    `;
  }

  static get properties() {
    return {
      _input: { type: Object },
      value: { type: String },
      placeHolder: { type: String }
    };
  }

  constructor() {
    super();
    this._input = {};
    this.value = '';
    this.placeHolder = '';
  }

  render() {
    return html`
    <input
      type="text"
      placeholder="${this.placeHolder}"
      @keyup="${this._onKeyUp}"
      @blur="${this._onBlur}">
    `;
  }

  firstUpdated() {
    this._input = this.shadowRoot.querySelector('input');
  }

  _onKeyUp(event) {
    // If Enter key pressed, fire 'enter-pressed'
    if(event.keyCode == 13) {
      this.dispatchEvent(new CustomEvent('enter-pressed', {
        detail: {
          value: this._input.value
        },
        composed: true,
        bubbles: true
      }));
      event.preventDefault();
    } else {
      // If any other key, fire 'key-pressed'
      this.dispatchEvent(new CustomEvent('key-pressed', {
        detail: {
          value: this._input.value
        },
        composed: true,
        bubbles: true
      }));
    }
  }

  _onBlur(event) {
    this.dispatchEvent(new CustomEvent('focus-lost', {
      detail: {
        value: this._input.value
      },
      composed: true,
      bubbles: true
    }));
  }
}

customElements.define('lit-input', LitInput);