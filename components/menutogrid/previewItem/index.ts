/**
 * Class representing a Preview Item (.preview__item)
 */
import styles from "../../../styles/menutogrid.module.scss";
export class PreviewItem {
  // DOM elements
  DOM: any = {
    // main element (.preview__item)
    el: null,
    // title (.preview__item-title)
    title: null,
    // grid (.grid)
    grid: null,
    // images (.cell__img)
    images: null,
  };

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.preview__item)
   */
  constructor(DOM_el: any) {
    this.DOM.el = DOM_el;
    this.DOM.title = this.DOM.el.querySelector(
      `.${styles.preview__itemTitle} > .${styles.oh__inner}`
    );
    this.DOM.grid = this.DOM.el.querySelector(`.${styles.grid}`);
    this.DOM.images = [
      ...this.DOM.grid.querySelectorAll(`.${styles.cell__img}`),
    ];
  }
}
