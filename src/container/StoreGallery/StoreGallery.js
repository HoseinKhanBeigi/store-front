/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Paginations, InputCheckBox } from '../../components/index';

type State = {
  data: Array<string>
};

class StoreGallery extends PureComponent<State> {
  state = {
    data: ['a', 'b', 'c', 'd', 'e', 's', '2', 'e', 'd', 'h']
  };

  render() {
    const { data } = this.state;

    const values = ['Apple', 'Pear', 'Orange'];
    const values1 = ['Apple1', 'Pear1', 'Orange1'];
    const values2 = ['Apple2', 'Pear2', 'Orange2'];

    return (
      <div>
        <div>
          <Paginations data={data} />
          <InputCheckBox values={values} name="Brand" />
          <InputCheckBox values={values1} name="Price" />
          <InputCheckBox values={values2} name="Size" />
        </div>
      </div>
    );
  }
}

export default compose(withRouter)(StoreGallery);
