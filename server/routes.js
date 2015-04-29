import {Router} from 'express';
import MemoryStorage from './storages/MemoryStorage';
import http from 'http';

let router = new Router();
let storage = new MemoryStorage();

router.get('/tasks', async (req, res) => {
    res.json(await storage.list());
});

router.post('/tasks', async (req, res, next) => {
    if (!req.body.text || !req.body.text.length) {
        let err = new Error(http.STATUS_CODES[400]);
        err.status = 400;
        return next(err);
    }
    let task = await storage.save({
        text: req.body.text.substr(0, 256),
        completed: false
    });
    res.status(201).send(task);
});

router.put('/tasks', async (req, res) => {
    let completed = req.body.completed;
    let tasks = [];
    (await storage.list()).forEach(task => {
        let t = storage.update(task.id, {
            text: task.text,
            completed: Boolean(completed)
        });
        tasks.push(t);
    });
    res.status(201).json(await Promise.all(tasks));
});

router.get('/tasks/active', async (req, res) => {
    res.json(await storage.list((task) => !task.completed));
});

router.get('/tasks/completed', async (req, res) => {
    res.json(await storage.list((task) => task.completed));
});

router.delete('/tasks/completed', async (req, res, next) => {
    let deleted = [];
    try {
        let items = await storage.list((task) => task.completed);
        items.forEach(async (item) => {
            deleted.push(item.id);
            await storage.remove(item.id);
        });
        res.status(200).json({deleted});
    } catch (err) {
        next(err);
    }
});

router.get('/tasks/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        var item = await storage.fetch(id);
        res.status(200).send(item);
    } catch (err) {
        return next(err);
    }
});

router.put('/tasks/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        var item = await storage.fetch(id);
    } catch (err) {
        return next(err);
    }

    let updated = item;
    Object.keys(req.body).forEach((key) => {
        updated[key] = req.body[key];
    });

    let task = await storage.update(id, updated);
    res.status(200).json(task);
});

router.delete('/tasks/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let removed = await storage.remove(id);
        res.status(200).send({id, removed});
    } catch (err) {
        return next(err);
    }
});

export default router;
