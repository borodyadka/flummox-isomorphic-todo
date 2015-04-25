import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.task;
    }

    handleToggleStatus() {
        let completed = this.refs.completed.getDOMNode().checked;
        this.props.onToggleStatus(completed);
        this.setState({completed});
    }

    handleDeleteTask() {
        this.props.onDeleteTask();
    }

    render() {
        return (
            <li className={this.state.completed ? 'completed' : ''}>
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           defaultChecked={this.state.completed}
                           onChange={this.handleToggleStatus.bind(this)}
                           ref="completed" />
                    <label>{this.state.text}</label>
                    <button className="destroy"
                            onClick={this.handleDeleteTask.bind(this)} />
                </div>
                <input className="edit" defaultValue={this.state.text} />
            </li>
        );
    }
}

export default TodoItem;
