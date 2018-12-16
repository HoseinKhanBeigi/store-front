/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Checkbox } from 'antd';

import 'antd/dist/antd.css';

const CheckboxGroup = Checkbox.Group;

type Props = {
  values: Array<String>,
  name: string
};

class InputCheckBox extends PureComponent<Props> {
  onChange = checkedList => {
    console.log(checkedList);
  };

  render() {
    const { values, name } = this.props;
    return (
      <div>
        <div>{name}</div>
        <CheckboxGroup options={values} onChange={this.onChange} />
      </div>
    );
  }
}

export default compose(withRouter)(InputCheckBox);
