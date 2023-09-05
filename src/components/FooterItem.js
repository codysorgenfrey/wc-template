const EL_NAME = 'footer-item';

const template = document.createElement('template');
template.innerHTML = /* html */ `
<style>
  :host {}
</style>
<li>
  <slot>Footer Item</slot>
</li>
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
