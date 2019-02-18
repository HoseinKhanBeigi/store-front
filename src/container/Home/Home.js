/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

type State = {
  data: Array<String>,
  onMous: Boolean
};

class Home extends PureComponent<State> {
  state = {
    data: 'Home',
    hidden: true,
    opacityValue: 0
  };

  componentDidMount() {
    this.handleOpen();
  }

  handlePicesOpen = el =>
    new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            el.classList.remove('revealer--right'),
            el.classList.remove('revealer--hideX'),
            el.classList.add('revealer--left'),
            el.classList.add('revealer--showX')
          ),
        500
      );
    });

  handleOpen = async () => {
    this.setState({ opacityValue: 1 });
    const newElementAll = document.querySelectorAll('.revealer');
    for (let i = 0; i < newElementAll.length; i++) {
      await this.handlePicesOpen(newElementAll[i]);
    }
  };

  handlePicesClose = el =>
    new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve(
            el.classList.remove('revealer--left'),
            el.classList.remove('revealer--showX'),
            el.classList.add('revealer--right'),
            el.classList.add('revealer--hideX')
          ),
        500
      );
    });

  handleClose = async () => {
    const newElementAll = document.querySelectorAll('.revealer');
    for (let i = 0; i < newElementAll.length; i++) {
      await this.handlePicesClose(newElementAll[i]);
    }
  };

  render() {
    const { data, opacityValue } = this.state;

    const symbol = (
      <polygon points="14.1333333 2.61666667 18.9333333 7.41666667 0 7.41666667 0 10.0833333 18.9333333 10.0833333 14.1333333 14.8833333 16 16.75 24 8.75 16 0.75" />
    );

    return (
      <div>
        <button
          onClick={() => {
            this.handleOpen();
          }}
        >
          open
        </button>
        <button
          onClick={() => {
            this.handleClose();
          }}
        >
          close
        </button>
        <main>
          <div
            className="grid grid--layout-1"
            style={{ opacity: opacityValue }}
          >
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3 className="grim__item-title">speakers</h3>
                <span className="grim__item-desc">
                  Smart people. All in one place.
                </span>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3 className="grim__item-title">venue</h3>
                <span className="grim__item-desc">One place for all.</span>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <div
                className="grim__item-inner"
                style={{ opacity: 1, transform: `translateY(${0}%)` }}
              >
                <h3 className="grim__item-title">hossein khan beigi</h3>
                <span
                  className="grim__item-desc"
                  style={{
                    fontFamily: 'monospace'
                  }}
                >
                  javascript engineer specialist with 4+ experience at 2
                  company.profetional experience in developing compelex Element
                  in any web & webApp based on js-css-html with along tech like
                  react-redux Vue-VueX angular. seeking to further career by
                  growing with passion for the learning new things.
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      fontFamily: 'monospace',
                      marginTop: '12px',
                      fontSize: '16px'
                    }}
                  >
                    <span> Address: tehran - iran</span>
                    <span> Phone: +9809383345749</span>
                    <span> E-mail: hoseinkhanbeigi@gmail.com</span>
                  </div>
                </span>
              </div>
            </div>
            <div className="grid__item">
              <div className="revealer revealer--right revealer--hideX" />
              <span style={{ fontFamily: 'monospace' }}>
                javascript/html/css/sass
              </span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '95%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>react/vue/angular</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '90%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>nodejs</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '50%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>webpack</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '70%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>mongoDB</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '40%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>
                stateManagement(redux || any)
              </span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '90%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>python/ruby</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '30%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>jest</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '70%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>
                webSocket/RabbitMQ
              </span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '70%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
              <span style={{ fontFamily: 'monospace' }}>GraphQL Apollo</span>
              <div
                className="grid__item1"
                style={{
                  marginBottom: '12px',
                  width: '70%'
                }}
              >
                <div className="revealer revealer--right revealer--hideX" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default compose(withRouter)(Home);
