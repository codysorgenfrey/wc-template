import './FooterItem.js';

const EL_NAME = 'page-footer';

const template = document.createElement('template');
template.innerHTML = /* html */ `
<style>
  :host {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 32px;
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 24px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: var(--wc-color-accent-primary);
  }
</style>
<ul>
  <slot></slot>
</ul>
`;

export default class Component extends HTMLElement {
  // This static method tells the browser what attributes we care about.
  static get observedAttributes() {
    return ['items'];
  }

  // This callback is called when the attribute is added to the element.
  // ex: <page-footer items="3"></page-footer>
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[`$${name}`] = newValue;
      this.render();
    }
  }

  // This getter/setter is used to access the value of the attribute in Javascript.
  // ex: const items = document.querySelector('page-footer').items;
  get items() {
    return this.$items;
  }

  // When the property is set, we update the value of our internal variable and re-render.
  set items(value) {
    this.$items = value;
    this.render();
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // Get a reference to the list element.
    this.listEl = shadowRoot.querySelector('ul');

    // Initialize the value of our attributes.
    this.$items = 1;

    // Render the components initial state.
    this.render();
  }

  // This method is called when the component is first rendered and any time the value of the
  // items property changes.
  render() {
    const { items } = this;
    this.listEl.innerHTML = '';
    for (let i = 0; i < items; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<footer-item id="footer-${i + 1}"><a href="#footer-${i + 1}">Page Footer Item ${i + 1}</a></footer-item>`;
      this.listEl.appendChild(li);
    }
  }
}

if (!customElements.get(EL_NAME)) {
  customElements.define(EL_NAME, Component);
}
