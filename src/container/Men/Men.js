/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import logo1 from '../../theme/pic1.jpeg';
import logo2 from '../../theme/pic2.jpeg';
import logo3 from '../../theme/pic3.jpg';
import logo4 from '../../theme/pic4.jpg';

type State = {
  data: Array<String>,
  onMous: Boolean,
  pageYOffset: number,
  position: string
};

class Men extends PureComponent<State> {
  state = {
    pageYOffset: 571,
    position: ''
  };

  componentDidMount() {
    document.addEventListener('scroll', ev => {
      const sectionContent = document
        .querySelector('.image-wrapper')
        .getBoundingClientRect();
      const sectionContent2 = document
        .querySelector('.wipe')
        .getBoundingClientRect();
      const sectionContent3 = document
        .querySelector('.pad-bottom')
        .getBoundingClientRect();

      if (
        Math.round(sectionContent2.bottom) ===
        Math.round(sectionContent2.height)
      ) {
        const res = Math.round(
          (window.scrollY -
            sectionContent3.height -
            sectionContent2.height / 2) *
            -1
        );
        if (res < 572) {
          const persist = res < 0 ? 0 : res;
          this.setState({ pageYOffset: persist });

          console.log(persist);
        }

        // console.log(sectionContent3.height);
      }
    });
  }

  render() {
    const { data, pageYOffset, position } = this.state;
    return (
      <div>
        <section className="section">
          <div className="sticky-wrapper">
            <div className="section-content" />
            <div
              className="image-wrapper"
              style={{
                height: '421px',
                top: '96px'
              }}
            >
              <img
                src={logo4}
                style={{
                  height: '421.6px',
                  left: '50%',
                  transform: 'translate3d(-261px, 0px, 0px)',
                  top: '0px'
                }}
              />

              <div
                className="wipe"
                style={{
                  height: '571px',
                  position: 'absolute',
                  width: '1920px',
                  top: '50%',
                  transform: 'translateY(-307px)',
                  paddingBottom: '302.3px',
                  clipPath: `inset(${pageYOffset}px 0px 0px)`
                }}
              >
                <img
                  src={logo3}
                  style={{
                    height: '421.6px',
                    left: '50%',
                    transform: 'translate3d(-261px, 0px, 0px)',
                    top: '96px'
                  }}
                />
              </div>
            </div>
            <div className="section-content pad-bottom no-pad-top">
              <ul className="spec-list">
                <li className="spec">Radeon Pro Vega </li>
                <li className="spec">Up to 11 teraflopss</li>
                <li className="spec">Up to 22 teraflops half precision</li>
                <li className="spec">8GB or 16GB High Bandwidth Memory</li>
                <li className="spec last">400GB/s memory bandwidth</li>
              </ul>
            </div>
          </div>
        </section>
        <div style={{ height: 600 }} />
      </div>
    );
  }
}

export default compose(withRouter)(Men);
