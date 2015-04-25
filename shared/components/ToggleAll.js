import React from 'react';

class ToggleAll extends React.Component {
    handleToggleAll() {
        let completed = this.refs.completed.getDOMNode().checked;
        this.props.onToggleStatus(completed);
    }

    render() {
        let checked = this.props.tasks
            .reduce((result, task) => result && task.comleted, false);

        return (
            <div>
                <input className="toggle-all"
                       type="checkbox"
                       defaultChecked={checked}
                       ref="completed"
                       onChange={this.handleToggleAll.bind(this)} />
                <label htmlFor="toggle-all">Mark all as complete</label>
            </div>
        );
    }
}

export default ToggleAll
