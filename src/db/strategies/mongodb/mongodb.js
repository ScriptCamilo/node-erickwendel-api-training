const Mongoose = require('mongoose');

const ICrud = require('../interfaces/interfaceCrud');

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
}

class MongoDB extends ICrud {
  #connection = null;
  #schema = null;

  constructor(connection, schema) {
    super();
    this.#connection = connection;
    this.#schema = schema;
  }

  static connect() {
    Mongoose.connect(
      'mongodb://scriptcamilo:mysecretpassword@localhost:27017/heroes',
      { useNewUrlParser: true },
      function (error) {
        if (!error) return;
        console.log('Falha na conexão!', error);
      }
    );

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('Database running'));
    return connection;
  }

  async isConnected() {
    const state = STATUS[this.#connection.readyState];

    switch(state) {
      case 'Connecting':
        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this.#connection.readyState];
      default:
        return state;
    }
  }

  create(item) {
    return this.#schema.create(item);
  }

  read(item, skip=0, limit=10) {
    if(item) return this.#schema.find(item).skip(skip).limit(limit);

    return this.#schema.find().skip(skip).limit(limit);
  }

  update(id, item) {
    return this.#schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this.#schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
