const Sequelize = require('sequelize');

const ICrud = require('./interfaces/interfaceCrud');

const driver = new Sequelize(
  'heroes',
  'scriptcamilo',
  'mysecretpassword',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
  }
);


class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._heroes = null;
    this.#connect();
  }

  async create(item) {
    const { dataValues } = await this._heroes.create(item);
    return dataValues;
  }

  async read(item = {}) {
    return this._heroes.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    const [updatedCount, results] = await this._heroes.update(item, {
      where: { id: id },
      returning: true,
    });

    return {updatedCount, results};
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._heroes.destroy({ where: query });
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.error('Failed to connect!');
      return;
    }
  }

  async defineModel() {
    this._heroes = this._driver.define('heroes', {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        required: true,
      },
      power: {
        type: Sequelize.STRING,
        required: true,
      }
    }, {
      tableName: 'TB_HEROES',
      freezeTableName: false,
      timestamps: false,
    });

    await this._heroes.sync();
  }

  async #connect() {
    this._driver = new Sequelize(
      'heroes',
      'scriptcamilo',
      'mysecretpassword',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
      }
    );

    this.defineModel();
  }
}

module.exports = Postgres;
