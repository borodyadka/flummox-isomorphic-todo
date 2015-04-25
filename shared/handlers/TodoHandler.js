import React from 'react';
import Flux from 'flummox/component';
import TodoList from '../components/TodoList';
import TodoInput from '../components/TodoInput';
import ItemsCounter from '../components/ItemsCounter';
import ToggleAll from '../components/ToggleAll';

class TodoHandler extends React.Component {
    static async routerWillRun({flux, state}) {
        let action = state.routes[state.routes.length - 1].name;
        let todoActions = flux.getActions('todo');
        switch (action) {
            case 'active':
                await todoActions.getActiveTasks();
                break;
            case 'completed':
                await todoActions.getCompletedTasks();
                break;
            case 'all':
            default:
                await todoActions.getTasks();
                break;
        }
    }

    async handleNewTask(text) {
        let actions = this.props.flux.getActions('todo');
        await actions.createTask({text});
    }

    async handleToggleStatus(id, status) {
        let actions = this.props.flux.getActions('todo');
        await actions.toggleTask(id, status);
    }

    async handleToggleAll(status) {
        let actions = this.props.flux.getActions('todo');
        await actions.toggleAll(status);
    }

    async handleDeleteTask(id) {
        let actions = this.props.flux.getActions('todo');
        await actions.deleteTask(id);
    }

    async handleDeleteCompletedTasks(id) {
        let actions = this.props.flux.getActions('todo');
        await actions.deleteCompletedTasks();
    }

    render() {
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <TodoInput handleNewTask={this.handleNewTask.bind(this)} />
                </header>
                <section className="main">
                    <Flux connectToStores={['todo']}>
                        <ToggleAll onToggleStatus={this.handleToggleAll.bind(this)} />
                    </Flux>
                    <Flux connectToStores={['todo']}>
                        <TodoList onToggleStatus={this.handleToggleStatus.bind(this)}
                                  onDeleteTask={this.handleDeleteTask.bind(this)} />
                    </Flux>
                </section>
                <footer className="footer">
                    <Flux connectToStores={['todo']}>
                        <ItemsCounter count={0} />
                    </Flux>
                    <ul className="filters">
                        <li>
                            <a href="/">All</a>
                        </li>
                        <li>
                            <a href="/active">Active</a>
                        </li>
                        <li>
                            <a href="/completed">Completed</a>
                        </li>
                    </ul>
                    <button className="clear-completed" onClick={this.handleDeleteCompletedTasks.bind(this)}>
                        Clear completed
                    </button>
                </footer>
            </div>
        );
    }
}

export default TodoHandler;
