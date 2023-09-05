import './PrimaryButton.js';
import './DarkThemeIcon.js';
import './LightThemeIcon.js';

const EL_NAME = 'page-header';

const template = document.createElement('template');
template.innerHTML = /* html */`
<style>
  :host {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 32px;
  }
  h1 {
    margin: 0;
  }
</style>
<h1>
  <slot>Page Header</slot>
</h1>
<primary-button>
  <dark-theme-icon slot="icon"></dark-theme-icon>
  Switch to dark theme
</primary-button>
`;

export default class Component extends HTMLElement {
  set theme(value) {
    this.$theme = value;
    this.render();
  }

  get theme() {
    return this.$theme;
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // Store access to elements
    this.themeButtonEl = shadowRoot.querySelector('primary-button');

    // init variables 
    this.$theme = 'light';

    // Bind event listeners
    this.themeButtonEl.addEventListener('click', () => {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.dispatchEvent(
        new CustomEvent('wc-theme-change', { detail: this.theme }),
      );
      this.render();
    });

    // init render
    this.render();
  }

  render() {
    if (this.theme === 'dark') {
      this.themeButtonEl.innerHTML = /* html */`
        <light-theme-icon slot="icon"></light-theme-icon>
        Switch to light theme
      `;
    } else {
      this.themeButtonEl.innerHTML = /* html */`
        <dark-theme-icon slot="icon"></dark-theme-icon>
        Switch to dark theme
      `;
    }
  }
}

if (!customElements.get(EL_NAME)) {
  customElements.define(EL_NAME, Component);
}
