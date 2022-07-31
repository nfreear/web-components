/**
 * A Busy Spinner animation - pure CSS.
 *
 * @copyright © Nick Freear, 2021-10-26.
 *
 * @see https://gist.github.com/nfreear/ae83b11a7572cd3122a181bb6ebb7fff,
 * @see https://gist.github.com/nfreear/a71bfce05ef9bae03011ea33762c9d69,
 * @see https://sap.github.io/ui5-webcomponents/playground/components/BusyIndicator/,
 * @see https://github.com/SAP/ui5-webcomponents/blob/master/packages/main/src/BusyIndicator.hbs,
*/

import { MyElement } from '../MyElement.js';

export class MyBusySpinnerElement extends MyElement {
  static getTag () {
    return 'my-busy-spinner';
  }

  static get observedAttributes () {
    return ['hidden'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    const VALUE = newValue !== null;

    console.debug(`my-busy-spinner ~ ${name}: ${VALUE} ('${oldValue}', '${newValue}')`);
  }

  async __connectedCallback () {
    // const name = this.getAttribute('name') || 'A name attribute';

    /** @WAS await this.getTemplate('my-busy-spinner'); */

    console.debug('my-busy-spinner:', this);
  }
}

MyBusySpinnerElement.define();
