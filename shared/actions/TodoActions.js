import {Actions} from 'flummox';
import fetch from 'isomorphic-fetch';

const API_HOST = 'http://localhost:3000';

class TodoListActions extends Actions {
    async getTasks() {
        return (await fetch(`${API_HOST}/api/tasks`, {
            headers: {
                'Accept': 'application/json'
            }
        })).json();
    }

    async getActiveTasks() {
        return (await fetch(`${API_HOST}/api/tasks/active`, {
            headers: {
                'Accept': 'application/json'
            }
        })).json();
    }

    async getCompletedTasks() {
        return (await fetch(`${API_HOST}/api/tasks/completed`, {
            headers: {
                'Accept': 'application/json'
            }
        })).json();
    }

    async deleteCompletedTasks() {
        return (await fetch(`${API_HOST}/api/tasks/completed`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })).json();
    }

    async createTask(task) {
        return (await fetch(`${API_HOST}/api/tasks`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })).json();
    }

    async deleteTask(id) {
        return (await fetch(`${API_HOST}/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        })).json();
    }

    async toggleTask(id, completed) {
        return (await fetch(`${API_HOST}/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed})
        })).json();
    }

    async toggleAll(completed) {
        return (await fetch(`${API_HOST}/api/tasks`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed})
        })).json();
    }
}

export default TodoListActions;
