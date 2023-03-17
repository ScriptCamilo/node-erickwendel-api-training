const assert = require('assert');

const ContextStrategy = require('../db/strategies/base/contextStrategy');
const heroSchema = require('../db/strategies/mongodb/schemas/heroSchema');
const MongoDb = require('../db/strategies/mongodb/mongodb');

let context = {};

const MOCK_HERO_CREATE = {
  name: 'Green Arrow',
  power: 'Arrows',
};

const MOCK_HERO_UPDATE= {
  name: 'Batman',
  power: 'Money',
}

let MOCK_UPDATED_HERO_ID = '';

describe.only('MongoDB Strategy', function () {
  this.timeout(Infinity);
  this.beforeAll(async () => {
    const connection = MongoDb.connect();
    context = new ContextStrategy(new MongoDb(connection, heroSchema));
  });

  this.afterAll(async () => {
    // await context.delete();
  });

  it('MongoDB Connection', async () => {
    const result = await context.isConnected();
    const expected = 'Connected';

    assert.equal(result, expected);
  });

  it('Create', async () => {
    const { name, power } = await context.create(MOCK_HERO_CREATE);

    assert.deepEqual({ name, power }, MOCK_HERO_CREATE);
  });

  it('List', async () => {
    const [{ name, power }] = await context.read({ name: MOCK_HERO_CREATE.name });
    const result = { name, power };

    assert.deepEqual(result, MOCK_HERO_CREATE);
  });

  it('Update', async () => {
    const { _id: itemId } = await context.create(MOCK_HERO_UPDATE);
    MOCK_UPDATED_HERO_ID = itemId;

    const newItem = {
      name: 'Wonder Woman',
    };
    const result = await context.update(itemId, newItem);

    assert.deepEqual(result.nModified, 1);
  });

  it('Remove by id', async () => {
    const result = await context.delete(MOCK_UPDATED_HERO_ID);

    assert.deepEqual(result.n, 1);
  });
})
