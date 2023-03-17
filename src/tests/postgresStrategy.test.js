const assert = require('assert');

const ContextStrategy = require('../db/strategies/base/contextStrategy');
const Postgres = require('./../db/strategies/postgres');

const context = new ContextStrategy(new Postgres());

const MOCK_HERO_CREATE = {
  name: 'Green Arrow',
  power: 'Arrows',
};

const MOCK_HERO_UPDATE= {
  name: 'Batman',
  power: 'Money',
}

describe('Postgres Strategy', function () {
  this.timeout(Infinity);
  this.afterAll(async () => {
    await context.delete();
  });

  it('PostgreSQL Connection', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it('Create', async () => {
    const result = await context.create(MOCK_HERO_CREATE);
    delete result.id;

    assert.deepEqual(result, MOCK_HERO_CREATE);
  });

  it('List', async () => {
    const [result] = await context.read({ name: MOCK_HERO_CREATE.name });
    delete result.id;

    assert.deepEqual(result, MOCK_HERO_CREATE);
  });

  it('Update', async () => {
    await context.create(MOCK_HERO_UPDATE);
    const [itemToUpdate] = await context.read({ name: MOCK_HERO_UPDATE.name });
    const numberOfValuesUpdated = 1;

    const newItem = {
      ...itemToUpdate,
      name: 'Wonder Woman',
    };
    delete newItem.id;

    const { updatedCount, results: [result] } = await context.update(itemToUpdate.id, newItem);
    const { dataValues } = result;
    delete dataValues.id;

    assert.deepEqual(updatedCount, numberOfValuesUpdated);
    assert.deepEqual(dataValues, newItem);
  });

  it('Remove by id', async () => {
    const [item] = await context.read();
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1)
  })
})
