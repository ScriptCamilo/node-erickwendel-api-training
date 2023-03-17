const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');
const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
}

class MongoDB extends ICrud {
  #drive = null;
  #hero = null;

  constructor() {
    super();
    this.#connect();
  };

  #connect() {
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

    this.#drive = connection;
    this.#defineModel();
  };

  #defineModel() {
    const heroSchema = new Mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      power: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });

    this.#hero = Mongoose.model('heroes', heroSchema);
  };

  async isConnected() {
    const state = STATUS[this.#drive.readyState];

    switch(state) {
      case 'Connecting':
        await new Promise(resolve => setTimeout(resolve, 1000));
        return STATUS[this.#drive.readyState];
      default:
        return state;
    }
  };

  create(item) {
    return this.#hero.create(item);
  };

  read(item, skip=0, limit=10) {
    if(item) return this.#hero.find(item).skip(skip).limit(limit);

    return this.#hero.find().skip(skip).limit(limit);
  };

  update(id, item) {
    return this.#hero.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this.#hero.deleteOne({ _id: id });
  };
}

module.exports = MongoDB;
