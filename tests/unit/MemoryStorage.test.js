import MemoryStorage from '../../server/storages/MemoryStorage';
import assert from 'assert';
import http from 'http';

describe('MemoryStorage', () => {
    var storage;

    beforeEach((done) => {
        storage = new MemoryStorage();
        done();
    });

    it('count()', async function () {
        await storage.save({
            text: 'Task'
        });
        let count = await storage.count();

        assert.equal(count, 1);
    });

    it('save()', async function () {
        let item = await storage.save({
            text: 'Task'
        });

        assert(typeof item === 'object');
        assert(item.id);
        assert.deepEqual(storage._items[item.id], item);
    });

    it('fetch()', async function () {
        let id = (await storage.save({
            text: 'Task'
        })).id;
        let item = await storage.fetch(id);

        assert(typeof item === 'object');
    });

    it('fetch() 404', async function () {
        try {
            await storage.fetch('NOT_EXISTS');
        } catch (e) {
            assert.strictEqual(e.message, http.STATUS_CODES[404]);
        }
    });

    it('update()', async function () {
        let item = await storage.save({
            text: 'Task'
        });
        let id = item.id;
        assert.strictEqual(item.text, 'Task');
        await storage.update(id, {
            text: 'New task'
        });

        let updatedItem = await storage.fetch(id);
        assert.strictEqual(updatedItem.text, 'New task');
        assert.strictEqual(updatedItem.id, item.id);
    });


    it('update() 404', async function () {
        try {
            await storage.update('NOT_EXISTS', {});
        } catch (e) {
            assert.strictEqual(e.message, http.STATUS_CODES[404]);
        }
    });

    it('remove()', async function () {
        let id = (await storage.save({
            text: 'Task'
        })).id;
        let deleted = await storage.remove(id);

        assert(deleted);
    });

    it('remove() 404', async function () {
        try {
            await storage.remove('NOT_EXISTS');
        } catch (e) {
            assert.strictEqual(e.message, http.STATUS_CODES[404]);
        }
    });

    it('list()', async function () {
        let item = await storage.save({
            text: 'Task'
        });
        let items = await storage.list();

        assert.equal(items.length, 1);
        assert.deepEqual(items[0], item);
    });

    it('list() with check-callback', async function () {
        let item = await storage.save({
            text: 'Task',
            flag: true
        });
        await storage.save({
            text: 'Task',
            flag: false
        });
        let items = await storage.list((item) => item.flag);

        assert.equal(items.length, 1);
        assert.deepEqual(items[0], item);
    });
});
