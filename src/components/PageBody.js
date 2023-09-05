import './PrimaryButton.js';

const EL_NAME = 'page-body';

const template = document.createElement('template');
template.innerHTML = /* html */`
<style> 
  :host {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 32px;
  }
</style>
<p>Page Body</p>
<primary-button>Click me</primary-button>
`;

export default class Component extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // Store access to elements
    this.defaultButtonEl = shadowRoot.querySelector('primary-button');

    // Bind event listeners
    this.defaultButtonEl.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('wc-default-button-click', { detail: 'Fuck you!' }),
      );

      this.defaultButtonEl.textContent = 'Check console...';
      setTimeout(() => {
        this.defaultButtonEl.textContent = 'Click me';
      }, 2000);
    });
  }
}

if (!customElements.get(EL_NAME)) {
  customElements.define(EL_NAME, Component);
}
