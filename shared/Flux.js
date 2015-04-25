import {Flux} from 'flummox';
import TodoListAction from './actions/TodoActions';
import TodoListStore from './stores/TodoStore';

export default class extends Flux {
    constructor() {
        super();

        this.createActions('todo', TodoListAction);
        this.createStore('todo', TodoListStore, this);
    }
}
