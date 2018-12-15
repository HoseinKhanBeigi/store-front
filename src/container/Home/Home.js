/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
// import styles from "./styles.scss";

// Export this for unit testing more easily
type State = {
  todos: Array<String>,
  currentPage: number,
  todosPerPage: number
};
export class Home extends PureComponent<Props, State> {
  state = {
    todos: ['a', 'b', 'c', 'd', 'e', 's'],
    currentPage: 1,
    todosPerPage: 5
  };

  handleUpdate = () => {
    const { todos } = this.state;
    this.setState({
      todos: ['a', 'b']
    });
  };

  render() {
    const { todos, todosPerPage, currentPage } = this.state;
    const totalPage = Math.ceil(todos.length / todosPerPage);
    console.log(totalPage, currentPage);

    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = todos.map((todo, index) => (
      <div>
        <li
          key={`${index}s`}
          onClick={() => {
            this.handleUpdate();
          }}
        >
          {todo}
        </li>
        <div>ssdse</div>
      </div>
    ));

    console.log(renderTodos.length);

    return (
      <div>
        <Pagination defaultCurrent={1} total={50} />
        <ul>{renderTodos}</ul>
      </div>
    );
  }
}

export default compose(withRouter)(Home);
