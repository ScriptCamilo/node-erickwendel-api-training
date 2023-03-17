const Mongoose = require('mongoose');
Mongoose.connect('mongodb://scriptcamilo:mysecretpassword@localhost:27017/heroes',
  { useNewUrlParser: true },
  function (error) {
    if (!error) return;

    console.log('Falha na conexão!', error);
  }
);

const connection = Mongoose.connection;
connection.once('open', () => console.log('Database running!'));
const state = connection.readyState;


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

const model = Mongoose.model('heroes', heroSchema);

async function main() {
  const createResult = await model.create({
    name: 'Batman',
    power: 'Money',
  });

  console.log('Create result', createResult);

  const items = await model.find();
  console.log('Items', items);
}

main();
