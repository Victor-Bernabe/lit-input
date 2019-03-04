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
    }
    iron-icon {
      display: none;
      position: absolute;
    }
    :host([icon-right]) > iron-icon {
      display: inline;
      right: 0;
    }
    :host([icon-left]) > iron-icon {
      display: inline;
      left: 0;
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
    this.placeHolder = '';
    this.icon = 'icons:search';
  }

  render() {
    return html`
    <iron-icon icon="${this.icon}"></iron-icon>
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
}

customElements.define('lit-input', LitInput);