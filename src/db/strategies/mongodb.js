const ICrud = require('./interfaces/interfaceCrud');

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item saved in MongoDB');
  }
}

module.exports = MongoDB;
