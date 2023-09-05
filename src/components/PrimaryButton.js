const EL_NAME = 'primary-button';

const template = document.createElement('template');
template.innerHTML = /* html */`
<style>
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: var(--wc-color-accent-primary);
    color: var(--wc-color-foreground-on-accent-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    vertical-align: center;
    cursor: pointer;
    overflow: hidden;
  }
  button:hover {
    background: var(--wc-color-accent-secondary);
  }
  button:hover:active {
    background: var(--wc-color-accent-tertiary);
  }
</style>
<button>
  <slot name="icon"></slot>
  <slot>Button</slot>
</button>
`;

export default class Component extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

if (!customElements.get(EL_NAME)) {
  customElements.define(EL_NAME, Component);
}
