import { PreviewItem } from "../previewItem";
import styles from "../../../styles/menutogrid.module.scss";
/**
 * Class representing a Row (.row)
 */
export class Row {
  // DOM elements
  DOM: any = {
    // main element (.row)
    el: null,
    // title (.cell__title > .oh__inner)
    title: null,
    // title wrap
    titleWrap: null,
    // images wrap
    imagesWrap: null,
    // images (.cell__img)
    images: null,
  };
  previewItem: any;

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.row)
   */
  constructor(DOM_el: any, DOM_previewItem: any) {
    this.DOM.el = DOM_el;
    this.previewItem = new PreviewItem(DOM_previewItem);
    this.DOM.titleWrap = this.DOM.el.querySelector(`.${styles.cell__title}`);
    this.DOM.title = this.DOM.titleWrap.querySelector(`.${styles.oh__inner}`);
    this.DOM.imagesWrap = this.DOM.el.querySelector(`.${styles.cellImages}`);
    this.DOM.images = [
      ...this.DOM.imagesWrap.querySelectorAll(`.${styles.cell__img}`),
    ];
  }
}
