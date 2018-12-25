/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

// Export this for unit testing more easily

type State = {
  todos: Array<String>,
  currentPage: number,
  todosPerPage: number
};

type Props = {
  data: Array<String>
};
class Paginations extends PureComponent<Props, State> {
  state = {
    currentPage: 1,
    todosPerPage: 3
  };

  onChange = page => {
    console.log(page);
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { data } = this.props;
    const { todosPerPage, currentPage } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((el, index: Number) => (
      <li key={index}>{el}</li>
    ));

    return (
      <div>
        <Pagination
          // defaultCurrent={1}
          current={currentPage}
          total={data.length}
          pageSize={todosPerPage}
          onChange={this.onChange}
        />
        <ul>{renderTodos}</ul>
      </div>
    );
  }
}

export default compose(withRouter)(Paginations);
