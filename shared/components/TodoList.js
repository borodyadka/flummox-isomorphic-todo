import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
    onToggleStatus(id, completed) {
        this.props.onToggleStatus(id, completed);
    }

    onDeleteTask(id) {
        this.props.onDeleteTask(id);
    }

    render() {
        return (
            <ul className="todo-list">
                {this.props.tasks.map(task =>
                    <TodoItem key={task.id} task={task}
                              onToggleStatus={this.onToggleStatus.bind(this, task.id)}
                              onDeleteTask={this.onDeleteTask.bind(this, task.id)} />
                )}
            </ul>
        );
    }
}

export default TodoList;
