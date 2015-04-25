import React from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoList extends React.Component {
    handleKeyDown(event) {
        if (event.which !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        let value = this.refs.task.getDOMNode().value.trim();

        if (value) {
            this.props.handleNewTask(value);
            this.refs.task.getDOMNode().value = '';
        }
    }

    render() {
        return (
            <input className="new-todo"
                   placeholder="What needs to be done?"
                   onKeyDown={this.handleKeyDown.bind(this)}
                   ref="task" />
        );
    }
}

export default TodoList;
