const Mongoose = require('mongoose');

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

module.exports = Mongoose.model('heroes', heroSchema);
