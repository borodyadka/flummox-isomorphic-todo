import http from 'http';

function clone(obj) {
    return Object.assign({}, obj);
}

export default class MemoryStorage {
    constructor() {
        this._items = {
            1: {
                id: 1,
                text: 'Rule the World',
                completed: false
            },
            2: {
                id: 2,
                text: 'Be an Awesome',
                completed: true
            }
        };
    }

    count() {
        return new Promise((resolve) => {
            resolve(Object.keys(this._items).length);
        });
    }

    save(item) {
        return new Promise((resolve) => {
            let obj = clone(item);
            obj.id = Math.round(Math.random() * 10000000).toString(36);
            this._items[obj.id] = obj;
            resolve(obj);
        });
    }

    fetch(id) {
        return new Promise((resolve, reject) => {
            if (!this._items[id]) {
                let err = new Error(http.STATUS_CODES[404]);
                err.status = 404;
                return reject(err);
            }
            resolve(this._items[id]);
        });
    }

    update(id, item) {
        return new Promise((resolve, reject) => {
            let obj = clone(item);
            let existed = this._items[id];
            if (!existed) {
                let err = new Error(http.STATUS_CODES[404]);
                err.status = 404;
                return reject(err);
            }

            obj.id = existed.id;
            this._items[obj.id] = obj;
            resolve(obj);
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            if (!this._items[id]) {
                let err = new Error(http.STATUS_CODES[404]);
                err.status = 404;
                return reject(err);
            }
            delete this._items[id];
            resolve(true);
        });
    }

    list(check) {
        return new Promise((resolve) => {
            let items = Object.keys(this._items).map((key) => this._items[key]).reduce((memo, item) => {
                if (check && check(item)) {
                    memo.push(item);
                } else if (!check) {
                    memo.push(item);
                }
                return memo;
            }, []);

            resolve(items);
        });
    }
}
