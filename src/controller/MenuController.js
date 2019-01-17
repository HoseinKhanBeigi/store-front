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
    const items = Array.from(this.Dom.menuItems);
    this.Dom.current = items.indexOf(item);
    item.className = 'cbp-hsitem-open';
  }

  // Method
  initEvents() {
    Array.from(this.Dom.menuItems).forEach(el => {
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
      // const withAli = document.querySelector(".standard-product-column-left");
      // const rect = withAli.getBoundingClientRect();
      // console.log(rect.width, "yahoo");
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (width < 970) {
        this.resizeHandler();
      }
    });
  }

  resizeHandler() {
    Array.from(this.Dom.menuItems).forEach(el => {
      const trigger = el.querySelector('a');
      const item = trigger.parentNode;
      item.className = '';
      document.body.style.backgroundColor = '#fff';
    });
  }
}
