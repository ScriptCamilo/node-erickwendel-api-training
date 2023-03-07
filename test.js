const { deepEqual, ok } = require('assert');

const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  name: 'Flash',
  power: 'Speed',
  id: 1,
};

const DEFAULT_ITEM_UPDATE = {
  name: 'Green Lantern',
  power: 'Ring Energy',
  id: 2,
};

describe('Suite de manipulação de Heróis', () => {
  beforeEach(async () => {
    await database.setHero(DEFAULT_ITEM_CADASTRAR);
    await database.setHero(DEFAULT_ITEM_UPDATE);
  });

  afterEach(async() => {
    await database.remove();
  })

  it('Deve pesquisar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [result] = await database.list(expected.id);
    deepEqual(result, expected);
  });

  it('Deve cadastrar um herói, usando arquivos', async () => {
    const expected = {
      ...DEFAULT_ITEM_CADASTRAR,

    };
    const result = await database.setHero(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.list(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(actual, expected);
  });

  it('Deve remover um herói por id', async () => {
    const expected = true;
    const result = await database.remove(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(result, expected);
  });

  it('Deve atualizar um herói pelo id', async () => {
    const newData = {
      name: 'Batman',
      power: 'Money',
    };
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      ...newData,
    };

    await database.update(DEFAULT_ITEM_UPDATE.id, expected);
    const [result] = await database.list(DEFAULT_ITEM_UPDATE.id);
    deepEqual(result, expected);
  });
})
