const Sequelize = require('sequelize');

const ICrud = require('../interfaces/interfaceCrud');

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
  #connection = null;
  #schema = null;

  constructor(connection, schema) {
    super();
    this.#connection = connection;
    this.#schema = schema;
  }

  async isConnected() {
    try {
      await this.#connection.authenticate();
      return true;
    } catch (error) {
      console.error('Failed to connect!');
      return;
    }
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name,
      schema.schema,
      schema.options,
    );
    await model.sync();
    return model;
  }

  static async connect() {
    const connection = new Sequelize(
      'heroes',
      'scriptcamilo',
      'mysecretpassword',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        logging: false,
      }
    );

    return connection;
  }

  async create(item) {
    const { dataValues } = await this.#schema.create(item);
    return dataValues;
  }

  async read(item = {}) {
    return this.#schema.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    const [updatedCount, results] = await this.#schema.update(item, {
      where: { id: id },
      returning: true,
    });

    return {updatedCount, results};
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this.#schema.destroy({ where: query });
  }
}

module.exports = Postgres;
