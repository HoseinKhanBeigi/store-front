export default class Slideoutmenu {
  constructor(el) {
    this.Dom = { el };
    this.current = -1;
    this.touch = 'touch';
    this.Dom.menu = this.Dom.el.querySelector('.cbp-hsmenu');
    this.Dom.menuItems = this.Dom.el.querySelectorAll('.cbp-hsmenu > li');
    this.Dom.menuBg = document.createElement('div');
    this.Dom.menuBg.className = 'cbp-hsmenubg';
    this.Dom.el.appendChild(this.Dom.menuBg);
    this.initEvents();
  }

  openMenu(el, ev) {
    const item = el.parentNode;

    const items = Array.from(this.Dom.menuItems);
    const submenu = item.querySelector('.cbp-hssubmenu');
    const closeCurrent = current => {
      var current = current || this.Dom.menuItems[this.current];
      current.className = '';
      current.setAttribute('data-open', '');
    };
    const closePanel = () => {
      this.current = -1;
      this.Dom.menuBg.style.height = '0px';
    };

    if (submenu) {
      ev.preventDefault();

      if (item.getAttribute('data-open') === 'open') {
        closeCurrent(item);
        closePanel();
      } else {
        item.setAttribute('data-open', 'open');
        if (this.current !== -1) {
          closeCurrent();
        }
        this.current = items.indexOf(item);
        item.className = 'cbp-hsitem-open';
        this.Dom.menuBg.style.height = `${submenu.offsetHeight}px`;
      }
    } else if (this.current !== -1) {
      closeCurrent();
      closePanel();
    }
  }

  // Method
  initEvents() {
    Array.from(this.Dom.menuItems).forEach(el => {
      const trigger = el.querySelector('a');

      trigger.addEventListener('touchstart', ev => {
        this.openMenu(trigger, ev);
      });

      trigger.addEventListener('click', ev => {
        this.openMenu(trigger, ev);
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
    if (this.current !== -1) {
      this.menuBg.style.height = `${
        this.menuItems[this.current].querySelector('.cbp-hssubmenu')
          .offsetHeight
      }px`;
    }
  }
}
