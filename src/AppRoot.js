import './components/PageHeader.js';
import './components/PageBody.js';
import './components/PageFooter.js';

const EL_NAME = 'app-root';

const template = document.createElement('template');
template.innerHTML = /* html */`
<style>
  :host {
    width: 100vw;
    height: 100vh;
    overflow: hidden auto;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 16px;
    color: #111111;
    display: flex;
    flex-direction: column;

    --wc-color-accent-primary: #009BBF;
    --wc-color-accent-secondary: #007A9D;
    --wc-color-accent-tertiary: #005F7A;

    --wc-color-foreground-on-accent-primary: #ffffff;
  }
  :host([theme="dark"]) {
    background-color: #111111;
    color: #ffffff;
  }
</style>

<slot>
  <page-header>Web Component Template</page-header>
  <page-body></page-body>
  <page-footer items="3"></page-footer>
</slot>
`;

export default class Component extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // Log all custom wc events
    const emit = document.dispatchEvent;
    document.dispatchEvent = (event) => {
      console.log(
        `%cEVENT%c ${event.type}`,
        'background-color: gray; padding: 2px 4px; border-radius: 4px; color: white;',
        'color: teal;',
        event.detail,
      );
      return emit.call(document, event);
    };

    document.addEventListener('wc-theme-change', (e) => {
      const theme = e.detail;
      this.setAttribute('theme', theme);
    });
  }
}

if (!customElements.get(EL_NAME)) {
  customElements.define(EL_NAME, Component);
}
