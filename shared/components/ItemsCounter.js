import React from 'react';

class ItemsCounter extends React.Component {
    render() {
        let count = this.props.tasks
            .map(task => task.completed ? 0 : 1)
            .reduce((result, count) => result + count, 0);

        return (
            <span className="todo-count">
                <strong>{count}</strong>
                {count > 1 ? ' items' : ' item'} left
            </span>
        );
    }
}

export default ItemsCounter;
