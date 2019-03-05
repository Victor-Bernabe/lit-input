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
      display: inline-block;
      position: relative;

      /* Iron-icon smaller than input */
      --iron-icon-computed-size: calc(var(--lit-input-height, 30px) - 8px);
    }

    /* Iron icon depends on input styles to fit inside */
    iron-icon {
      display: none;
      position: absolute;
      --iron-icon-height: var(--iron-icon-computed-size, 22px);
      --iron-icon-width: var(--iron-icon-computed-size, 22px);
    }
    iron-icon:hover {
      cursor: pointer;
    }

    /* Display icon if it's positioned */
    :host([icon-right]) > iron-icon {
      display: inline;
      right: 4px;
      top: 4px;
    }
    :host([icon-left]) > iron-icon {
      display: inline;
      left: 4px;
      top: 4px;
    }

    /* Input style */
    input {
      width: var(--lit-input-width, 300px);
      height: var(--lit-input-height, 30px);
      padding: 5px;
      border: var(--lit-input-border, 1px solid black);
      background-color: var(--lit-input-background-color, white);
      font-size: var(--lit-input-font-size, calc(var(--lit-input-height) / 1.8));
      color: var(--lit-input-text-color, inherit);
    }
    input:focus {
      border: var(--lit-input-border-focus, 1px solid #4d90fe);
    }

    /* Padding space for iron-icon */
    :host([icon-right]) > input {
      padding-right: var(--lit-input-height, 30px);
    }
    :host([icon-left]) > input {
      padding-left: var(--lit-input-height, 30px);
    }

    /* Text direction */
    :host([text-right]) > input {
      text-align: right;
    }
    :host([text-left]) > input {
      text-align: left;
    }

    /* Placeholder color */
    ::placeholder {
      color: var(--lit-input-placeholder-color, #a0a0a0);
    }
    :-ms-input-placeholder {
      color: var(--lit-input-placeholder-color, #a0a0a0);
    }
    ::-ms-input-placeholder {
      color: var(--lit-input-placeholder-color, #a0a0a0);
    }
    `;
  }

  static get properties() {
    return {
      _input: { type: Object },
      value: { type: String },
      placeHolder: { type: String },
      icon: { type: String }
    };
  }

  constructor() {
    super();
    this._input = {};
    this.value = '';
    this.placeHolder = 'Search...';
    this.icon = 'icons:search';
  }

  render() {
    return html`
    <iron-icon
      icon="${this.icon}"
      @click="${this._onIconClick}">
    </iron-icon>
    <input
      type="text"
      placeholder="${this.placeHolder}"
      @keyup="${this._onKeyUp}"
      @blur="${this._onBlur}">
    `;
  }

  firstUpdated() {
    // Dynamically import extra iron-icons if needed
    const iconType = this.icon.split(':')[0];
    if(iconType !== 'icons') {
      switch(iconType) {
        case 'av': {
          import('@polymer/iron-icons/av-icons.js'); break;
        }
        case 'communication': {
          import('@polymer/iron-icons/communication-icons.js'); break;
        }
        case 'device': {
          import('@polymer/iron-icons/device-icons.js'); break;
        }
        case 'editor': {
          import('@polymer/iron-icons/editor-icons.js'); break;
        }
        case 'hardware': {
          import('@polymer/iron-icons/hardware-icons.js'); break;
        }
        case 'image': {
          import('@polymer/iron-icons/image-icons.js'); break;
        }
        case 'maps': {
          import('@polymer/iron-icons/maps-icons.js'); break;
        }
        case 'notification': {
          import('@polymer/iron-icons/notification-icons.js'); break;
        }
        case 'social': {
          import('@polymer/iron-icons/social-icons.js'); break;
        }
        case 'places': {
          import('@polymer/iron-icons/places-icons.js'); break;
        }
      }
    }
    // Save input reference for performance
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

  _onIconClick(event) {
    this.dispatchEvent(new CustomEvent('icon-clicked', {
      detail: {
        value: this._input.value
      },
      composed: true,
      bubbles: true
    }));
  }
}

customElements.define('lit-input', LitInput);