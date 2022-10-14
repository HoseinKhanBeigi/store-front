import styles from "../../../styles/onScrollView.module.scss";
export class Item {
  // DOM elements
  DOM: any = {
    // main element (.item)
    el: null,
    // caption (.item__caption)
    caption: null,
    // imageWrap (.item__image-wrap)
    imageWrap: null,
    // image (.item__image)
    image: null,
    // imageInner (.item__image > .item__image-inner)
    imageInner: null,
    // title (.item__caption-title)
    title: null,
    // titleInner (.item__caption-title > .oh__inner)
    titleInner: null,
    // number (.item__caption-number)
    number: null,
    // numberInner (.item__caption-number > .oh__inner)
    numberInner: null,
    // description (.item__caption-description)
    description: null,
  };

  /**
   * Constructor.
   * @param {Element} DOM_el - main element (.item)
   */
  constructor(DOM_el: any) {
    this.DOM.el = DOM_el;
    this.DOM.caption = this.DOM.el.querySelector(`.${styles.item__caption}`);
    this.DOM.imageWrap = this.DOM.el.querySelector(
      `.${styles.item__imagewrap}`
    );
    this.DOM.image = this.DOM.el.querySelector(`.${styles.item__image}`);
    this.DOM.imageInner = this.DOM.image.querySelector(
      `.${styles.item__imageinner}`
    );
    this.DOM.title = this.DOM.el.querySelector(`.${styles.item__captiontitle}`);
    this.DOM.titleInner = this.DOM.title.querySelector(`.${styles.oh__inner}`);
    this.DOM.number = this.DOM.el.querySelector(
      `.${styles.item__captionnumber}`
    );
    this.DOM.numberInner = this.DOM.number.querySelector(
      `.${styles.oh__inner}`
    );
    this.DOM.description = this.DOM.el.querySelector(
      `.${styles.item__captiondescription}`
    );
  }
}
