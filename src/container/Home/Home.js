/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';

type State = {
  data: Array<String>,
  onMous: Boolean
};

class Home extends PureComponent<Props, State> {
  state = {
    data: 'Home'
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <h1 className={styles.home}>{data}</h1>
      </div>
    );
  }
}

export default compose(withRouter)(Home);
