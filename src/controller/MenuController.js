export default class Slideoutmenu {
  constructor(el) {
    this.Dom = { el };
    this.Dom.menuItems = this.Dom.el.querySelectorAll('.cbp-hsmenu > li');
    this.initEvents();
  }

  openMenu(el, ev) {
    document.body.style.backgroundColor = '#383838';
    ev.preventDefault();
    const item = el.parentNode;
    const items = Array.prototype.slice.call(this.Dom.menuItems);
    this.Dom.current = items.indexOf(item);
    item.className = 'cbp-hsitem-open';
  }

  // Method
  initEvents() {
    Array.prototype.slice.call(this.Dom.menuItems).forEach(el => {
      const trigger = el.querySelector('a');
      const item = trigger.parentNode;

      const submenu = item.querySelector('.cbp-hssubmenu');
      trigger.addEventListener('mouseover', ev => {
        this.openMenu(trigger, ev);
      });

      submenu.addEventListener('mouseover', ev => {
        this.openMenu(trigger, ev);
      });

      document.body.addEventListener('mouseout', () => {
        item.className = '';
        document.body.style.backgroundColor = '#fff';
      });
    });

    window.addEventListener('resize', () => {
      this.resizeHandler();
    });
  }

  resizeHandler() {
    const delayed = () => {
      this.resize();
      this._resizeTimeout = null;
    };

    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }

    this._resizeTimeout = setTimeout(delayed(), 50);
  }

  resize() {
    // this.Dom.menuItems.style.height = `${
    //   document.querySelector('.cbp-hssubmenu').offsetHeight
    // }px`;
  }
}
