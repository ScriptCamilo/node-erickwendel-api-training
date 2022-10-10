const ICrud = require('./interfaces/interfaceCrud');


class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item saved in Postgres');
  }
}

module.exports = Postgres;
